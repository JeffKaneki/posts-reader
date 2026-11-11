import { useQuery } from '@tanstack/react-query'
import { getPost, getPosts } from './posts.api'
import type { Post } from './posts.types'

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}

export const usePost = (id: Post['id']) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
  })
}
