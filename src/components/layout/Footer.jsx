import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../../constants/navigation'
import { SITE } from '../../constants/siteContent'
import Container from '../ui/Container'
import Logo from '../ui/Logo'

function Footer() {
  return (
    <footer className="border-t border-border bg-surface pt-16 sm:pt-20">
      <Container>
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm leading-7 text-muted">
              Considered interiors shaped by natural materials, quiet details,
              and the lives lived within them.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Follow our studio <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase">Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className="text-muted hover:text-foreground" to={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase">
              Visit & connect
            </h2>
            <address className="mt-5 space-y-4 not-italic text-muted">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" aria-hidden="true" size={17} />
                {SITE.address}
              </p>
              <a
                className="flex items-center gap-3 hover:text-foreground"
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              >
                <Phone aria-hidden="true" size={17} /> {SITE.phone}
              </a>
              <a
                className="flex items-center gap-3 hover:text-foreground"
                href={`mailto:${SITE.email}`}
              >
                <Mail aria-hidden="true" size={17} /> {SITE.email}
              </a>
            </address>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Interior design with purpose.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
