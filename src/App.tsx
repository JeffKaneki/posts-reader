import { useCallback, useEffect, useRef, useState } from 'react'
import { getComments, getPost, getPosts } from './api'
import type { Comment, Post } from './types'
import './App.css'

type Theme = 'light' | 'dark' | 'system'

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
      ? storedTheme
      : 'system'
  })
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      document.documentElement.classList.toggle('dark', isDark)
    }
    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [theme])

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  const chooseTheme = (nextTheme: Theme) => {
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    setOpen(false)
  }

  return (
    <div className="theme-control" ref={menuRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Toggle theme"
        className="theme-button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        type="button"
      >
        {theme === 'dark' ? '☾' : theme === 'light' ? '☼' : '◐'}
      </button>
      {open ? (
        <div className="theme-menu" role="menu" aria-label="Toggle theme">
          {(['light', 'dark', 'system'] as Theme[]).map((option) => (
            <button
              aria-checked={theme === option}
              key={option}
              onClick={() => chooseTheme(option)}
              role="menuitemradio"
              type="button"
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const handleError = useCallback((message: string) => setError(message), [])
  const handlePosts = useCallback((loadedPosts: Post[]) => setPosts(loadedPosts), [])

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const postId = path.match(/^\/posts\/(\d+)$/)?.[1]

  return (
    <div className="app-shell">
      <header className="site-header">
        {postId ? (
          <a
            className="brand back-link"
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigate('/')
            }}
          >
            <span aria-hidden="true">←</span> All posts
          </a>
        ) : (
          <span className="brand">Posts</span>
        )}
        <ThemeToggle />
      </header>
      {postId ? (
        <PostDetail id={Number(postId)} />
      ) : (
        <PostIndex
          error={error}
          posts={posts}
          onError={handleError}
          onPosts={handlePosts}
        />
      )}
    </div>
  )
}

type PostIndexProps = {
  error: string | null
  posts: Post[]
  onError: (message: string) => void
  onPosts: (posts: Post[]) => void
}

function PostIndex({ error, posts, onError, onPosts }: PostIndexProps) {
  useEffect(() => {
    getPosts().then(onPosts).catch(() => onError('Unable to load posts. Please try again.'))
  }, [onError, onPosts])

  return (
    <main>
      <h1>Posts</h1>
      {error ? <p className="status error">{error}</p> : null}
      {!error && posts.length === 0 ? <p className="status">Loading posts</p> : null}
      <section className="post-list" aria-label="Posts">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <a
              href={`/posts/${post.id}`}
              onClick={(event) => {
                event.preventDefault()
                navigate(`/posts/${post.id}`)
              }}
            >
              <span className="post-number">#{post.id}</span>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}

function PostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getPost(id), getComments(id)])
      .then(([loadedPost, loadedComments]) => {
        setPost(loadedPost)
        setComments(loadedComments)
      })
      .catch(() => setError('Unable to load this post. Please try again.'))
  }, [id])

  return (
    <main>
      {error ? <p className="status error">{error}</p> : null}
      {!error && !post ? <p className="status">Loading post</p> : null}
      {post ? (
        <>
          <article className="post-detail">
            <span className="post-number">#{post.id}</span>
            <h1>{post.title}</h1>
            <div className="author">
              <span className="avatar">{post.userId}</span>
              <span>Author {post.userId}</span>
            </div>
            <p>{post.body}</p>
          </article>
          <section className="comments" aria-labelledby="comments-heading">
            <div className="comments-heading">
              <span>{comments.length}</span>
              <h2 id="comments-heading">Comments</h2>
            </div>
            {comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <div className="comment-heading">
                  <span className="avatar">{comment.name[0].toUpperCase()}</span>
                  <h3>{comment.name}</h3>
                </div>
                <p>{comment.body}</p>
              </article>
            ))}
          </section>
        </>
      ) : null}
    </main>
  )
}

export default App
