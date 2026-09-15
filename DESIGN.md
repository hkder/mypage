# Hosung’s personal notebook

Approved production design: a quiet, light technical notebook with a small tree identity, Merriweather reading typography, system-font navigation, and restrained green accents. The home page is only a year/title/date archive of real posts in one centered 760px column, inspired by the plain scrolling list at https://yihui.org/en/. No hero, image, summary, introduction, or sidebar. No invented activity, sample cards, or subscription promotion.

## Tokens and layout

`src/styles/tokens.css` defines the palette, type roles, and spacing. Paper is #f9f9f9, ink #1e293b, muted text #59645d, accent #395b43, code surface #edf1ea. Gutters are 24px on desktop and 16px on mobile. Every page uses the same centered 760px measure and fixed header: home, About, articles, tags, and 404. Year headings sit above each year’s list, in 20px bold serif; post links use 16px serif and dates 12px system type. Rows use a 12px gap and title/date alignment without borders. A 32px gap separates the header from the archive. Content scrolls below a fixed opaque header. Header height is 100px on desktop, 82px below 701px, and 120px below 361px to reserve the two-line navigation. The shell and anchor scroll padding use the same height token.

The reader shares that single column. Contents use a native disclosure above the text at every width; no separate sidebar shifts the page frame. Body type is 17px/1.75, mobile 16px/1.8; code and tables use 13px. Headings supply hierarchy without decorative dividers. No article cover, duplicate summary, or author/back-link footer row.

## Shared primitives

Header navigation sits beside the tree and blog name with a 48px desktop gap, rather than at the far end of the content column. The mobile header wraps naturally with its existing 12px gap.

Astro Layout, SiteHeader, SiteFooter, PostList/PostRows, and Toc render real HTML. All routes share token-driven CSS and identical header, main-column, and footer alignment. The reference contributes its single-column year-list structure; Hosung’s tree, green links, footer, and approved reader remain his own. Writing stays in Markdown; published posts alone supply routes, archives, tags, feeds, and sitemap. About content is separately editable Markdown. Each post may supply its own optional image with intrinsic dimensions.

The footer is normal document flow, with a flex shell filling short viewports. Never fix it to the screen or reposition it with JavaScript. Text only: copyright and “Writing & snippets: CC BY-NC 4.0”, linked to the official deed. No badge images or visible RSS links; feed discovery remains in the document head.

## Accessibility and performance

Semantic headings and navigation, visible keyboard focus, skip link, descriptive image alternative, native contents disclosure, horizontal code scrolling, copy status and honest failure guidance. Reader progress is decorative. Self-hosted WOFF2 Latin fonts load first, with separate fallback glyph ranges and font-display swap. Only reader pages load the small progressive-enhancement script. No browser framework, remote font calls, animation library, or layout-measuring footer code.
