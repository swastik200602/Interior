import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <article className="group">
      <Link className="block overflow-hidden rounded-lg bg-surface" to={`/projects/${project.slug}`}>
        <img
          className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={project.image}
          alt={`${project.title} interior`}
          loading="lazy"
        />
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">{project.category}</p>
          <h3 className="mt-1 font-display text-3xl">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.location} · {project.year}</p>
        </div>
        <Link className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background" to={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
          <ArrowUpRight aria-hidden="true" size={19} />
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
