import Reveal from './Reveal'
import Container from '../ui/Container'

function PageHeader({ description, eyebrow, title }) {
  return (
    <header className="border-b border-border bg-surface py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </header>
  )
}

export default PageHeader
