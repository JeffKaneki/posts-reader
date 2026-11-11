import { Route, Routes } from 'react-router'
import HomeScreen from './pages/HomeScreen'
import Layout from './components/layout'
import PostDetailsScreen from './pages/PostDetailsScreen'
import NotFoundScreen from './pages/NotFoundScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route path="posts/:postId" element={<PostDetailsScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  )
}

export default App
