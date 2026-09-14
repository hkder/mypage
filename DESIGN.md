# Hosung Kim — design system

## 1. Atmosphere & Identity
A quiet, reading-first personal engineering notebook. The exact contract is the supplied Spare Cycles HTML/CSS export, preserved in `docs/design-handoff.md`. Replace its fictional identity and articles with Hosung Kim and real writing; retain its layout and visual grammar. No generated design replaces this reference.

## 2. Color
`src/styles/tokens.css` is copied verbatim from the export: paper #ececea; ink #161616; secondary #4f4f4d; muted #646462; accent #174f78; code background #e0e0dd. Underlines, chips and rules retain the source alpha values. Code hues: keyword #174f78, string #3f5c14, comment #5f5f5c, number #953724, function #5f3384. Light only.

## 3. Typography
Preserve every source type token: Charter/Bitstream Charter/Georgia body, system sans UI, system monospace code, math serif stack. Desktop body/row 19px, h1 36px, h2 25px, h3 20px; UI 14px, small 13px, label 11px, year 28px, name 17px. Body leading 1.6. At <=720px use the exact mobile overrides (body 17px, row 16px, h1 26px, h2 21px). Fonts remain system-local, with no remote font request.

## 4. Spacing & Layout
Home/tag sidebar update: offset the introduction, links and tags 24px (`--space-5`) to the right above 720px, retaining its width and the main/header positions. Mobile has no offset.
Footer update: the page fills at least the viewport height. Extra space belongs to the main content row so the footer sits at the bottom of short pages, with the existing page padding. On long pages it follows the content normally; it is never fixed or overlaid. Print layout keeps its natural content height.
Copy the source token scale without rounding: page max 1080px; padding 44px 56px; gap 64px; rail 200px, home rail 220px; year gutter 88px; measure 72ch; code bleed 22px. Mobile padding and code bleed 18px. The source's component-specific values remain unchanged. Desktop header/main+rail/footer frame; mobile home header/rail/list/footer, post header/article/footer. About/tags index/404 have no rail. Code and wide tables can scroll within their own region.

## 5. Components
Header update: a 32px rounded tree mark (`--size-site-mark`) sits beside “Hosung's Blog” in the existing name type scale, separated by `--space-2`. Both form the home link; Posts, Tags and About remain on the right. The tree uses sage foliage #aec5a1, dark-green outline #496443 and a brown trunk #705a42; these decorative asset colors do not alter the page palette. The same SVG serves as the favicon. The image is decorative and the visible blog title names the link. Page and feed titles use the blog title, while author and copyright remain Hosung Kim.
Base layout owns head, skip link, page frame, SiteHeader and SiteFooter. PostList owns year groups and rows; PostRows owns shared date/title rows. Rail owns description, Chips and tag counts. Toc owns rail-open/mobile-closed native details and nested h3 links. AllPosts owns closed details with current-post state. SeriesNav renders only published series members. Chips supplies real external/profile/feed and tag links. Article prose is generated from validated Markdown, with build-time headings, reading time and code syntax colors. Default, underline hover, visible keyboard focus and aria-current navigation retain the export. A visually hidden home h1 adds semantics without changing geometry. Native details do not pretend to track scrolling. Empty lists show a plain text state; long links wrap.

## 6. Motion & Interaction
No client scripts, animation, transitions, sticky elements, dark toggle, cards, comments or share widgets. Links navigate normally; hover thickens underline. Native details supports keyboard open/close. Contents links navigate real heading IDs. The site works with JavaScript disabled.

## 7. Depth & Surface
Exact flat paper surface with only the source's table/footnote rules and code/series fill. Chips are the only tinted navigation. No shadows, gradients or decorative hero imagery.

## 8. Accessibility Constraints & Accepted Debt
One h1 per page, semantic landmarks, skip link, keyboard focus, labelled navigation, correct dates, wrapped titles and local overflow. Target text contrast >=4.5:1. Preserve desktop/mobile source geometry and source small UI labels. Author profile verified via GitHub; no invented email or content license. The unprovided email chip is omitted; author portrait uses the verified public GitHub avatar. No analytics or tracking. Review readers on desktop/mobile, keyboard-only readers, and the author publishing Markdown. Drafts are excluded from all generated routes and feeds; a public repository is not private draft storage.
