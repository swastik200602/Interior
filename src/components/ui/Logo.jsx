import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link
      className="font-display text-2xl font-semibold tracking-wide text-foreground"
      to="/"
      aria-label="Interior Haven home"
    >
      Interior Haven
    </Link>
  )
}

export default Logo
