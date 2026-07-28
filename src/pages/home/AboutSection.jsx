import Container from '../../components/ui/Container'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'

function AboutSection() {
  return (
    <section className="scroll-mt-24 bg-surface py-20 sm:py-28" id="about">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal><SectionHeading eyebrow="Our philosophy" title="Designed around real life, elevated by detail." /></Reveal>
          <Reveal delay={0.1} className="space-y-6 text-base leading-8 text-muted sm:text-lg">
            <p>Interior Haven is an interior design studio creating warm, enduring spaces across residential and boutique commercial projects.</p>
            <p>We begin with listening—not a signature look. The result is a home or workplace that responds to its architecture, reflects the people within it, and grows more meaningful over time.</p>
            <dl className="grid grid-cols-3 gap-4 border-t border-border pt-7 text-foreground">
              <div><dt className="font-display text-4xl">48</dt><dd className="mt-1 text-xs text-muted uppercase">Spaces completed</dd></div>
              <div><dt className="font-display text-4xl">12</dt><dd className="mt-1 text-xs text-muted uppercase">Design awards</dd></div>
              <div><dt className="font-display text-4xl">9</dt><dd className="mt-1 text-xs text-muted uppercase">Cities reached</dd></div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default AboutSection
