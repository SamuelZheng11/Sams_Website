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

  // Tries the live API first and falls back to the S3 backup when the API is
  // unreachable or no backend is configured. The returned promise rejects when
  // the live API could not be used so the API status stays accurate.
  const requestWithBackup = (
    endpoint: string,
    backupFile: string,
    onSuccess: (data: any) => void
  ) => {
    const loadBackup = () => {
      console.warn(`Contacting S3 Backups for ${endpoint}`)
      axios.get(`${s3Uri}/${backupFile}`).then((response) => {
        onSuccess(response.data)
      })
    }

    if (!backendUri) {
      loadBackup()
      return Promise.reject(`No backend configured for ${endpoint}`)
    }

    return axios
      .get(`${backendUri}/${endpoint}`)
      .then((response) => {
        onSuccess(response.data)
      })
      .catch(() => {
        loadBackup()
        return Promise.reject(
          `Failed to get to contact Live API for ${endpoint}`
        )
      })
  }

  const loadWebsiteInfo = () => {
    Promise.allSettled([
      requestWithBackup('Bio', 'bio.json', (data) => {
        const bioResponse = (Array.isArray(data) ? data[0] : data) as IBio
        dispatch(setBio(bioResponse))
      }),

      requestWithBackup('Education', 'education.json', (data) => {
        dispatch(setEducations(data as IEducation[]))
      }),

      requestWithBackup('Employment', 'employment.json', (data) => {
        dispatch(setEmployments(data as IEmployment[]))
      }),

      requestWithBackup('Project', 'project.json', (data) => {
        dispatch(setProjects(data as IProject[]))
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
