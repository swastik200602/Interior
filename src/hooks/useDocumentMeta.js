import { useEffect } from 'react'

function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [description, title])
}

export default useDocumentMeta
