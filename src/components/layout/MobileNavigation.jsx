import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function MobileNavigation({ isOpen, items, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  return (
    <div
      id="mobile-navigation"
      className={`fixed inset-0 z-50 bg-background transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
      }`}
      aria-hidden={!isOpen}
      aria-label="Mobile navigation"
      inert={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen flex-col px-4 py-5 sm:px-6">
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            className="grid size-11 place-items-center rounded-md text-foreground hover:bg-surface"
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X aria-hidden="true" size={24} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
          <ul className="flex flex-col items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  className="font-display text-4xl text-foreground transition-colors hover:text-primary"
                  to={item.href}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button as={Link} className="w-full" to="/contact" onClick={onClose}>
          Start a project
        </Button>
      </div>
    </div>
  )
}

export default MobileNavigation
