import Reveal from '../../components/common/Reveal'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { SERVICES } from '../../constants/siteContent'

function ServicesSection() {
  return (
    <section className="scroll-mt-24 py-20 sm:py-28" id="services">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="A complete approach to thoughtful interiors."
            description="From first sketch to final styling, our services adapt to the scale and needs of your project."
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal
                className="h-full"
                delay={(index % 3) * 0.06}
                key={service.title}
              >
                <article className="h-full bg-background p-7 transition-colors hover:bg-surface sm:p-8">
                  <Icon
                    className="text-primary"
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-8 font-display text-2xl">{service.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{service.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ServicesSection
