import {
  setApiOnline,
  setBio,
  setEducations,
  setEmployments,
  setProjects,
  setWebsiteInfoLoaded,
} from './slice/LandingPageInformationSlice'
import { IEmployment } from './employment/EmploymentTypes'
import { IProject } from './project/ProjectTypes'
import { IEducation } from './education/EducationTypes'

import { useAppDispatch } from '../hooks'

// Ideally I would put this into a service or into its own file
// At the moment this is the only place that I am calling an endpoint
import axios from 'axios'
import { IBio } from './LandingPageTypes'
import { useMemo } from 'react'

// So at the moment no point putting it elsewhere
export const useLoadWebsiteInfo = () => {
  const dispatch = useAppDispatch()

  const backendUri = process.env.REACT_APP_BACKEND_URI
  const s3Uri = process.env.REACT_APP_S3_URI

  const loadWebsiteInfo = () => {
    Promise.allSettled([
      axios
        .get(`${backendUri}/Bio`)
        .then((response) => {
          const bioResponse = response.data[0] as IBio
          dispatch(setBio(bioResponse))
        })
        .catch(() => {
          console.warn('Contacting S3 Backups for Bio')
          axios.get(`${s3Uri}/bio.json`).then((response) => {
            const bioResponse = response.data as IBio
            dispatch(setBio(bioResponse))
          })
          return Promise.reject('Failed to get to contact Live API for Bio')
        }),

      axios
        .get(`${backendUri}/Education`)
        .then((response) => {
          const educationResponse = response.data as IEducation[]
          dispatch(setEducations(educationResponse))
        })
        .catch(() => {
          console.warn('Contacting S3 Backups for Education')
          axios.get(`${s3Uri}/education.json`).then((response) => {
            const educationResponse = response.data as IEducation[]
            dispatch(setEducations(educationResponse))
          })
          return Promise.reject(
            'Failed to get to contact Live API for Education'
          )
        }),

      axios
        .get(`${backendUri}/Employment`)
        .then((response) => {
          const employmentResponse = response.data as IEmployment[]
          dispatch(setEmployments(employmentResponse))
        })
        .catch(() => {
          console.warn('Contacting S3 Backups for Employment')
          axios.get(`${s3Uri}/employment.json`).then((response) => {
            const employmentResponse = response.data as IEmployment[]
            dispatch(setEmployments(employmentResponse))
          })
          return Promise.reject(
            'Failed to get to contact Live API for Employment'
          )
        }),

      axios
        .get(`${backendUri}/Project`)
        .then((response) => {
          const projectResponse = response.data as IProject[]
          dispatch(setProjects(projectResponse))
        })
        .catch((onReject) => {
          console.warn('Contacting S3 Backups for Projects')
          axios.get(`${s3Uri}/project.json`).then((response) => {
            const projectResponse = response.data as IProject[]
            dispatch(setProjects(projectResponse))
          })
          return Promise.reject(
            'Failed to get to contact Live API for Projects'
          )
        }),
    ])
      .then((results) => {
        dispatch(setWebsiteInfoLoaded(true))

        // TODO: need to create health checkpoint on api
        const allRequestsFulfilled = !results.some(
          (r) => r.status === 'rejected'
        )
        dispatch(setApiOnline(allRequestsFulfilled))
      })
      .catch(() => {
        console.error('Failed to retrieve landing page inforamtion')
      })
  }

  return useMemo(
    () => ({
      loadWebsiteInfo,
    }),
    []
  )
}
