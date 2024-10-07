import type { PageProps } from '@/app/types'
import { fallbackLang } from '@/i18n'
import { findPostByLangAndSlug } from '@/utils/posts'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { object, parse, string } from 'valibot'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: PageProps) => {
  const { slug } = parse(paramsSchema, params)
  const post = findPostByLangAndSlug({ lang: fallbackLang, slug })

  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  return { title: post.title }
}

const paramsSchema = object({
  slug: string(),
})

export default function Page({ params }: PageProps) {
  const { slug } = parse(paramsSchema, params)

  const post = findPostByLangAndSlug({ lang: fallbackLang, slug })
  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  return (
    <article>
      <div>
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1>{post.title}</h1>
      </div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  )
}
