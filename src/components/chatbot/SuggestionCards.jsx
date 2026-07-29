import { Armchair, CalendarDays, House, Lamp, Palette, Ruler, Sparkles, WalletCards } from 'lucide-react'

const suggestions = [
  [House, 'Design my living room'], [Sparkles, 'Bedroom makeover'], [Palette, 'Colour palette ideas'], [Armchair, 'Furniture recommendations'],
  [Lamp, 'Lighting suggestions'], [Ruler, 'Space planning'], [WalletCards, 'Budget estimation'], [CalendarDays, 'Book consultation'],
]

function SuggestionCards({ onSelect }) {
  return <div className="designer-suggestions" aria-label="Suggested questions">{suggestions.map(([Icon, label]) => <button key={label} onClick={() => onSelect(label)}><Icon size={16} /><span>{label}</span></button>)}</div>
}
export default SuggestionCards
