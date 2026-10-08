import { createRef, RefObject, useEffect } from 'react'
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
  }, [loadWebsiteInfo])

  useEffect(
    () => () =>
      subscriptions.forEach((subscription) => subscription.unsubscribe()),
    []
  )

  const getScrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

  const scrollRefIntoView = (ref: RefObject<HTMLDivElement>) =>
    ref.current?.scrollIntoView({ behavior: getScrollBehavior() })

  const checkViewToScrollTo = (view: LandingPages) => {
    switch (view) {
      case LandingPages.home:
        scrollRefIntoView(homeRef)
        break

      case LandingPages.about:
        scrollRefIntoView(aboutRef)
        break

      case LandingPages.employment:
        scrollRefIntoView(employmentRef)
        break

      case LandingPages.education:
        scrollRefIntoView(educationRef)
        break

      case LandingPages.project:
        scrollRefIntoView(projectRef)
        break

      case LandingPages.contact:
        scrollRefIntoView(contactRef)
        break

      default:
        return
    }
  }

  return (
    <div className="landing-page" ref={websiteRef}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <HeaderComponent></HeaderComponent>
      <main id="main-content" tabIndex={-1} className="landing-page-body">
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
      </main>
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default LandingPage
