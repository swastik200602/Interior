import { useCallback, useMemo, useRef, useState } from 'react'
import ChatContext from '../../contexts/ChatContext'
import { chatService } from '../../services/chat.service'

const welcomeMessage = {
  id: 'haven-welcome',
  role: 'assistant',
  content: 'Hi, I’m Haven. Ask me about your room, kitchen, POP ceiling, or next interior project.',
  createdAt: new Date().toISOString(),
  type: 'text',
}

function createMessage(role, content, extra = {}) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
    type: 'text',
    ...extra,
  }
}

function ChatProvider({ children }) {
  const [messages, setMessages] = useState([welcomeMessage])
  const [isLoading, setIsLoading] = useState(false)
  const controllerRef = useRef(null)

  const sendMessage = useCallback(async (rawContent) => {
    const content = rawContent.trim()
    if (!content || isLoading) return

    const userMessage = createMessage('user', content)
    const history = [...messages, userMessage]
    setMessages(history)
    setIsLoading(true)
    controllerRef.current = new AbortController()

    try {
      const result = await chatService.sendMessage(
        { message: content, history },
        { signal: controllerRef.current.signal },
      )
      setMessages((current) => [...current, createMessage('assistant', result.content, result)])
    } catch (error) {
      if (error.name !== 'AbortError') {
        setMessages((current) => [...current, createMessage('assistant', 'I’m having trouble responding just now. Please try again.')])
      }
    } finally {
      controllerRef.current = null
      setIsLoading(false)
    }
  }, [isLoading, messages])

  const regenerate = useCallback(async () => {
    if (isLoading) return
    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')
    if (!lastUserMessage) return
    const lastAssistantIndex = messages.findLastIndex((message) => message.role === 'assistant')
    const history = lastAssistantIndex > 0 ? messages.slice(0, lastAssistantIndex) : messages
    setMessages(history)
    setIsLoading(true)
    controllerRef.current = new AbortController()
    try {
      const result = await chatService.sendMessage(
        { message: lastUserMessage.content, history },
        { signal: controllerRef.current.signal },
      )
      setMessages((current) => [...current, createMessage('assistant', result.content, result)])
    } catch (error) {
      if (error.name !== 'AbortError') setMessages((current) => [...current, createMessage('assistant', 'I’m having trouble responding just now. Please try again.')])
    } finally {
      controllerRef.current = null
      setIsLoading(false)
    }
  }, [isLoading, messages])

  const value = useMemo(() => ({ messages, isLoading, sendMessage, regenerate }), [messages, isLoading, sendMessage, regenerate])
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatProvider
