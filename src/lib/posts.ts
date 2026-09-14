import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export const site = {
    name: 'Hosung Kim',
    url: 'https://hosungk.com',
    description: 'Notes on federated learning, machine learning, and the systems behind them.',
    github: 'https://github.com/hkder',
} as const;

export async function publishedPosts(): Promise<Post[]> {
    return (await getCollection('posts', ({ data }) => !data.draft))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function groupByYear(posts: readonly Post[]) {
    const years = [...new Set(posts.map((post) => post.data.date.getUTCFullYear()))];
    return years.sort((a, b) => b - a).map((year) => ({
        year,
        posts: posts.filter((post) => post.data.date.getUTCFullYear() === year),
    }));
}

export function tagsFor(posts: readonly Post[]) {
    return [...new Set(posts.flatMap((post) => post.data.tags))].sort().map((tag) => ({
        tag,
        posts: posts.filter((post) => post.data.tags.includes(tag)),
    }));
}

export function formatDate(date: Date, full = true): string {
    return date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', ...(full ? { year: 'numeric' } : {}), timeZone: 'UTC',
    });
}

export function postUrl(post: Post): string {
    return `/posts/${post.id}/`;
}

export function readingTime(post: Post): number {
    const words = (post.body ?? '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 230));
}
