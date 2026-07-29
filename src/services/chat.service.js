const MOCK_DELAY = 850

const responses = [
  {
    terms: ['living room', 'lounge'],
    answer: 'For a refined living room, I would begin with how you use the space, its natural light, and one material that sets the mood. A warm neutral base, layered lighting, and furniture with varied heights will make it feel composed rather than showroom-like.',
  },
  {
    terms: ['bedroom', 'makeover'],
    answer: 'A restful bedroom needs visual quiet. I recommend a soft tonal palette, warm bedside lighting, full-height curtains, and fewer—but better-scaled—pieces. We can then add character through one tactile headboard or a handcrafted bedside detail.',
  },
  {
    terms: ['colour', 'color', 'palette'],
    answer: 'A timeless palette works best when it responds to the room’s daylight. Try warm ivory for the main field, muted clay or olive as the supporting tone, and walnut or aged brass for depth. Test every colour at morning, afternoon, and evening.',
  },
  {
    terms: ['kitchen'],
    answer: 'I would plan your kitchen around the path between storage, preparation, cooking, and cleaning before choosing finishes. Once the workflow is right, layered task lighting and a restrained mix of cabinetry, stone, and metal can make it both practical and beautiful.',
  },
  {
    terms: ['ceiling', 'pop'],
    answer: 'A good POP ceiling should support the architecture, not overpower it. I would use clean recessed layers to conceal services and create soft indirect light, then reserve any sculptural detail for the room’s strongest focal zone.',
  },
  {
    terms: ['furniture', 'sofa', 'chair'],
    answer: 'Choose furniture by proportion before style. Start with the largest piece, preserve comfortable circulation paths, then combine one visually grounded form with lighter chairs and tables. Repeating a timber or metal finish twice will make the collection feel intentional.',
  },
  {
    terms: ['lighting', 'light'],
    answer: 'The most inviting rooms use layers: soft ambient light, focused task light, and a small amount of accent light for art or texture. Keep colour temperatures warm and consistent, and avoid relying on one bright ceiling fixture.',
  },
  {
    terms: ['space planning', 'layout'],
    answer: 'Good space planning begins with movement and daily routines. I would map doors, windows, fixed services, and primary circulation first, then create furniture zones with enough breathing room around them. Share the room dimensions and I can suggest a starting layout.',
  },
  {
    terms: ['budget', 'cost', 'estimate'],
    answer: 'A useful estimate depends on the room size, scope, material level, custom furniture, and site condition. I can help you structure those choices, but our design team should confirm the final budget after reviewing your space and requirements.',
  },
  {
    terms: ['consultation', 'book', 'appointment'],
    answer: 'I’d be delighted to help you begin. Use the “Start a project” form and share your location, space type, approximate budget, and preferred timeline. The studio can then arrange the right introductory consultation.',
  },
]

function wait(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(resolve, milliseconds)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timeout)
      reject(new DOMException('Request cancelled', 'AbortError'))
    }, { once: true })
  })
}

function createMockAnswer(message) {
  const normalizedMessage = message.toLowerCase()
  return responses.find(({ terms }) => terms.some((term) => normalizedMessage.includes(term)))?.answer
    ?? 'Tell me a little about the room, its size, how you use it, and the atmosphere you want. I’ll help you turn that into a clear interior direction with practical next steps.'
}

export const chatService = {
  /**
   * Mock-compatible REST boundary. Replace only this method when the backend arrives.
   * @param {{message: string, history: import('../types/chat.types').ChatMessage[]}} payload
   * @param {import('../types/chat.types').SendMessageOptions=} options
   */
  async sendMessage(payload, options = {}) {
    await wait(MOCK_DELAY, options.signal)
    const content = createMockAnswer(payload.message)
    options.onChunk?.(content)
    return { content, type: 'text' }
  },
}
