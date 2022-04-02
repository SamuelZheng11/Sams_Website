import { combineReducers } from '@reduxjs/toolkit'
import navigationReducer from './WebsiteNavigationSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    navigation: navigationReducer
  })
  
  export default rootReducer