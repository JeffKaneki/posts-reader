import { useEffect, useRef, useState } from 'react'
import { useTheme } from './use-theme'

function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

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
          {(['light', 'dark', 'system'] as const).map((option) => (
            <button
              aria-checked={theme === option}
              key={option}
              onClick={() => {
                setTheme(option)
                setOpen(false)
              }}
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

export default ModeToggle
