import { configureStore } from '@reduxjs/toolkit'
import settlementReducer from './slice/SettlementSlice'

const settlementStore = configureStore({
  reducer: {
    settlement: settlementReducer,
  },
})

export type SettlementState = ReturnType<typeof settlementStore.getState>
export type SettlementDispatch = typeof settlementStore.dispatch

export default settlementStore
