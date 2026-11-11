import api from '@/lib/api'
import type { Post } from './posts.types'

export const getPosts = async () => {
  const response = await api.get<Post[]>('/posts')
  return response.data
}

export const getPost = async (id: Post['id']) => {
  return (await api.get<Post>(`/posts/${id}`)).data
}
