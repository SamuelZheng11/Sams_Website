import { Button, IconButton } from '@mui/material'
import {
  Person,
  setPeople,
  setDebts,
  setAmount,
  setName,
  Debt,
} from './slice/SettlementSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import './SettlementCalculator.scss'
import { calculateDebts } from './Calculator/Calculator'
import { useState } from 'react'
import Modal from '../core/modal/ModalComponent'
import { getRandomHexColor } from '../utils/color'
import { useAppDispatch, useAppSelector } from '../hooks'

export default function SettlementCalculator() {
  const dispatch = useAppDispatch()
  const people = useAppSelector((state) => state.settlement.people)
  const debts = useAppSelector((state) => state.settlement.debts)

  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [modalPersonName, setModalPersonName] = useState('')
  const [modalPersonAmount, setModalPersonAmount] = useState('')
  const [modalPersonId, setModalPersonId] = useState<number | undefined>()

  const onSubmit = (fullName: string, amount: string, id?: number) => {
    if (
      isNaN(parseInt(amount)) ||
      parseInt(amount).toString().length !== amount.length
    ) {
      alert('Amount paid must be a number')
      return
    }

    if (isEditing && id) return updatePerson(id, fullName, parseInt(amount))

    addPerson(fullName, parseInt(amount))
  }

  const addPerson = (fullName: string, amount: number) => {
    setModalPersonName('')
    setModalPersonAmount('')
    setModalOpen(false)

    const updatedListOfPeople = [...people]
    updatedListOfPeople.push({
      fullName,
      amount,
      id: people.length + 1,
      color: getRandomHexColor(),
    })
    dispatch(setPeople(updatedListOfPeople))
  }

  const updatePerson = (id: number, fullName: string, amount: number) => {
    dispatch(setName({ id, fullName }))
    dispatch(setAmount({ id, amount }))
    setIsEditing(false)
    setModalOpen(false)
  }

  const editPerson = (id: number, fullName: string, amount: number) => {
    setModalPersonName(fullName)
    setModalPersonAmount(amount.toString())
    setModalPersonId(id)
    setIsEditing(true)
    setModalOpen(true)
  }

  const removePerson = (id: number) => {
    const newListOfPeople = people.filter((person) => person.id !== id)
    const newListOfPeopleWithIdsUpdated = newListOfPeople.map<Person>(
      (person, i) => {
        return { ...person, id: i + 1 }
      }
    )

    dispatch(setPeople(newListOfPeopleWithIdsUpdated))
  }

  const PersonList = (person: Person) => {
    return (
      <div key={person.id} className="settlement-calculator-person">
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
        <div className="settlement-calculator-person-button-contanier">
          <IconButton
            className="settlement-calculator-person-edit-button"
            onClick={() => {
              editPerson(person.id, person.fullName, person.amount)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className="settlement-calculator-person-delete-button"
            onClick={() => removePerson(person.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    )
  }

  return (
    <div className="settlement-calculator">
      <div className="settlement-calculator-header">
        <h2>Calculator for settling debts</h2>
        <h5>This tool will calculate who pays how much to who</h5>
      </div>

      {people?.length ? (
        <div>{people.map((person: Person) => PersonList(person))}</div>
      ) : (
        <div className="settlement-calculator-person">
          Add a person to begin
        </div>
      )}
      <div className="settlement-calculator-buttons-container">
        <Modal
          open={modalOpen}
          modalButtonVariant="outlined"
          buttonText="Add person"
          submit
          cancel
          submitText={isEditing ? 'Save' : 'Add'}
          onSubmit={() =>
            onSubmit(modalPersonName, modalPersonAmount, modalPersonId)
          }
          onClose={() => setModalOpen(false)}
          onOpen={() => setModalOpen(true)}
        >
          <div className="modal-person-input">
            <div className="modal-person-input-field">
              <span>Name: </span>
              <input
                value={modalPersonName}
                placeholder="Enter a name"
                onChange={(next) => setModalPersonName(next.target.value)}
              ></input>
            </div>
            <div className="modal-person-input-field">
              <span>Amount paid: </span>
              <input
                placeholder="Enter an amount"
                value={modalPersonAmount}
                onChange={(next) => setModalPersonAmount(next.target.value)}
              ></input>
            </div>
          </div>
        </Modal>
        <Button
          variant="contained"
          onClick={() => dispatch(setDebts(calculateDebts(people)))}
        >
          Calculate
        </Button>
      </div>
      <div className="settlement-calculator-debt-container">
        {people?.length
          ? debts !== undefined &&
            (debts.length !== 0 ? (
              debts.map((debt: Debt, i) => (
                <div key={i} className="settlement-calculator-debt">
                  <span style={{ color: debt.debitor.color }}>
                    {debt.debitor.fullName}
                  </span>{' '}
                  (Id: {debt.debitor.id}) owes{' '}
                  <span style={{ color: debt.creditor.color }}>
                    {debt.creditor.fullName}
                  </span>{' '}
                  (Id: {debt.creditor.id}) ${debt.debtAmount}
                </div>
              ))
            ) : (
              <div className="settlement-calculator-debt">
                All debts are already settled
              </div>
            ))
          : undefined}
      </div>
    </div>
  )
}
