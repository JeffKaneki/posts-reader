import { Route, Routes } from 'react-router'
import HomeScreen from './pages/HomeScreen'
import Layout from './components/layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
      </Route>
    </Routes>
  )
}

export default App
