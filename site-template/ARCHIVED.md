# ARCHIVED — SSR Config-Driven 9-Section Site Template

**Status: ARCHIVED. Do not deploy.**

This directory contains the Next.js SSR, config-driven 9-section site template that was the
previous custom-website render path (Epic 2/3). It is no longer the active render path and must
not be deployed.

## Why it was retired

The SSR + `config.json` derivation model has been superseded by the **upload-and-serve** model:
an admin uploads a pre-built static site as a ZIP, which is extracted to immutable S3 build
prefixes and served directly via CloudFront — no SSR, no `config.json`, no template engine.

## Reference documents

- Plan: `/Users/tarungoyal/development/tiffy/docs/plans/2026-06-25-upload-and-serve-custom-websites.md`
- Design source of truth: `/Users/tarungoyal/development/tiffy/docs/customWebpage/upload_render_model.md`

## What to do with this code

Keep for historical reference only. The branch `sanjayp1` is preserved as
`archive/ssr-template-sanjayp1`. No further development should happen here.
