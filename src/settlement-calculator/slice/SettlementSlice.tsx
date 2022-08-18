import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Person {
  firstname?: string;
  surname?: string;
}

// Define a type for the slice state
export interface SettlementState {
  people: Person[]
}

// Define the initial state using that type
const initialState = {
  people: [
    {
      firstname: "Sam",
      surname: "Zheng"
    }
  ]
} as SettlementState

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
  }
})

// Action creators are generated for each case reducer function
export const {
  setPeople
} = SettlementSlice.actions

export default SettlementSlice.reducer