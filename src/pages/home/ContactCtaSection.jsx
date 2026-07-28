import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Reveal from '../../components/common/Reveal'

function ContactCtaSection() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-lg bg-primary px-6 py-16 text-primary-foreground sm:px-12 lg:px-20 lg:py-24">
          <div className="absolute -right-20 -top-28 size-72 rounded-full border border-primary-foreground/20" aria-hidden="true" />
          <div className="absolute -right-8 -top-14 size-72 rounded-full border border-primary-foreground/15" aria-hidden="true" />
          <div className="relative max-w-3xl"><p className="text-sm font-semibold tracking-[0.2em] uppercase opacity-75">Have a project in mind?</p><h2 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">Let’s create a space that feels entirely yours.</h2><Button as={Link} className="mt-8 bg-background text-foreground hover:bg-background/90" to="/contact" size="lg">Tell us about your project <ArrowUpRight size={18} /></Button></div>
        </Reveal>
      </Container>
    </section>
  )
}

export default ContactCtaSection
