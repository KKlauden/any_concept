import { defineConfig, defineCollection, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    articles: defineCollection({
      name: 'Article',
      pattern: 'articles/**/*.md',
      schema: s
        .object({
          title: s.string().max(120),
          slug: s.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
          date: s.isodate(),
          description: s.string().max(500).optional(),
          tags: s.array(s.string()).default([]),
          cover: s.image().optional(),
          draft: s.boolean().default(false),
          locale: s.enum(['zh', 'en']).default('zh'),
          content: s.markdown(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/articles/${data.slug}`,
        })),
    }),
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
