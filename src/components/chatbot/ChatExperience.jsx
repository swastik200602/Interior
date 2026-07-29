import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import ChatWindow from './ChatWindow'

const Assistant3D = lazy(() => import('./Assistant3D'))

function ChatExperience() {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    function onKeyDown(event) { if (event.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <aside className="designer-assistant" aria-label="AI Interior Design Consultant">
      <AnimatePresence>
        {isOpen && <ChatWindow key="chat-window" onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <motion.button
        className="assistant-stage"
        onClick={() => setIsOpen((open) => !open)}
        whileHover={reduceMotion ? undefined : { scale: 1.04, y: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.92, y: 3 }}
        aria-label={isOpen ? 'Close interior design consultant' : 'Open interior design consultant'}
        aria-expanded={isOpen}
      >
        <span className="assistant-halo" />
        <Suspense fallback={<span className="assistant-loader">IH</span>}><Assistant3D /></Suspense>
        {!isOpen && <span className="assistant-label"><strong>Ask Haven</strong><small>Interior Design Expert</small></span>}
      </motion.button>
    </aside>
  )
}

export default ChatExperience
