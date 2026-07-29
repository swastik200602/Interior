/**
 * @typedef {'user' | 'assistant'} ChatRole
 *
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {ChatRole} role
 * @property {string} content
 * @property {string} createdAt
 * @property {'text' | 'image'} type
 * @property {string=} imageUrl
 *
 * @typedef {Object} SendMessageOptions
 * @property {AbortSignal=} signal
 * @property {(chunk: string) => void=} onChunk Reserved for a streaming REST implementation.
 */

export const CHAT_ROLES = Object.freeze({
  USER: 'user',
  ASSISTANT: 'assistant',
})
