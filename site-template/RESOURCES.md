# Custom Websites — AWS Resources

Account `867344461770` (profile `setav`), region `ap-south-1` unless noted (CloudFront/ACM are global / `us-east-1`).

| # | Resource | Identifier | Status / Notes |
|---|----------|-----------|----------------|
| 11 | CloudFront alias `*.setav.app` on dist `E2M1EVPWX49D4V` | `dbsvbyr9gqw1l.cloudfront.net` | ❌ NOT attached — ATTACHED then ROLLED BACK on 2026-06-21. Aliases currently `Quantity=0`. Attach was blocked at the render abort-gate (see #12). |
| 12 | DNS `*.setav.app` → custom distribution | Route53 zone `Z0646654U8IEOB79WLF9` | ❌ NOT cut over — ABORTED 2026-06-21. `*.setav.app` CNAME → `d1uci9sznrjfvp.cloudfront.net` (Amplify) UNCHANGED. Traffic record was never written because the render gate failed. |

## 2026-06-21 — Wildcard go-live cutover ABORTED at render gate

- **Amplify `*` removal:** Removed `{prefix:"*",branchName:"main"}` from `setav.app` domain (app `d2qw46n6s56u7d`); apex + 6 named (dev/www/tarungoyal/fitnglow/sanjayp/ajnaeye) retained; domain reached AVAILABLE. **Then re-added during rollback** — `*` is back; all 8 subdomains restored.
- **Alias attach:** `*.setav.app` attached to dist `E2M1EVPWX49D4V` via signed-REST `update-distribution` (no CNAMEAlreadyExists; Amplify had released `*`). Reached Deployed. **Then removed during rollback** — Aliases back to 0. Both OACs (`E2DIIRETUWUA88`, `E2M7NMRFODGOY`), custom ORP `bb9ab550-e8d9-428a-87cd-3993a5d0033e`, cert `439b358c…`, 2 origins / 2 behaviors / 2 functions preserved on every write.
- **RENDER ABORT-GATE FAILED:** via `--resolve` to CloudFront (no DNS), both `sanjayprasad.setav.app` and `doesnotexist.setav.app` returned **HTTP 403 `AccessDeniedException`** with body `Forbidden. For troubleshooting Function URL authorization issues, see: .../urls-auth.html`. Expected 200+"Sanjay Prasad" / 404. This is a **Lambda Function URL (SSR origin) authorization failure** — NOT addressed by the ORP header-exclusion fix. Likely the OAC→function-URL `lambda:InvokeFunctionUrl` resource permission / SigV4 signing for `yqpvnmfy2ib2elx2cftcxfzyka0xgmgq.lambda-url.ap-south-1.on.aws` is misconfigured.
- **Route53 traffic record: NOT written.** DNS untouched throughout — zero user-visible impact.
- **Post-rollback verification:** dist Aliases=0; Amplify has `*` back (8 subdomains); `*.setav.app` CNAME still → Amplify; `sanjayp.setav.app` 200, `setav.app` apex 302 (normal redirect), `sanjayprasad.setav.app` 200 (still via Amplify).

**Follow-up before retry:** fix the SSR Lambda Function URL authorization for the custom distribution (verify `AuthType`, the `lambda:InvokeFunctionUrl` resource policy granting `cloudfront.amazonaws.com` scoped to dist `E2M1EVPWX49D4V`, and that OAC `E2M7NMRFODGOY` is the one signing the `ssr-lambda` origin). Re-run the gate before any DNS write.
