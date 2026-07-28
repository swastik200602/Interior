import PageHeader from '../components/common/PageHeader'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ContactCtaSection from './home/ContactCtaSection'
import FaqSection from './home/FaqSection'

function FaqPage() {
  useDocumentMeta(
    'FAQ | Interior Haven',
    'Find answers about Interior Haven project types, timelines, collaboration, and how to begin.',
  )

  return (
    <main>
      <PageHeader
        eyebrow="Frequently asked questions"
        title="Everything you need to know before we begin."
        description="A clear design process starts with clear expectations. These are the questions clients ask us most often."
      />
      <FaqSection />
      <ContactCtaSection />
    </main>
  )
}

export default FaqPage
