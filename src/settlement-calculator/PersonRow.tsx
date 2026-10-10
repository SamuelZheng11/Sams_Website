import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { Person } from './slice/SettlementSlice'

interface IPersonRowProps {
  person: Person
  onEdit: (person: Person) => void
  onDelete: (id: number) => void
}

export function PersonRow({ person, onEdit, onDelete }: IPersonRowProps) {
  return (
    <div className="settlement-calculator-person">
      <span>{person.id}</span>|
      <div>
        <span>Name: </span>
        <span style={{ color: person.color }}>{person.fullName}</span>
      </div>
      |
      <div>
        <span>Amount paid: </span>
        <span>{person.amount}</span>
      </div>
      |
      <div className="settlement-calculator-person-button-container">
        <IconButton
          className="settlement-calculator-person-edit-button"
          aria-label={`Edit ${person.fullName}`}
          onClick={() => onEdit(person)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className="settlement-calculator-person-delete-button"
          aria-label={`Delete ${person.fullName}`}
          onClick={() => onDelete(person.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}
