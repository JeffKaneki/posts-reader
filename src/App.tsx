import { useEffect, useState } from 'react'
import { getPosts } from './api'
import type { Post } from './types'
import './App.css'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('Unable to load posts. Please try again.'))
  }, [])

  return (
    <div className="app-shell">
      <header className="site-header">
        <span className="brand">Posts</span>
      </header>

      <main>
        <h1>Posts</h1>
        {error ? <p className="status error">{error}</p> : null}
        {!error && posts.length === 0 ? (
          <p className="status">Loading posts</p>
        ) : null}
        <section className="post-list" aria-label="Posts">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <a href={`/posts/${post.id}`}>
                <span className="post-number">#{post.id}</span>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </a>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
