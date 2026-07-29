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
      <AnimatePresence>
        {!isOpen && <motion.button
          className="assistant-stage"
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          whileHover={reduceMotion ? undefined : { scale: 1.04, y: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.92, y: 3 }}
          aria-label="Open interior design consultant"
          aria-expanded="false"
        >
          <span className="assistant-halo" />
          <Suspense fallback={<span className="assistant-loader">IH</span>}><Assistant3D /></Suspense>
          <span className="assistant-label"><strong>Ask Haven</strong><small>Interior Design Expert</small></span>
        </motion.button>}
      </AnimatePresence>
    </aside>
  )
}

export default ChatExperience
