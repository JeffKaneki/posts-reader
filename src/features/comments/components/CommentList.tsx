import { Button } from '@/components/ui/button'
import { useComments } from '../comments.hooks'
import CommentItem, { CommentItemSkeleton } from './Comment'

function CommentList({ postId }: { postId: number }) {
  const { isPending, isError, error, data, refetch } = useComments(postId)

  return (
    <section className="comments" aria-labelledby="comments-heading">
      <div className="comments-heading">
        <span>{data ? data.length : null}</span>
        <h2 id="comments-heading">Comments</h2>
      </div>
      <div className="comments-list">
        {isPending && (
          <>
            <p className="sr-only" role="status">Loading comments</p>
            <div aria-hidden className="comments-list">
              {[1, 2, 3].map((index) => <CommentItemSkeleton key={index} />)}
            </div>
          </>
        )}
        {isError && (
          <div className="query-message">
            <p>{error.message}</p>
            <Button variant="outline" onClick={() => refetch()}>Try again</Button>
          </div>
        )}
        {data?.length === 0 && <p className="status">No comments on this post.</p>}
        {data?.map((comment) => <CommentItem comment={comment} key={comment.id} />)}
      </div>
    </section>
  )
}

export default CommentList
