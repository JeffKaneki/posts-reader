import Avatar from '@/components/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Comment } from '../comments.types'

const initialOf = (email: string) => email.trim().charAt(0).toUpperCase() || '?'

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <Card className="comment-card">
      <CardHeader>
        <div className="comment-heading">
          <Avatar>{initialOf(comment.email)}</Avatar>
          <h3>{comment.name}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment.body}</p>
      </CardContent>
    </Card>
  )
}

export function CommentItemSkeleton() {
  return (
    <Card className="comment-card">
      <CardHeader>
        <div className="comment-heading">
          <Skeleton className="comment-avatar-skeleton" />
          <Skeleton className="comment-name-skeleton" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="skeleton-body" />
        <Skeleton className="skeleton-body short" />
      </CardContent>
    </Card>
  )
}

export default CommentItem
