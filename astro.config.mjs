// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://hosungk.com',
    trailingSlash: 'always',
    build: { inlineStylesheets: 'always' },
    markdown: {
        shikiConfig: {
            theme: {
                name: 'spare-cycles',
                type: 'light',
                colors: { 'editor.background': '#edf1ea', 'editor.foreground': '#161616' },
                tokenColors: [
                    { scope: ['keyword', 'storage'], settings: { foreground: '#174f78' } },
                    { scope: 'string', settings: { foreground: '#3f5c14' } },
                    { scope: 'comment', settings: { foreground: '#5f5f5c' } },
                    { scope: 'constant.numeric', settings: { foreground: '#953724' } },
                    { scope: 'entity.name.function', settings: { foreground: '#5f3384' } },
                ],
            },
            transformers: [{
                root(tree) {
                    tree.children = [{
                        type: 'element',
                        tagName: 'figure',
                        properties: { className: ['code'], dataLang: this.options.lang },
                        children: [{
                            type: 'element', tagName: 'figcaption', properties: { className: ['code-toolbar'] },
                            children: [{ type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: this.options.lang === 'python' ? 'Python' : this.options.lang }] }],
                        }, ...tree.children.filter((node) => node.type !== 'doctype')],
                    }];
                },
            }],
        },
    },
});
