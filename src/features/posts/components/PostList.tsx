import { Button } from '@/components/ui/button'
import { usePosts } from '../posts.hooks'
import PostRow, { PostRowSkeleton } from './Post'

function PostList() {
  const { isPending, isError, error, data, refetch } = usePosts()

  if (isPending) {
    return (
      <div className="post-list loading-list">
        <p className="sr-only" role="status">Loading posts</p>
        <div aria-hidden className="post-list">
          {[1, 2, 3, 4, 5].map((index) => <PostRowSkeleton key={index} />)}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="query-message">
        <h1>The posts didn&apos;t load</h1>
        <p>{error.message}</p>
        <Button variant="outline" onClick={() => refetch()}>Try again</Button>
      </div>
    )
  }

  if (data.length === 0) {
    return <p className="query-message">Nothing published yet.</p>
  }

  return (
    <div className="post-list">
      {data.map((post) => <PostRow key={post.id} post={post} />)}
    </div>
  )
}

export default PostList
