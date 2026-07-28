import { cn } from '../../utils/cn'

const fieldStyles =
  'mt-2 min-h-12 w-full rounded-md border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-70'

export function FormField({ error, id, label, multiline = false, ...props }) {
  const Component = multiline ? 'textarea' : 'input'
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <Component
        className={cn(fieldStyles, multiline && 'min-h-32 resize-y py-3')}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-destructive" id={`${id}-error`}>
          {error.message}
        </p>
      )}
    </div>
  )
}

export function SelectField({ error, id, label, options, placeholder = 'Select an option', ...props }) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <select
        className={fieldStyles}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-destructive" id={`${id}-error`}>
          {error.message}
        </p>
      )}
    </div>
  )
}
