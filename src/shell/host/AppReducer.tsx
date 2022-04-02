import { combineReducers } from '@reduxjs/toolkit'
import navigationReducer from './AppNavigationSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    navigation: navigationReducer
  })
  
  export default rootReducer