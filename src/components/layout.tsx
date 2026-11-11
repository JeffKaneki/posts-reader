import { Link, Outlet, useLocation } from 'react-router'
import ModeToggle from './mode-toggle'

function Layout() {
  const { pathname } = useLocation()
  const atRoot = pathname === '/'

  return (
    <div className="app-shell">
      <header className="site-header">
        {atRoot ? (
          <span className="brand">Posts</span>
        ) : (
          <Link className="brand back-link" to="/">
            <span aria-hidden="true">←</span> All posts
          </Link>
        )}
        <ModeToggle />
      </header>
      <Outlet />
    </div>
  )
}

export default Layout
