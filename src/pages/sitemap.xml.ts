import { publishedPosts, postUrl, tagsFor, site } from '../lib/posts';
import { xml } from '../lib/xml';

export async function GET() {
    const posts = await publishedPosts();
    const paths = ['/', '/tags/', '/about/', ...posts.map(postUrl), ...tagsFor(posts).map(({ tag }) => `/tags/${tag}/`)];
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${xml(site.url + path)}</loc></url>`).join('')}</urlset>`, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
}
