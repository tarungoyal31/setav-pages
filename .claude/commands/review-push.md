# Review & Push

Run a comprehensive review of the landing page, fix all issues found, then commit and push.

## Steps

### 1. Build Check
Run `npm run build` and `npm run lint`. Fix any errors before proceeding.

### 2. Content & Grammar Review
Read every component in `src/components/` and `src/data/siteData.ts`. Check for:
- Spelling errors in all user-visible text (headings, paragraphs, button labels, alt text)
- Grammatical errors (subject-verb agreement, tense consistency, punctuation)
- Awkward or unclear phrasing
- Consistent tone and voice across all sections
- Brand name consistency ("Setav", "Setav Innovations Pvt. Ltd.", etc.)
Fix any issues found directly in the source files.

### 3. Link Audit
Verify every link/URL in the codebase:
- All `href` values in components must use `https://setav.ai/` as the base (NOT `app.setav.ai/#/`)
- Appointment product booking URLs must follow pattern: `https://setav.ai/g/:gid/services/details/:pid`
- External links (LinkedIn, App Store, Play Store) must be valid
- `tel:` and `mailto:` links must be correctly formatted
- All external links must have `target="_blank"` and `rel="noopener noreferrer"`
- Anchor links (#about, #services, #pricing, #contact) must match section `id` attributes
Fix any broken or incorrect links.

### 4. SEO Audit
Read `index.html` and check:
- `<title>` tag is descriptive, under 60 characters, contains primary keywords
- `<meta name="description">` is compelling, 150-160 characters, contains keywords
- `<meta name="keywords">` has relevant comma-separated keywords
- `<meta name="author">` is present
- `<meta name="robots" content="index, follow">` is present
- `<link rel="canonical">` points to the correct URL
- Semantic HTML: sections use proper heading hierarchy (single h1 in hero, h2 for sections, h3 for cards)
- All images have descriptive `alt` attributes
- `<html lang="en">` is set
Fix any SEO issues directly in the source files.

### 5. Open Graph & Social Tags
Check `index.html` for:
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` are all present
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` are all present
- `og:image` points to a valid, absolute URL (should be `/og-image.png` or a full URL)
- `theme-color` meta tag is present

### 6. OG Image Generation
- Check that `scripts/capture-og-image.mjs` exists and the selector inside it matches the current hero section (update the `waitForSelector` if needed to match current markup)
- Start the dev server in background: `npm run dev`
- Wait 3 seconds for it to start
- Run: `node scripts/capture-og-image.mjs`
- Verify `public/og-image.png` was created and is non-empty
- Stop the dev server
- Update `index.html` og:image meta tags to reference the generated image if needed

### 7. Final Build
Run `npm run build` again to ensure all fixes compile cleanly.

### 8. Commit & Push
- Stage all changed files (be specific, no `git add -A`)
- Create a commit with a descriptive message summarizing all review fixes
- Push to the current branch

### Output
Print a summary report:
```
## Review Report
- Content: X issues found and fixed
- Links: X issues found and fixed
- SEO: X issues found and fixed
- OG Tags: X issues found and fixed
- OG Image: Generated / Already up to date
- Build: Passing
- Pushed to: <branch name>
```
