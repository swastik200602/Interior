import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'

function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pt-16 lg:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Interior architecture & design</p>
            <h1 className="mt-5 max-w-xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl xl:text-8xl">Spaces that feel like they belong to you.</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-muted">We create thoughtful, expressive interiors where beauty, function, and everyday life come naturally together.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button as={Link} to="/contact" size="lg">Start your project <ArrowUpRight size={18} /></Button>
              <Button as={Link} to="/projects" size="lg" variant="outline">Explore our work</Button>
            </div>
          </motion.div>

          <motion.div className="relative" initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <div className="overflow-hidden rounded-t-[8rem] bg-surface sm:rounded-t-[12rem]">
              <img className="aspect-[4/5] w-full object-cover" src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90" alt="Warm contemporary living room designed with natural materials" fetchPriority="high" />
            </div>
            <div className="absolute -bottom-7 left-4 rounded-lg bg-foreground px-5 py-4 text-background shadow-soft sm:left-8">
              <p className="font-display text-2xl">15+ years</p>
              <p className="text-xs tracking-wider text-background/70 uppercase">of considered design</p>
            </div>
          </motion.div>
        </div>
        <a className="mt-16 hidden w-fit items-center gap-2 text-sm text-muted transition hover:text-foreground lg:flex" href="#about"><ArrowDown size={17} /> Discover our approach</a>
      </Container>
    </section>
  )
}

export default HeroSection
