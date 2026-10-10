import { useRef } from 'react'

import { useAppSelector } from '../../hooks'
import { SplitHeading } from './SplitHeading'
import { useTimelineFill } from './design.hooks'
import { formatYearLabel } from './format'

const EDUCATION_TITLE = 'B.E. (Hons) Software Engineering'

// The vertical timeline builds its rows from the employment data and closes
// with the university row, so the whole working story sits in one place.
export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const employments =
    useAppSelector((state) => state.information.employments) ?? []
  const educations =
    useAppSelector((state) => state.information.educations) ?? []

  useTimelineFill(timelineRef)

  return (
    <section id="experience">
      <div className="container">
        <div className="eyebrow reveal">03 / Experience</div>

        <SplitHeading
          as="h2"
          segments={[{ text: "Where I've" }, { text: 'been.', em: true }]}
        />

        <div className="timeline" ref={timelineRef}>
          {employments.map((employment) => (
            <div className="timeline-row reveal" key={employment.employer}>
              <div className="timeline-period">
                {formatYearLabel(employment.startDate, employment.endDate)}
              </div>
              <div>
                <h3>
                  {employment.title ? `${employment.title}, ` : ''}
                  <em>{employment.employer}</em>
                </h3>
                <p>{employment.summaries?.[0]}</p>
              </div>
            </div>
          ))}

          {educations.map((education) => (
            <div
              className="timeline-row reveal"
              key={education.institutionShortHand}
            >
              <div className="timeline-period">
                {formatYearLabel(education.startDate, education.endDate)}
              </div>
              <div>
                <h3>
                  {EDUCATION_TITLE}, <em>{education.institutionName}</em>
                </h3>
                <p>{education.summaries?.[0]}</p>
                {education.achievements?.length ? (
                  <ul className="achievements">
                    {education.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
