import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBio } from '../WebsiteTypes'
import { IEducation } from '../education/EducationTypes'
import { IProject } from '../project/ProjectTypes'
import { IEmployment } from '../employment/EmploymentTypes'

// Define a type for the slice state
export interface InformationState {
  websiteInfoLoaded: boolean,
  educations?: IEducation[],
  projects?: IProject[],
  bio?: IBio,
  employments?: IEmployment[]
}

// Define the initial state using that type
const initialState = {
  websiteInfoLoaded: false,
} as InformationState

export const InformationSlice = createSlice({
  name: 'Information',
  initialState,
  reducers: {
    setWebsiteInfoLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        websiteInfoLoaded: action.payload
      }
    },
    setEducations: (state, action: PayloadAction<IEducation[]>) => {
      return {
        ...state,
        educations: action.payload
      }
    },
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      return {
        ...state,
        projects: action.payload
      }
    },
    setBio: (state, action: PayloadAction<IBio>) => {
      return {
        ...state,
        bio: action.payload
      }
    },
    setEmployments: (state, action: PayloadAction<IEmployment[]>) => {
      return {
        ...state,
        employments: action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setWebsiteInfoLoaded,
  setEducations,
  setProjects,
  setBio,
  setEmployments
} = InformationSlice.actions

export default InformationSlice.reducer