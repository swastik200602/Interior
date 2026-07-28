import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button'

function MobileNavigation({ isOpen, items, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      id="mobile-navigation"
      className="fixed inset-0 z-[100] overflow-y-auto bg-foreground text-background lg:hidden"
      aria-label="Mobile navigation"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-foreground px-6 py-6 sm:px-8">
        <div
          className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full border border-background/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full border border-background/5"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center justify-between border-b border-background/15 pb-5">
          <Link
            className="font-display text-2xl tracking-wide text-background"
            to="/"
            onClick={onClose}
          >
            Interior Haven
          </Link>
          <button
            ref={closeButtonRef}
            className="grid size-11 place-items-center rounded-full border border-background/20 text-background transition-colors hover:border-primary hover:bg-primary"
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X aria-hidden="true" size={24} />
          </button>
        </div>

        <nav
          className="relative z-10 flex flex-1 flex-col justify-center py-10"
          aria-label="Mobile navigation"
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-background/45 uppercase">
            Explore the studio
          </p>
          <ul className="divide-y divide-background/15 border-y border-background/15">
            {items.map((item, index) => (
              <li className="group" key={item.href}>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-4 transition-colors ${
                      isActive ? 'text-primary' : 'text-background hover:text-primary'
                    }`
                  }
                  to={item.href}
                  onClick={onClose}
                >
                  <span className="w-6 text-xs font-medium text-background/35">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-3xl sm:text-4xl">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="text-background/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                    size={19}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 border-t border-background/15 pt-5">
          <Button
            as={Link}
            className="w-full rounded-full"
            to="/contact"
            size="lg"
            onClick={onClose}
          >
            Start a project <ArrowUpRight aria-hidden="true" size={18} />
          </Button>
          <p className="mt-4 text-center text-xs text-background/40">
            Thoughtful interiors, designed around you.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default MobileNavigation
