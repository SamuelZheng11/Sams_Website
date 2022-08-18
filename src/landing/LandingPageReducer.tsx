import { combineReducers } from '@reduxjs/toolkit'
import informationReducer from './slice/LandingPageInformationSlice'
import navigationReducer from './slice/LandingPageNavigationSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    navigation: navigationReducer,
    information: informationReducer
  })
  
  export default rootReducer