import { Link } from 'react-router'
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Post } from '../posts.types'

function PostRow({ post }: { post: Post }) {
  return (
    <Card className="post-card">
      <CardHeader>
        <h2>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <CardAction>#{post.id}</CardAction>
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
      </CardContent>
    </Card>
  )
}

export function PostRowSkeleton() {
  return (
    <Card className="post-card">
      <CardHeader>
        <Skeleton className="skeleton-title" />
        <Skeleton className="skeleton-title short" />
      </CardHeader>
      <CardContent>
        <Skeleton className="skeleton-body" />
        <Skeleton className="skeleton-body short" />
      </CardContent>
    </Card>
  )
}

export default PostRow
