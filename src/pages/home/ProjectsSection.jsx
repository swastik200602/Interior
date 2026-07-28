import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../../components/common/ProjectCard'
import Reveal from '../../components/common/Reveal'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { PROJECTS } from '../../constants/siteContent'

function ProjectsSection() {
  return (
    <section className="py-20 sm:py-28" id="projects">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected projects"
            title="Every space tells a different story."
          />
          <Link
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            to="/projects"
          >
            View all projects <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <Reveal
              className={index % 2 ? 'md:mt-16' : ''}
              key={project.slug}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProjectsSection
