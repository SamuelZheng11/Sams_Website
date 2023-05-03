import { Debt, Person } from '../slice/SettlementSlice'

// Partially written by ChatGPT
export function calculateDebts(people: Person[]) {
  const debts: Debt[] = []

  if (people.length < 2) return debts

  for (let i = 0; i < people.length; i++) {
    for (let j = i; j < people.length; j++) {
      if (i === j) continue

      // If this is 0 then neither owe each other money
      const transaction =
        people[i].amount / people.length - people[j].amount / people.length

      if (transaction > 0) {
        // person j owes person i
        debts.push({
          debitor: people[j],
          creditor: people[i],
          debtAmount: transaction.toFixed(2),
        })
      } else if (transaction < 0) {
        // person i owes person j
        debts.push({
          debitor: people[i],
          creditor: people[j],
          debtAmount: Math.abs(transaction).toFixed(2),
        })
      }
    }
  }

  // Sort based on debitor id first then creditor id
  debts.sort((a: Debt, b: Debt) => {
    if (a.debitor.id < b.debitor.id) {
      return -1
    } else if (a.debitor.id === b.debitor.id) {
      if (a.creditor.id < b.creditor.id) {
        return -1
      }

      return 0
    }
    return 1
  })

  return debts
}
