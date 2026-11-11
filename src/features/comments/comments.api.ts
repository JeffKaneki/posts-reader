import api from '@/lib/api'
import type { Comment } from './comments.types'

export const getComments = async (postId: Comment['postId']) => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`)
  return response.data
}
