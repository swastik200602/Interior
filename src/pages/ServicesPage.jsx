import PageHeader from '../components/common/PageHeader'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ContactCtaSection from './home/ContactCtaSection'
import ServicesSection from './home/ServicesSection'

function ServicesPage() {
  useDocumentMeta(
    'Services | Interior Haven',
    'Explore residential, commercial, space-planning, styling, renovation, and consultation services from Interior Haven.',
  )

  return (
    <main>
      <PageHeader
        eyebrow="Our services"
        title="Design support shaped around your project."
        description="From complete interiors to focused consultations, we bring structure, clarity, and a consistent creative direction to every stage."
      />
      <ServicesSection />
      <ContactCtaSection />
    </main>
  )
}

export default ServicesPage
