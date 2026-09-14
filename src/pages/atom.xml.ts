import { publishedPosts, postUrl, site } from '../lib/posts';
import { xml } from '../lib/xml';

export async function GET() {
    const posts = await publishedPosts();
    const updated = posts.reduce((latest, post) => Math.max(latest, (post.data.updated ?? post.data.date).getTime()), 0);
    const entries = posts.map((post) => {
        const url = `${site.url}${postUrl(post)}`;
        return `<entry><title>${xml(post.data.title)}</title><id>${xml(url)}</id>
<link href="${xml(url)}"/><published>${post.data.date.toISOString()}</published>
<updated>${(post.data.updated ?? post.data.date).toISOString()}</updated>
<summary>${xml(post.data.summary ?? '')}</summary>
${post.data.tags.map((tag) => `<category term="${xml(tag)}"/>`).join('')}</entry>`;
    }).join('');
    return new Response(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"><title>${xml(site.name)}</title>
<subtitle>${xml(site.description)}</subtitle><id>${site.url}/</id>
<link href="${site.url}/"/><link href="${site.url}/atom.xml" rel="self"/>
<updated>${new Date(updated).toISOString()}</updated><author><name>${xml(site.name)}</name></author>
${entries}</feed>`, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
