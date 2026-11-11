import type { ReactNode } from 'react'

function Avatar({ children }: { children: ReactNode }) {
  return <span aria-hidden className="avatar">{children}</span>
}

export default Avatar
