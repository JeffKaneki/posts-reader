import PostList from '@/features/posts/components/PostList'

function HomeScreen() {
  return (
    <main>
      <h1 className="sr-only">Posts</h1>
      <PostList />
    </main>
  )
}

export default HomeScreen
