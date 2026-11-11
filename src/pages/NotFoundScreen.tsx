import { Link, useLocation } from 'react-router'
import { gutter } from '@/lib/layout'

function NotFoundScreen() {
  const { pathname } = useLocation()

  return (
    <main className={`${gutter} query-message detail-error`}>
      <p className="detail-code">404</p>
      <div>
        <h1>This page doesn&apos;t exist</h1>
        <p>
          Nothing is routed at <code>{pathname}</code>.
        </p>
        <Link className="ui-button outline" to="/">Browse all posts</Link>
      </div>
    </main>
  )
}

export default NotFoundScreen
