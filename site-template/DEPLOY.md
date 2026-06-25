# Deployment guide — setav-site-template on AWS (OpenNext + CloudFront + Lambda)

## Architecture summary

```
Browser
  └─► CloudFront distribution (ap-south-1)
        ├─► S3 origin (behaviour: /_next/static/*, /public/*)   — static assets
        └─► Lambda Function URL (behaviour: all other paths)    — Next.js SSR
              └─► Lambda: site-template Node.js server
                    ├─► S3: setav-prod-sites (site config, legal markdown)
                    └─► api.setav.in (group products, testimonials)
```

The Lambda runs the standalone Next.js server produced by `output: "standalone"` and
wrapped by OpenNext (`@opennextjs/aws`).  It is NOT exposed via API Gateway; it uses a
Lambda Function URL (HTTPS endpoint) as the CloudFront custom origin.

---

## Required Lambda environment variables

| Variable             | Value (production)       | Notes                                          |
|----------------------|--------------------------|------------------------------------------------|
| `CONFIG_SOURCE`      | `s3`                     | `"fixture"` in local dev / CI                  |
| `SITES_BUCKET_NAME`  | `setav-prod-sites`       | The S3 bucket holding site configs             |
| `SITES_BUCKET_REGION`| `ap-south-1`             | Region of the bucket (default ap-south-1)      |
| `NODE_ENV`           | `production`             | Set automatically by the Next.js runtime       |

The Lambda execution role must have `s3:GetObject` permission on
`arn:aws:s3:::setav-prod-sites/*`.

---

## Build and deploy steps (CI/infra)

```bash
# 1. Install dependencies (includes @opennextjs/aws as devDependency)
npm ci

# 2. Build the Next.js standalone output
npm run build          # produces .next/standalone/

# 3. Wrap into the OpenNext Lambda bundle
npm run build:open-next  # produces .open-next/

# 4. Upload static assets to S3
aws s3 sync .open-next/assets/ s3://<STATIC_ASSETS_BUCKET>/ \
  --cache-control "public, max-age=31536000, immutable"

# 5. Deploy the server Lambda
#    Bundle: .open-next/server-functions/default/
#    Handler: index.handler
#    Runtime: nodejs20.x (or nodejs22.x)
#    Memory: 512 MB minimum (1024 MB recommended)
#    Timeout: 30 s
#    Env vars: see table above

# 6. Expose via Lambda Function URL (auth type: NONE, invoke mode: RESPONSE_STREAM)
#    Set the Function URL as the CloudFront custom origin for /* behaviour.

# 7. Point CloudFront /_next/static/* and /public/* behaviours at the S3 origin.
```

> `build:open-next` requires no AWS credentials — it only transforms the
> local `.next/` directory.  Do not run it in local dev; run `npm run dev` instead.

---

## CloudFront cache behaviour

| Path pattern       | Origin          | Cache policy                   |
|--------------------|-----------------|--------------------------------|
| `/_next/static/*`  | S3 assets       | Managed-CachingOptimized (immutable) |
| `/public/*`        | S3 assets       | Managed-CachingOptimized       |
| `/api/*`           | Lambda          | Managed-CachingDisabled (no cache) |
| `/*` (default)     | Lambda          | Managed-CachingDisabled (no cache for SSR pages) |

---

## 410/451 status enforcement via CloudFront viewer-response Function

### Why a CloudFront Function is needed

Next.js App Router Server Components cannot set a custom HTTP status code.
The SSR page always returns 200.  To enforce 410 Gone (suspended sites) and
451 Unavailable For Legal Reasons (legal-suspended sites), the app uses a
two-layer approach:

1. **App layer**: the Edge middleware (`src/middleware.ts`) calls the internal
   `/api/site-status` Route Handler to resolve the site's lifecycle status, then
   injects an `x-site-status` response header onto every request:
   - `x-site-status: gone`  → suspended site (render GoneBody, want HTTP 410)
   - `x-site-status: legal` → legal-suspended site (render GoneBody, want HTTP 451)
   - *(header absent)*       → live or preview site (pass through as 200)

2. **Edge layer**: a CloudFront viewer-response Function reads `x-site-status`
   and rewrites the HTTP status code before the response leaves CloudFront.

### CloudFront Function source

Create a CloudFront Function (JavaScript runtime 2.0) and associate it with the
**Viewer Response** event on the default `/*` cache behaviour:

```javascript
// CloudFront Function: setav-site-status-rewriter
// Runtime: cloudfront-js-2.0
// Event: viewer response

function handler(event) {
  var response = event.response;
  var headers  = response.headers;

  var siteStatus = headers["x-site-status"]
    ? headers["x-site-status"].value
    : null;

  if (siteStatus === "gone") {
    // 410 Gone — site suspended by operator
    response.statusCode        = 410;
    response.statusDescription = "Gone";
    // Remove the internal header before forwarding to the browser
    delete headers["x-site-status"];
    return response;
  }

  if (siteStatus === "legal") {
    // 451 Unavailable For Legal Reasons (RFC 7725)
    response.statusCode        = 451;
    response.statusDescription = "Unavailable For Legal Reasons";
    // RFC 7725 §3 requires a Link header pointing to the blocking authority when known.
    // Uncomment and fill in if applicable:
    // headers["link"] = { value: '<https://authority.example/>; rel="blocked-by"' };
    delete headers["x-site-status"];
    return response;
  }

  // Live site — pass through unchanged.
  return response;
}
```

### Wiring summary

```
CloudFront behaviour: /* (default)
  Origin:                Lambda Function URL
  Viewer response event: setav-site-status-rewriter (Function above)
```

The Function runs after the Lambda returns a response and before CloudFront
sends it to the browser, so it can safely rewrite the status code regardless
of what the Next.js server emitted.

---

## Local development

```bash
# Uses fixture mode (CONFIG_SOURCE=fixture, default)
npm run dev

# The fixture loaded is: fixtures/sanjayprasad.config.json
# Override with NEXT_PUBLIC_DEV_SUBDOMAIN=<other-subdomain> if needed.
```

In fixture mode:
- `/terms` and `/privacy` render placeholder markdown (no S3 call).
- The consent banner appears because `integrations.ga4Id` is set to `G-FIXTURE0001`.
- The site-status middleware calls `/api/site-status` which uses the fixture
  config; for `sanjayprasad` the status is `"published"` so no `x-site-status`
  header is injected.
