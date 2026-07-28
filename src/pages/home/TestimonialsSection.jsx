import { Quote } from 'lucide-react'
import Container from '../../components/ui/Container'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { TESTIMONIALS } from '../../constants/siteContent'

function TestimonialsSection() {
  return (
    <section className="scroll-mt-24 bg-surface py-20 sm:py-28" id="testimonials">
      <Container>
        <Reveal>
          <SectionHeading
            alignment="center"
            eyebrow="Client stories"
            title="How the experience feels."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal className="h-full" delay={index * 0.08} key={item.name}>
              <figure className="flex h-full flex-col rounded-lg bg-background p-7 sm:p-8">
                <Quote className="text-primary" aria-hidden="true" size={28} />
                <blockquote className="mt-7 flex-1 font-display text-2xl leading-snug">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.project}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSection
