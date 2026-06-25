/**
 * OpenNext configuration for Setav site-template.
 *
 * Target deployment:
 *   - Single regional Lambda (ap-south-1) runs the Next.js server
 *   - CloudFront is the public-facing origin; the Lambda is NOT publicly exposed
 *   - Static assets (.next/static, public/) are uploaded to S3 and served
 *     directly by CloudFront via a separate S3 origin behaviour
 *
 * This config intentionally omits ISR/revalidation helpers (no DynamoDB tag
 * cache, no SQS revalidation queue) because every page is fully dynamic:
 * the renderer fetches site config from S3 on every request and does not use
 * Next.js static generation or ISR.
 *
 * To build the Lambda bundle:
 *   npm run build            # next build (generates .next/standalone)
 *   npm run build:open-next  # open-next build (wraps standalone into .open-next/)
 */

// open-next.config.ts is excluded from the Next.js tsconfig (it is read by
// the OpenNext CLI, not by the Next.js compiler).  The OpenNext CLI ships its
// own tsconfig for this file and resolves the type correctly.
import type { OpenNextConfig } from "@opennextjs/aws/types/open-next";

const config: OpenNextConfig = {
  default: {
    override: {
      // aws-lambda-streaming: enables response streaming from the Lambda so
      // Next.js streaming SSR (React Suspense) works end-to-end through
      // CloudFront without buffering the entire HTML before sending.
      wrapper: "aws-lambda-streaming",

      // aws-apigw-v2: translates API Gateway v2 / Lambda Function URL
      // payloads to/from the Next.js internal request/response format.
      // CloudFront must forward requests to the Lambda via a Function URL
      // (not API Gateway v1) for this to work.
      converter: "aws-apigw-v2",
    },
  },
};

export default config;
