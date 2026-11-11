import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'default'
}

export function Card({ className = '', ...props }: CardProps) {
  return <div className={`ui-card ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-card-header ${className}`} {...props} />
}

export function CardAction({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-card-action ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-card-content ${className}`} {...props} />
}
