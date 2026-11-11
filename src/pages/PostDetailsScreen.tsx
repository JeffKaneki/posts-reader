import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router'
import Avatar from '@/components/avatar'
import FormattedDate from '@/components/formatted-date'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import CommentList from '@/features/comments/components/CommentList'
import { usePost } from '@/features/posts/posts.hooks'
import { gutter } from '@/lib/layout'

const PostDetailsScreen = () => {
  const { postId } = useParams()
  const { isPending, isError, error, data, refetch } = usePost(Number(postId))

  if (isPending) {
    return (
      <main className="detail-loading">
        <p className="sr-only" role="status">Loading post</p>
        <div aria-hidden>
          <Skeleton className="skeleton-number" />
          <Skeleton className="skeleton-heading" />
          <Skeleton className="skeleton-heading wide" />
          <div className="detail-copy">
            {[1, 2, 3, 4].map((index) => <Skeleton className="skeleton-body" key={index} />)}
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    const missing = isAxiosError(error) && error.response?.status === 404
    return (
      <main className={`${gutter} query-message detail-error`}>
        <p className="detail-code">{missing ? '404' : null}</p>
        <div>
          <h1>{missing ? 'No post at this address' : "The post didn't load"}</h1>
          <p>
            {missing
              ? 'This post either never existed or has been deleted.'
              : error.message}
          </p>
          {missing ? (
            <Link className="ui-button outline" to="/">Browse all posts</Link>
          ) : (
            <Button variant="outline" onClick={() => refetch()}>Try again</Button>
          )}
        </div>
      </main>
    )
  }

  const paragraphs = (data.body ?? '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <main>
      <article className="post-detail">
        <p className="post-number">#{data.id}</p>
        <h1>{data.title}</h1>
        <div className="author">
          <span className="author-info">
            <Avatar>{data.userId}</Avatar>
            Author {data.userId}
          </span>
          <FormattedDate value={data.createdAt} />
        </div>
        <div className="detail-copy">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </article>
      <CommentList postId={data.id} />
    </main>
  )
}

export default PostDetailsScreen
