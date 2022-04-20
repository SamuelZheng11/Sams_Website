import { combineReducers } from '@reduxjs/toolkit'
import informationReducer from './slice/WebsiteInformationSlice'
import navigationReducer from './slice/WebsiteNavigationSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    navigation: navigationReducer,
    information: informationReducer
  })
  
  export default rootReducer