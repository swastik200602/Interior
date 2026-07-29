import { ImagePlus, Mic, Send } from 'lucide-react'
import { useRef, useState } from 'react'

function MessageInput({ onSend, isLoading }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  function submit() { const message = value.trim(); if (!message || isLoading) return; onSend(message); setValue('') }
  function onKeyDown(event) { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() } }
  return <div className="designer-input-wrap"><div className="designer-input"><textarea ref={inputRef} rows={1} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={onKeyDown} placeholder="Describe your dream space…" aria-label="Message Haven" /><div className="designer-input-actions"><button title="Image upload coming soon" aria-label="Upload a room image" disabled><ImagePlus size={18} /></button><button title="Voice input coming soon" aria-label="Use voice input" disabled><Mic size={18} /></button><span /><button className="designer-send" onClick={submit} disabled={!value.trim() || isLoading} aria-label="Send message"><Send size={18} /></button></div></div><small>Enter to send · Shift + Enter for a new line</small></div>
}
export default MessageInput
