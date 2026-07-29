import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link
      className="shrink-0 whitespace-nowrap font-display text-xl font-semibold tracking-wide text-foreground sm:text-2xl"
      to="/"
      aria-label="Interior Haven home"
    >
      Interior Haven
    </Link>
  )
}

export default Logo
