import PageHeader from '../components/common/PageHeader'
import useDocumentMeta from '../hooks/useDocumentMeta'
import AboutSection from './home/AboutSection'
import ProcessSection from './home/ProcessSection'

function AboutPage() {
  useDocumentMeta(
    'About | Interior Haven',
    'Meet Interior Haven and discover the thoughtful, collaborative process behind our interior design work.',
  )

  return (
    <main>
      <PageHeader
        eyebrow="About Interior Haven"
        title="We design spaces that feel personal, grounded, and enduring."
        description="Our studio brings architecture, material, and everyday life together through a clear and collaborative design process."
      />
      <AboutSection />
      <ProcessSection />
    </main>
  )
}

export default AboutPage
