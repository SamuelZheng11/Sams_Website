import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITravelMarker } from '../TravelLogTypes'

// Define a type for the slice state
export interface InformationState {
  markers?: ITravelMarker[]
  intro: string
}

// Define the initial state using that type
const initialState = {
  intro: '',
} as InformationState

export const TravelLogSlice = createSlice({
  name: 'TravelLog',
  initialState,
  reducers: {
    setTravelIntro: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        intro: action.payload,
      }
    },
    setTravelMarkers: (state, action: PayloadAction<ITravelMarker[]>) => {
      return {
        ...state,
        markers: action.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTravelIntro, setTravelMarkers } = TravelLogSlice.actions

export default TravelLogSlice.reducer
