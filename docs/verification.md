# Blog verification — 14 September 2026

- Verified repository `hkder/mypage`, existing GitHub Pages domain `hosungk.com`, valid HTTPS configuration, and author name/profile through GitHub.
- Exact ZIP tokens retained; original CSS preserved with small semantic/Markdown adapters. All seven generated pages are real Astro components and Markdown content, with no shipped JavaScript.
- `npm run check`: 24 files, zero errors, warnings or hints. `npm run build`: seven HTML pages plus RSS, Atom and sitemap. `git diff --check` clean.
- Browser QA: all seven page routes at 375, 768 and 1280 pixels. No horizontal page overflow or broken images; valid heading anchors and eight internal destinations. Navigation, native contents/all-posts toggles and keyboard skip link exercised with JavaScript disabled. Axe WCAG A/AA checks found no violations on all routes at mobile and desktop widths.
- Reference fidelity: 21 viewport comparisons show zero differing pixels in first-screen captures after replacing fictional reference content with the actual blog content. This checks original page shells and CSS, not correspondence to the ZIP's fictional post archive. Full-page screenshots separately cover article body and interaction states.
- Lighthouse: home and article, three runs per mobile/desktop preset; all four categories 100 in every final local run. Earlier desktop measurements incorrectly combined desktop scoring with mobile throttling; final runs use Lighthouse's official desktop preset.
- Publishing exercise: temporary Markdown file generated a post, historical year group, new tag, RSS/Atom/sitemap entries and chronological series links. XML escaped special characters. Switching to draft removed the direct route and all entries, then the fixture was removed and the real blog rebuilt.
- The article's executable Python example prints `1.1`. Its numbers are explicitly illustrative; no completed experiment or benchmark is claimed.

## Dependency status

Compatible dependency updates reduced the starter's audit from 14 findings to three: Astro (critical), sharp (high), esbuild (low). The remaining fixes require upgrading Astro from v5 to v7, which is outside this design port. The deployed artifact is static HTML/CSS/images/XML, with no Astro server, image endpoint, server islands or client hydration. Those server-side runtime features are not deployed. This does not certify the build tooling as vulnerability-free. Local preview is bound to loopback. Revisit the major upgrade separately.

## Evidence location

Local browser captures, comparison JSON, performance runs, publishing exercise and independent reviewer reports are in `/private/tmp/mypage-qa/`. Deployment is verified separately against the public domain after publishing.
