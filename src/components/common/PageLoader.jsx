function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="size-10 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

export default PageLoader
