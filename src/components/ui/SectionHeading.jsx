import { cn } from '../../utils/cn'

const alignmentStyles = {
  center: 'mx-auto items-center text-center',
  left: 'items-start text-left',
}

function SectionHeading({
  alignment = 'left',
  className = '',
  description,
  eyebrow,
  title,
}) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-3',
        alignmentStyles[alignment],
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-7 text-muted sm:text-lg">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
