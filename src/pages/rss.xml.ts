import rss from '@astrojs/rss';
import { publishedPosts, postUrl, site } from '../lib/posts';

export async function GET() {
    return rss({
        title: site.title,
        description: site.description,
        site: site.url,
        items: (await publishedPosts()).map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.summary ?? '',
            link: postUrl(post),
            categories: post.data.tags,
        })),
    });
}
