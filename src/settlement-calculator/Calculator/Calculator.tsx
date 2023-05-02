import { Debt, Person } from "../slice/SettlementSlice";

// Code written by ChatGPT
export function calculateDebts(people: Person[]) {
    let totalAmount = 0;
    let mutablePeople: Person[] = JSON.parse(JSON.stringify(people));
    for (const person of mutablePeople) {
      totalAmount += person.amount;
    }
  
    const averageAmount = totalAmount / mutablePeople.length;
  
    const debts: Debt[] = [];
  
    for (const person of mutablePeople) {
      if (person.amount > averageAmount) {
        const debtors = mutablePeople.filter(
          (p) => p.amount < averageAmount && p !== person
        ).map(p => p);

        for (const debtor of debtors) {
          const amountToTransfer = Math.min(
            person.amount - averageAmount,
            averageAmount - debtor.amount
          );
          if (amountToTransfer > 0) {
            debtor.amount += amountToTransfer;
            person.amount -= amountToTransfer;
            debts.push({
              debitor: debtor,
              creditor: person,
              debtAmount: amountToTransfer.toFixed(2),
            });
          }
        }
      }
    }
  
    return debts;
  }
  