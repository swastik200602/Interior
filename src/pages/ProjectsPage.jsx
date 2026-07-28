import ProjectCard from '../components/common/ProjectCard'
import Reveal from '../components/common/Reveal'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { PROJECTS } from '../constants/siteContent'
import useDocumentMeta from '../hooks/useDocumentMeta'

function ProjectsPage() {
  useDocumentMeta(
    'Projects | Interior Haven',
    'Explore residential, hospitality, and workspace interiors by Interior Haven.',
  )

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our portfolio"
            title="Spaces with a lasting sense of place."
            description="A selection of homes, workplaces, and hospitality environments shaped through close collaboration."
          />
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <Reveal
              className={index % 2 ? 'md:mt-16' : ''}
              key={project.slug}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  )
}

export default ProjectsPage
