import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import useDocumentMeta from '../hooks/useDocumentMeta'

function NotFoundPage() {
  useDocumentMeta('Page not found | Interior Haven', 'The requested page could not be found.')
  return (
    <main className="grid min-h-[70vh] place-items-center py-20 text-center">
      <Container>
        <p className="font-display text-8xl text-primary">404</p>
        <h1 className="mt-3 font-display text-5xl">This room doesn’t exist.</h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-muted">
          The page may have moved, or the address may be incorrect.
        </p>
        <Button as={Link} className="mt-8" to="/">
          Return home
        </Button>
      </Container>
    </main>
  )
}

export default NotFoundPage
