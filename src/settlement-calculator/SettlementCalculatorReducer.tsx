import { combineReducers } from '@reduxjs/toolkit'
import settlementReducer from './slice/SettlementSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  settlment: settlementReducer,
})

export default rootReducer
