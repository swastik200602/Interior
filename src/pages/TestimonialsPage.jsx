import PageHeader from '../components/common/PageHeader'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ContactCtaSection from './home/ContactCtaSection'
import TestimonialsSection from './home/TestimonialsSection'

function TestimonialsPage() {
  useDocumentMeta(
    'Client Stories | Interior Haven',
    'Read what clients say about working with Interior Haven on residential and hospitality interiors.',
  )

  return (
    <main>
      <PageHeader
        eyebrow="Client stories"
        title="Trusted partnerships, thoughtfully delivered."
        description="The best measure of our work is how a space feels to the people who live, work, and gather within it."
      />
      <TestimonialsSection />
      <ContactCtaSection />
    </main>
  )
}

export default TestimonialsPage
