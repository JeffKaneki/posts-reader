import { useQuery } from '@tanstack/react-query'
import { getComments } from './comments.api'
import type { Comment } from './comments.types'

export const useComments = (postId: Comment['postId']) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  })
}
