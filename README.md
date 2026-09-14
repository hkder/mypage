# Hosung Kim's blog

Live site: https://hosungk.com · Astro + Markdown, deployed by GitHub Pages.
The design follows the supplied HTML/CSS handoff in `docs/design-handoff.md`.

## Write a post in your browser

1. Open [the posts folder on GitHub](https://github.com/hkder/mypage/tree/main/src/content/posts).
2. Choose **Add file → Create new file** and name it `your-post-title.md`.
3. Paste this header, then write your article underneath it:

```markdown
---
title: "My next federated learning note"
date: 2026-09-14
tags: [federated-learning, machine-learning]
summary: "A one-sentence description for feeds."
draft: false
---

Start writing here.

## The question

Use normal Markdown for paragraphs, links, lists, tables, and code.
```

4. Set `date` to the post's publication date. Commit the file to **main**. If GitHub proposes a branch, merge its pull request into main when ready.
5. Wait for [Deploy to GitHub Pages](https://github.com/hkder/mypage/actions/workflows/deploy.yml) to finish. The post, tag pages, feeds, and sitemap update automatically.

Use the pencil button on [the sample post](https://github.com/hkder/mypage/edit/main/src/content/posts/federated-learning-first-principles.md) to edit it directly.

`draft: true` excludes a post from every generated page, direct post URL, feed, and sitemap. This repository is public: committed draft source is still visible on GitHub. Keep private drafts outside the repository. A future date does not schedule a post; use the draft flag until ready.

## Optional front matter

- `updated: 2026-09-15` adds an updated date. Change it when revising a published post.
- `series: "Learning Federated Learning"` groups posts in chronological order and adds navigation between published members.
- `tags` use lowercase words separated by hyphens. Tags and counts come from published posts.
- `summary` appears in feeds and page metadata, never in the home list.

File names become URLs: `your-post-title.md` → `/posts/your-post-title/`. Keep a published file name stable so links continue working. Use `##` and `###` headings for the automatic contents list. Reading time is estimated at build time at 230 words/minute. Code is highlighted at build time; no JavaScript reaches the reader.

## Local writing and preview

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. Drafts stay hidden in local previews as well; set `draft: false` locally to preview, then restore it before committing an unfinished piece.

```sh
npm run check
npm run build
npm run preview
```

Deployment preserves the existing domain in `public/CNAME`. Identity is configured in `src/lib/posts.ts`; the page colors and typography live in `src/styles/tokens.css`. An email link is intentionally absent until a public contact address is supplied.
