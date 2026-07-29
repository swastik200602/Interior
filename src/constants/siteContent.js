import { Building2, ChefHat, DraftingCompass, House, Layers, Palette, Sparkles, Trees } from 'lucide-react'

export const SITE = {
  name: 'Interior Haven',
  email: 'hello@interiorhaven.com',
  phone: '+91 98765 43210',
  address: 'Gomti Nagar, Lucknow, Uttar Pradesh',
}

export const SERVICES = [
  { icon: House, title: 'Residential interiors', text: 'Considered homes tailored to your routines, tastes, and the way your family lives.' },
  { icon: Building2, title: 'Commercial spaces', text: 'Memorable workplaces and hospitality environments designed for people and performance.' },
  { icon: DraftingCompass, title: 'Space planning', text: 'Layouts that improve movement, natural light, storage, and every usable square foot.' },
  { icon: Palette, title: 'Styling & curation', text: 'A cohesive selection of furniture, finishes, lighting, textiles, and collected objects.' },
  { icon: Trees, title: 'Renovation direction', text: 'End-to-end creative direction that brings architectural changes and interiors together.' },
  { icon: Sparkles, title: 'Design consultation', text: 'Focused expert guidance for material decisions, room refreshes, and design clarity.' },
  { icon: Layers, title: 'POP ceiling design', text: 'Sculptural false ceilings with layered lighting that add depth, detail, and atmosphere to every room.' },
  { icon: ChefHat, title: 'Kitchen interiors', text: 'Beautiful, hard-working kitchens planned around your cooking rituals, storage needs, and style.' },
]

export const PROJECTS = [
  {
    slug: 'quiet-courtyard-home',
    title: 'Quiet Courtyard Home',
    category: 'Residential',
    location: 'Lucknow, India',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    summary: 'A warm, light-filled family home shaped around an intimate internal courtyard.',
    detail: 'Natural oak, limewash walls, hand-finished stone and quiet textiles create rooms that feel grounded throughout the day. The plan connects shared spaces while preserving calm private corners.',
  },
  {
    slug: 'olive-house',
    title: 'Olive House',
    category: 'Residential',
    location: 'New Delhi, India',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    summary: 'Earthy materials and sculptural furniture give a city apartment a restorative rhythm.',
    detail: 'A muted olive and stone palette carries through the apartment. Bespoke joinery conceals storage, while soft curves and layered lighting balance the home’s clean architectural lines.',
  },
  {
    slug: 'the-terracotta-room',
    title: 'The Terracotta Room',
    category: 'Hospitality',
    location: 'Jaipur, India',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
    summary: 'A tactile dining space pairing local craft with contemporary hospitality.',
    detail: 'Locally made terracotta surfaces, aged brass, and deep timber establish a welcoming evening atmosphere. Flexible seating supports intimate dinners and larger celebrations.',
  },
  {
    slug: 'soft-minimal-studio',
    title: 'Soft Minimal Studio',
    category: 'Workspace',
    location: 'Gurugram, India',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
    summary: 'A calm creative workplace built around collaboration, focus, and natural texture.',
    detail: 'Acoustic surfaces, warm timber, and generous planting soften a simple open plan. A variety of work settings lets the team move easily between individual and collaborative tasks.',
  },
  {
    slug: 'layered-light-residence',
    title: 'Layered Light Residence',
    category: 'POP Ceiling Design',
    location: 'Noida, India',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    summary: 'A sculptural POP ceiling brings soft layers of light to a contemporary family living room.',
    detail: 'Curved gypsum forms conceal indirect LED lighting and air-conditioning while giving the living and dining areas a calm architectural rhythm. Warm oak and textured plaster complete the ceiling-led composition.',
    scope: 'POP ceiling design & lighting',
  },
  {
    slug: 'earth-and-brass-kitchen',
    title: 'Earth & Brass Kitchen',
    category: 'Kitchen Interiors',
    location: 'Lucknow, India',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=85',
    summary: 'A tactile, efficient kitchen where earthy cabinetry meets durable stone and brass details.',
    detail: 'The U-shaped plan keeps preparation, cooking, and serving connected. Fluted timber cabinetry, a honed stone worktop, and carefully placed task lighting make this hardworking kitchen feel warm and considered.',
    scope: 'Kitchen design & bespoke cabinetry',
  },
]

export const TESTIMONIALS = [
  { quote: 'They translated how we wanted to feel at home into choices we never could have made alone.', name: 'Rhea & Arjun', project: 'Quiet Courtyard Home' },
  { quote: 'Every detail feels intentional, yet the space remains comfortable, useful, and unmistakably ours.', name: 'Meera Khanna', project: 'Olive House' },
  { quote: 'The process was clear from day one. Creative ambition and practical delivery were beautifully balanced.', name: 'Kunal Mehta', project: 'The Terracotta Room' },
]

export const FAQS = [
  { question: 'What types of projects do you take on?', answer: 'We work across full-home interiors, selected room transformations, boutique commercial spaces, and focused design consultations.' },
  { question: 'When should we involve an interior designer?', answer: 'Ideally, bring us in before construction or major purchases begin. Early collaboration gives us more influence over planning, lighting, budgets, and material coordination.' },
  { question: 'How long does a typical project take?', answer: 'A complete residential project commonly takes four to nine months, depending on scale, approvals, procurement, and site conditions. We confirm a realistic programme after discovery.' },
  { question: 'Can you work with our architect and contractor?', answer: 'Yes. We regularly collaborate with architects, consultants, contractors, and specialist fabricators while keeping design decisions coordinated.' },
  { question: 'How do we begin?', answer: 'Submit the project enquiry form. We will review your brief and arrange an introductory call to understand scope, location, budget, and timing.' },
]

export const PROCESS_STEPS = [
  { number: '01', title: 'Discover', text: 'We listen closely to your ambitions, routines, context, budget, and practical needs.' },
  { number: '02', title: 'Define', text: 'We establish the creative direction, space plan, material language, and project roadmap.' },
  { number: '03', title: 'Design', text: 'Every room is resolved through drawings, selections, visualisations, and collaborative reviews.' },
  { number: '04', title: 'Deliver', text: 'We coordinate details and styling so the final space feels coherent, personal, and complete.' },
]
