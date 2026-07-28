import Container from '../../components/ui/Container'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { PROCESS_STEPS } from '../../constants/siteContent'

function ProcessSection() {
  return (
    <section className="bg-foreground py-20 text-background sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            className="[&_h2]:text-background [&_p:last-child]:text-background/65"
            eyebrow="Our process"
            title="Clear, collaborative, considered."
            description="A structured process makes room for creativity while keeping decisions, budgets, and delivery moving forward."
          />
        </Reveal>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal delay={index * 0.06} key={step.number}>
              <li className="border-t border-background/20 pt-6">
                <span className="text-sm text-accent">{step.number}</span>
                <h3 className="mt-8 font-display text-3xl">{step.title}</h3>
                <p className="mt-3 leading-7 text-background/65">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export default ProcessSection
