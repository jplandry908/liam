import type { Lang } from '@/i18n'
import { allPosts } from 'contentlayer/generated'

type Params = {
  slug: string
  lang: Lang
}

export function findPostByLangAndSlug({ slug, lang }: Params) {
  // TODO: 指定された言語の記事がない場合、enの記事を返す
  return allPosts.find((post) => post.slug === slug && post.lang === lang)
}
