# Hosung’s personal notebook

Approved production design: a quiet, light technical notebook with a small tree identity, Merriweather reading typography, system-font navigation, and restrained green accents. The home page shows the newest published note and a year/title/date archive of real posts. No invented activity, sample cards, or subscription promotion.

## Tokens and layout

`src/styles/tokens.css` defines the palette, type roles, and spacing. Paper is #f9f9f9, ink #1e293b, muted text #59645d, accent #395b43, code surface #edf1ea. Desktop gutters are 24px, mobile gutters 16px. The home archive caps at 960px; feature artwork caps at 340px (240px on mobile). The right profile is 180px with a 32px gap, starts 132px below the top, and sticks at 48px. Below 1001px, an inline personal introduction replaces the profile. On mobile the feature headline comes before artwork.

The reader is centered in its flexible column, capped at 760px, alongside a 180px contents rail sticky at 40px. Below 1001px contents become a native disclosure. Body type is 17px/1.75, mobile 16px/1.8; code and tables use 13px. Headings supply hierarchy without decorative dividers. No article cover, duplicate summary, or author/back-link footer row.

## Shared primitives

Astro Layout, SiteHeader, SiteFooter, PostList/PostRows, and Toc render real HTML. Home and reader share token-driven CSS. Writing stays in Markdown; published posts alone supply routes, archives, tags, feeds, and sitemap. About content is separately editable Markdown. Each post may supply its own optional image with intrinsic dimensions.

The footer is normal document flow, with a flex shell filling short viewports. Never fix it to the screen or reposition it with JavaScript. Text only: copyright and “Writing & snippets: CC BY-NC 4.0”, linked to the official deed. No badge images or visible RSS links; feed discovery remains in the document head.

## Accessibility and performance

Semantic headings and navigation, visible keyboard focus, skip link, descriptive image alternative, native contents disclosure, horizontal code scrolling, copy status and honest failure guidance. Reader progress is decorative. Self-hosted WOFF2 Latin fonts load first, with separate fallback glyph ranges and font-display swap. Only reader pages load the small progressive-enhancement script. No browser framework, remote font calls, animation library, or layout-measuring footer code.
