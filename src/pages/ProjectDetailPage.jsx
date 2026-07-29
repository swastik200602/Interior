import { ArrowLeft, MapPin } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { PROJECTS } from '../constants/siteContent'
import useDocumentMeta from '../hooks/useDocumentMeta'

function ProjectContent({ project }) {
  useDocumentMeta(`${project.title} | Interior Haven`, project.summary)
  return (
    <main className="pb-20 sm:pb-28">
      <Container className="py-10">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          to="/projects"
        >
          <ArrowLeft aria-hidden="true" size={17} /> Back to projects
        </Link>
      </Container>
      <div className="overflow-hidden bg-surface">
        <img
          className="max-h-[75vh] w-full object-cover"
          src={project.image}
          alt={`${project.title} interior`}
        />
      </div>
      <Container className="pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.45fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              {project.category}
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">
              {project.detail}
            </p>
          </div>
          <dl className="space-y-5 border-t border-border pt-6 lg:mt-12">
            <div>
              <dt className="text-xs font-semibold tracking-wider text-muted uppercase">
                Location
              </dt>
              <dd className="mt-2 flex items-center gap-2">
                <MapPin aria-hidden="true" size={17} /> {project.location}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-muted uppercase">
                Year
              </dt>
              <dd className="mt-2">{project.year}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-muted uppercase">
                Scope
              </dt>
              <dd className="mt-2">{project.scope ?? 'Interior design & styling'}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </main>
  )
}

function ProjectDetailPage() {
  const { projectSlug } = useParams()
  const project = PROJECTS.find((item) => item.slug === projectSlug)
  return project ? (
    <ProjectContent project={project} />
  ) : (
    <Navigate replace to="/not-found" />
  )
}

export default ProjectDetailPage
