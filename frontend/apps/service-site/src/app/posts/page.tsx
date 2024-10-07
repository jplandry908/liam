import { fallbackLang } from '@/i18n'
import { filterPostsByLang } from '@/utils/posts'
import type { Post } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import Link from 'next/link'

function PostCard(post: Post) {
  return (
    <div>
      <h2>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: No problem, as it is only via Markdown written by in-house members. */}
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}

export default function Page() {
  const posts = filterPostsByLang(fallbackLang)
  const sortedPosts = posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <div>
      <h1>Posts</h1>
      {sortedPosts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}
