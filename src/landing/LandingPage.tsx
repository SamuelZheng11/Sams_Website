import { RefObject, useEffect, useMemo } from 'react'

import { useAppSelector } from '../hooks'
import { LandingPages } from './LandingPageTypes'
import SiteLayout from '../core/shell/SiteLayout'
import { useScrollSpy, useSectionRefs } from './hooks'
import { useScrollReveal } from './design/design.hooks'
import { HeroSection } from './design/HeroSection'
import { Marquee } from './design/Marquee'
import { AboutSection } from './design/AboutSection'
import { WorkSection } from './design/WorkSection'
import { ExperienceSection } from './design/ExperienceSection'
import { ProjectsSection } from './design/ProjectsSection'
import { ContactSection } from './design/ContactSection'

function LandingPage() {
  const view = useAppSelector((state) => state.navigation.view)
  const websiteInfoLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const refs = useSectionRefs()

  const sections = useMemo(
    () =>
      [
        [LandingPages.home, refs.home],
        [LandingPages.about, refs.about],
        [LandingPages.work, refs.work],
        [LandingPages.experience, refs.experience],
        [LandingPages.products, refs.products],
        [LandingPages.contact, refs.contact],
      ] as [LandingPages, RefObject<HTMLDivElement>][],
    [refs]
  )

  useScrollSpy(sections)
  useScrollReveal(websiteInfoLoaded)

  useEffect(() => {
    const target = sections.find(([page]) => page === view)
    const behavior: ScrollBehavior = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
      ? 'auto'
      : 'smooth'

    target?.[1].current?.scrollIntoView({ behavior })
  }, [view, sections])

  return (
    <SiteLayout>
      <div ref={refs.home}>
        <HeroSection />
      </div>
      <Marquee />
      <div ref={refs.about}>
        <AboutSection />
      </div>
      <div ref={refs.work}>
        <WorkSection />
      </div>
      <div ref={refs.experience}>
        <ExperienceSection />
      </div>
      <div ref={refs.products}>
        <ProjectsSection />
      </div>
      <div ref={refs.contact}>
        <ContactSection />
      </div>
    </SiteLayout>
  )
}

export default LandingPage
