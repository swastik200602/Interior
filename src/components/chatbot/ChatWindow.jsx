import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import useChat from '../../hooks/useChat'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import SuggestionCards from './SuggestionCards'
import TypingIndicator from './TypingIndicator'

function ChatWindow({ onClose }) {
  const { messages, isLoading, sendMessage, regenerate } = useChat()
  const scrollRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages, isLoading])
  useEffect(() => {
    const panel = panelRef.current
    const focusable = panel?.querySelectorAll('button, textarea, [href], input')
    focusable?.[0]?.focus()
    function trapFocus(event) {
      if (event.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    panel?.addEventListener('keydown', trapFocus)
    return () => panel?.removeEventListener('keydown', trapFocus)
  }, [])

  return (
    <motion.section ref={panelRef} className="designer-chat" role="dialog" aria-modal="true" aria-labelledby="designer-chat-title" initial={{ opacity: 0, y: 24, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.95 }} transition={{ type: 'spring', damping: 25, stiffness: 280 }}>
      <header className="designer-chat-header">
        <div className="designer-avatar"><Sparkles size={18} /></div>
        <div><h2 id="designer-chat-title">Haven</h2><p><span /> Interior Design Expert</p></div>
        <button onClick={onClose} aria-label="Close design consultant"><X size={20} /></button>
      </header>
      <div className="designer-chat-scroll" ref={scrollRef} aria-live="polite">
        {messages.length === 1 && <><div className="designer-intro"><span>Hi 👋</span><h3>I’m your AI Interior Design Consultant.</h3><p>I can help you design beautiful spaces, estimate costs and recommend furniture.</p></div><SuggestionCards onSelect={sendMessage} /></>}
        <div className="designer-messages">
          {messages.slice(1).map((message, index) => <MessageBubble key={message.id} message={message} canRegenerate={message.role === 'assistant' && index === messages.length - 2} onRegenerate={regenerate} />)}
          {isLoading && <TypingIndicator />}
        </div>
      </div>
      <MessageInput onSend={sendMessage} isLoading={isLoading} />
      <p className="designer-note">AI preview · Confirm project details with our studio</p>
    </motion.section>
  )
}

export default ChatWindow
