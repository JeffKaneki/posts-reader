import type { Comment, Post } from './types'

const API_URL = 'https://jsonplaceholder.typicode.com'

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function getPosts(): Promise<Post[]> {
  return request<Post[]>('/posts')
}

export function getPost(id: number): Promise<Post> {
  return request<Post>(`/posts/${id}`)
}

export function getComments(postId: number): Promise<Comment[]> {
  return request<Comment[]>(`/posts/${postId}/comments`)
}
