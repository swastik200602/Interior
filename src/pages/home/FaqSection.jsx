import { Plus } from 'lucide-react'
import Container from '../../components/ui/Container'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { FAQS } from '../../constants/siteContent'

function FaqSection() {
  return (
    <section className="scroll-mt-24 py-20 sm:py-28" id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Common questions"
              title="A little clarity before we begin."
            />
          </Reveal>
          <Reveal className="divide-y divide-border border-y border-border">
            {FAQS.map((item) => (
              <details className="group py-6" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-2xl">
                  <span>{item.question}</span>
                  <Plus
                    className="shrink-0 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                    size={21}
                  />
                </summary>
                <p className="max-w-2xl pt-4 leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default FaqSection
