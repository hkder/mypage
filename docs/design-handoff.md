# Spare Cycles — design handoff

Static personal engineering blog. Text is the interface; nothing moves; zero client-side JavaScript. This folder is the reference implementation: plain HTML + two CSS files. Port it into Astro (or Hugo) by turning each page into a layout and each block marked below into a component. Do not restyle; change tokens.

## Files

- `tokens.css` — every colour, font, size, measure and spacing value. The only file to edit for a re-tune.
- `styles.css` — component styles keyed on the class names below. No hard-coded values.
- `index.html` — Home (`/`)
- `post.html` — Post (`/posts/<slug>/`)
- `tags.html` — Tags index (`/tags/`)
- `tag.html` — Single tag (`/tags/<tag>/`)
- `about.html` — About (`/about/`)
- `404.html` — Not found

Placeholders you must replace: `Spare Cycles`, `Placeholder Name`, `hello@example.com`, `github.com/placeholder`, `/img/*`, and all lorem ipsum. Post titles in the mockups are deliberately fake.

## Design decisions (keep these)

- **One frame, every page.** `.page` is a two-column grid: header row, `main` + `rail`, footer row. Tags index, About and 404 drop the rail. The header, column positions and footer never move between pages.
- **Reading first.** The article column is `--measure: 72ch` of Charter at 19px / 1.6. Nothing sits inside that column except the article, the meta line, the series block and the footer links.
- **Navigation recedes.** The post rail holds the table of contents (open) and an "All posts" list (a `<details>`, closed). Both are set in `--color-ink-3` and small type so they are found, not noticed. No prev/next, no similar posts, no comments.
- **Home is a list.** Year numeral in a fixed gutter, one row per post: title (ink, accent underline) and day–month date right-aligned. No excerpts, thumbnails, cards, tags, pagination.
- **Colour.** Neutral paper `#ECECEA`, ink `#161616`, one accent `#174F78` for links and chips. Chips (`.chip`) are the only tinted UI and are used for exactly two things: elsewhere-links (GitHub, Email, RSS) and post tags.
- **Light only.** No dark scheme by decision. If added later, override the `--color-*` tokens in a `prefers-color-scheme: dark` block; nothing else changes.
- **Nothing animates.** No `transition`, no `animation`, no sticky positioning anywhere. Hover = thicker underline only.
- **Accessible by default.** Skip link, `aria-current` on nav and TOC, `:focus-visible` rings, semantic headings (`h1` once per page, `h2` for years/tags/sections), footnotes with return links, tabular numerals for dates. All text ≥ 4.5:1.

## Content model (front matter)

```yaml
title: "Placeholder Tidbits 2: Sampling the Void"
date: 2026-07-29
updated: 2026-08-02          # optional → "Updated 2 Aug 2026" in .meta
tags: [probability, statistics]
series: "Placeholder Tidbits" # optional → .series block; prev/next within the series
summary: "One sentence."     # optional; feeds and tag pages only, never Home
draft: false
```

Reading time is computed at build (words / 230, rounded). Date format everywhere: `29 Jul 2026`; on Home the year is implied by the group so rows show `29 Jul`.

## Components and states

Each maps to one Astro component. Class name → file → states.

| Component | Class | States |
|---|---|---|
| Site header | `.site-header`, `.site-name`, `.site-nav` | nav link default (`--color-ink-2`, no underline) · hover (underline) · current (`aria-current="page"`: ink, 600) · focus (2px ring) |
| Year group | `.year-group`, `.year` | desktop (28px light numeral in gutter) · mobile (12px uppercase label above rows) |
| Post row | `.post-row` | default · hover (underline turns full accent) · visited (unchanged by design) · long title (wraps; date stays on one line) |
| List heading | `.list-heading` | with count (`.count`) on tag pages; plain on Tags index |
| Tag heading (Tags index) | `.tag-heading` | link + count |
| Rail (Home / tag) | `.rail`, `.about-line`, `.rail-label`, `.tag-list` | desktop (column) · mobile (About and label hidden, tag list wraps inline) |
| Chip | `.chips`, `.chip` | default · hover (underline) · focus |
| Meta line | `.meta` | date only · date + updated · date + updated + read time (wraps on mobile) |
| Series block | `.series`, `.series-links` | first in series (no ← link) · middle · last (no → link) · absent when `series` unset |
| Table of contents | `.toc--rail` (desktop `<details open>`) · `.toc--mobile` (mobile `<details>` closed) | open · closed · current section (`aria-current="location"`) · nested h3s |
| All posts | `.all-posts` | closed (default) · open · current post (`aria-current="page"`) · hidden on mobile |
| Code block | `.code`, `.code[data-lang]` | with language label · without label · overflow (horizontal scroll, no wrap) · bleeds `--code-bleed` into margins |
| Inline code | `.prose code` | — |
| Blockquote | `.prose blockquote` | with / without attribution `footer` |
| Math block | `.math` | — (swap for KaTeX server-side render if math is enabled; keep `.math` wrapper) |
| Figure | `.prose figure`, `figcaption` | with / without caption |
| Table | `.prose table`, `.num` | header row rule (ink), body rules (`--color-rule`), right-aligned numerics |
| Footnotes | `.footnotes`, `sup a`, return `↩` | — |
| Post tags | `.chips.post-tags` | 1–n chips; omit block when no tags |
| Post footer | `.post-footer`, `.quiet` | — |
| Site footer | `.site-footer` | — |
| Skip link | `.skip` | hidden · focused |

## Layout

- Desktop grid: `minmax(0,1fr) 200px` (post) / `220px` (Home, tag). Page max `1080px`, padding `44px 56px`, column gap `64px`.
- Mobile (≤720px): one column; Home order header → rail (chips + tags) → list → footer; Post order header → article → footer, rail hidden, TOC becomes `.toc--mobile`.
- Code blocks: `margin-inline: calc(-1 * var(--code-bleed))` — 22px desktop, 18px mobile (edge to edge).

## Porting to Astro

1. `src/styles/tokens.css`, `src/styles/styles.css` — import both in the base layout.
2. `Base.astro` — `<head>`, skip link, `.page`, `SiteHeader`, `<slot />`, `SiteFooter`. Pass `current` to the header.
3. Components: `SiteHeader`, `SiteFooter`, `PostList` (takes grouped posts; renders `.year-group`), `Rail` (About + chips + tag list), `Toc` (props: `headings`, `variant: 'rail' | 'mobile'`), `AllPosts`, `SeriesNav`, `Chips`.
4. Pages: `index.astro`, `posts/[slug].astro`, `tags/index.astro`, `tags/[tag].astro`, `about.astro`, `404.astro`, plus `rss.xml.ts` and `atom.xml.ts`.
5. Markdown: use Shiki with a custom theme mapping to the five `--code-*` tokens (or `rehype-pretty-code` emitting `.tok-*` classes). Wrap `<pre>` in `<figure class="code" data-lang="…">` via a rehype plugin. `rehype-slug` for heading ids; build the TOC from `headings` in `render()`.
6. Optional, off by default: KaTeX (`remark-math` + `rehype-katex`, server-side, no client JS); a giscus slot is intentionally not designed.
7. Self-host Charter (`charter_regular.woff2` etc., Bitstream open licence) with `@font-face` in tokens.css if you want it on Windows/Linux. Never load fonts from a CDN.

## Don'ts

No hero/cover images, cards, shadows, hover motion, sticky headers, pagination, infinite scroll, read-more truncation, newsletter box, share buttons, cookie banner, analytics, reading progress bar, hamburger menu, emoji in chrome, gradients, dark-mode toggle.
