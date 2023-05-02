import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Person {
  fullName: string;
  amount: number;
  id: number;
  color?: string;
}

export interface Debt {
  creditor: Person;
  debitor: Person;
  debtAmount: string;
}

// Define a type for the slice state
export interface SettlementState {
  people: Person[]
  debts?: Debt[]
}

// Define the initial state using that type
const initialState: SettlementState = {
  people: [],
}

export const SettlementSlice = createSlice({
  name: 'Settlement',
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<Person[]>) => {
      return {
        ...state,
        people: action.payload,
      }
    },
    setDebts: (state, action: PayloadAction<Debt[]>) => {
      return {
        ...state,
        debts: action.payload,
      }
    },
    setName: (state, action: PayloadAction<{id: number, fullName: string}>) => {
      const updatedNames = state.people.map(person => {
        if (person.id === action.payload.id) return {...person, fullName: action.payload.fullName};
        
        return person;
      })

      return {
        ...state,
        people: updatedNames,
      }
    },
    setAmount: (state, action: PayloadAction<{id: number, amount: number}>) => {
      const updatedAmounts = state.people.map(person => {
        if (person.id === action.payload.id) return {...person, amount: action.payload.amount};
        return person;
      })

      return {
        ...state,
        people: updatedAmounts,
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setPeople,
  setDebts,
  setAmount,
  setName,
} = SettlementSlice.actions

export default SettlementSlice.reducer