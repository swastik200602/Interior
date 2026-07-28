import { cn } from '../../utils/cn'

function Container({ children, className = '', ...props }) {
  return (
    <div
      className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
