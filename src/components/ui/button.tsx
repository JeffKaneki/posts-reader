import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'default'
}

export function Button({ className = '', variant = 'default', ...props }: ButtonProps) {
  return <button className={`ui-button ${variant} ${className}`} {...props} />
}
