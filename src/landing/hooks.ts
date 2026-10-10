import {
  setApiOnline,
  setBio,
  setEducations,
  setEmployments,
  setProductsShipped,
  setProjects,
  setWebsiteInfoLoaded,
} from './slice/LandingPageInformationSlice'
import { IEmployment } from './employment/EmploymentTypes'
import { IProject } from './project/ProjectTypes'
import { IEducation } from './education/EducationTypes'
import { IProductsShippedData } from './products-shipped/ProductsShippedTypes'

import { useAppDispatch } from '../hooks'

import axios from 'axios'
import { createRef, RefObject, useCallback, useEffect, useMemo } from 'react'
import { IBio, LandingPages } from './LandingPageTypes'
import { setActiveView } from './slice/LandingPageNavigationSlice'

// Loads the site's curated content (bio, employment, education, projects,
// products) from the live API with a fallback to the S3 JSON backup.
export const useLoadWebsiteInfo = () => {
  const dispatch = useAppDispatch()

  const backendUri = process.env.REACT_APP_BACKEND_URI
  const s3Uri = process.env.REACT_APP_S3_URI

  // Tries the live API first and falls back to the S3 backup when the API is
  // unreachable or no backend is configured. The returned promise rejects when
  // the live API could not be used so the API status stays accurate.
  const requestWithBackup = useCallback(
    (endpoint: string, backupFile: string, onSuccess: (data: any) => void) => {
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
    },
    [backendUri, s3Uri]
  )

  const loadWebsiteInfo = useCallback(() => {
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

      requestWithBackup('ProductsShipped', 'shipped.json', (data) => {
        const payload = (Array.isArray(data) ? data[0] : data) as
          | IProductsShippedData
          | undefined
        if (payload) {
          dispatch(setProductsShipped(payload))
        } else {
          dispatch(
            setProductsShipped({
              products: [],
            })
          )
        }
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
  }, [dispatch, requestWithBackup])

  return useMemo(
    () => ({
      loadWebsiteInfo,
    }),
    [loadWebsiteInfo]
  )
}

const HEADER_HEIGHT = 64

// Stable refs for the six scrollable landing sections.
export const useSectionRefs = () =>
  useMemo(
    () => ({
      home: createRef<HTMLDivElement>(),
      about: createRef<HTMLDivElement>(),
      work: createRef<HTMLDivElement>(),
      experience: createRef<HTMLDivElement>(),
      products: createRef<HTMLDivElement>(),
      contact: createRef<HTMLDivElement>(),
    }),
    []
  )

// Scrollspy: keeps the "active" landing section in sync with what is currently
// in view so the header can highlight the matching nav item.
export const useScrollSpy = (
  sections: [LandingPages, RefObject<HTMLDivElement>][]
) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const measureActiveSection = (): LandingPages => {
      const probeLine = HEADER_HEIGHT + window.innerHeight * 0.22
      let activeSection = LandingPages.home

      sections.forEach(([page, ref]) => {
        const top = ref.current?.getBoundingClientRect().top
        if (top !== undefined && top <= probeLine) activeSection = page
      })

      // At the very bottom of the page the last section is active even when
      // its top never crossed the probe line.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (scrolledToBottom) activeSection = LandingPages.contact

      return activeSection
    }

    let animationFrame = 0
    let currentActive = LandingPages.home

    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const nextActive = measureActiveSection()
        if (nextActive !== currentActive) {
          currentActive = nextActive
          dispatch(setActiveView(nextActive))
        }
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections, dispatch])
}
