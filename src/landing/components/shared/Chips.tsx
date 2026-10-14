import './Chips.scss'

export interface IChipsProps {
  items: string[]
  className?: string
}

// The pill list shared by the About stack tile and the Work cards.
export function Chips({ items, className }: IChipsProps) {
  if (items.length === 0) return null

  return (
    <div className={`chips${className ? ` ${className}` : ''}`}>
      {items.map((chip) => (
        <span key={chip}>{chip}</span>
      ))}
    </div>
  )
}
