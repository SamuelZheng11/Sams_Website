import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { SettlementState, SettlementDispatch } from './SettlementCalculatorStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useSettlementDispatch = () => useDispatch<SettlementDispatch>()
export const useSettlementSelector: TypedUseSelectorHook<SettlementState> = useSelector