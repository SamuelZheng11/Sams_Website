import { createRef, useEffect } from 'react'
import { Subscription } from 'rxjs'

import { useAppSelector } from '../hooks'
import { LandingPages } from './LandingPageTypes'
import HeaderComponent from './header/HeaderComponent'
import HomePageComponent from './home/HomePageComponent'
import ContactComponent from './contact/ContactComponent'
import EmploymentComponent from './employment/EmploymentComponent'
import EducationComponent from './education/EducationComponent'
import ProjectComponent from './project/ProjectComponent'
import AboutComponent from './about/AboutComponent'
import FooterComponent from './footer/FooterComponent'

import './LandingPage.scss'
import { useLoadWebsiteInfo } from './hooks'

function LandingPage() {
  const { loadWebsiteInfo } = useLoadWebsiteInfo()
  const subscriptions: Subscription[] = []
  const view = useAppSelector((state) => state.navigation.view)

  const [
    websiteRef,
    homeRef,
    aboutRef,
    employmentRef,
    educationRef,
    projectRef,
    contactRef,
  ] = [
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
  ]

  useEffect(() => {
    checkViewToScrollTo(view)
  }, [view])

  useEffect(() => {
    loadWebsiteInfo()
  })

  useEffect(
    () => () =>
      subscriptions.forEach((subscription) => subscription.unsubscribe()),
    []
  )

  const checkViewToScrollTo = (view: LandingPages) => {
    switch (view) {
      case LandingPages.home:
        homeRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      case LandingPages.about:
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      case LandingPages.employment:
        employmentRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      case LandingPages.education:
        educationRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      case LandingPages.project:
        projectRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      case LandingPages.contact:
        contactRef.current?.scrollIntoView({ behavior: 'smooth' })
        break

      default:
        return
    }
  }

  return (
    <div className="landing-page" ref={websiteRef}>
      <HeaderComponent></HeaderComponent>
      <div className="landing-page-body">
        <div ref={homeRef}>
          <HomePageComponent></HomePageComponent>
        </div>
        <div ref={aboutRef}>
          <AboutComponent></AboutComponent>
        </div>
        <div ref={employmentRef}>
          <EmploymentComponent></EmploymentComponent>
        </div>
        <div ref={projectRef}>
          <ProjectComponent></ProjectComponent>
        </div>
        <div ref={educationRef}>
          <EducationComponent></EducationComponent>
        </div>
        <div ref={contactRef}>
          <ContactComponent></ContactComponent>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default LandingPage
