import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../../constants/navigation'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Logo from '../ui/Logo'
import MobileNavigation from './MobileNavigation'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  function closeMenu() {
    setIsMenuOpen(false)
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        requestAnimationFrame(() => menuButtonRef.current?.focus())
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <Container className="flex min-h-20 items-center justify-between gap-3 sm:gap-6">
        <Logo />

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-7">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-foreground ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`
                  }
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          as={Link}
          size="sm"
          className="ml-auto shrink-0 whitespace-nowrap px-3 text-xs sm:px-4 sm:text-sm lg:px-5"
          to="/contact"
        >
          Start a project
        </Button>

        <button
          ref={menuButtonRef}
          className="grid size-11 place-items-center rounded-md text-foreground transition-colors hover:bg-surface lg:hidden"
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" size={24} />
        </button>
      </Container>

      <MobileNavigation
        isOpen={isMenuOpen}
        items={NAVIGATION_ITEMS}
        onClose={closeMenu}
      />
    </header>
  )
}

export default Navbar
