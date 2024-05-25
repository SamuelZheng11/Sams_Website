import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

import Layout from '../../core/layout/LayoutComponent'
import Panel from '../../core/panel/PanelComponent'
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'
import { getYearRangeBetween } from '../../core/date.functions'
import { EDUCATION_TITLE } from './EducationConstants'

import './EducationComponent.scss'
import { useAppSelector } from '../../hooks'

function EducationComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const educations = useAppSelector((state) => state.information.educations)

  const getAchievementTitle = (educationInstituteShortHand: string) => {
    return `At ${educationInstituteShortHand} I achieved the awards/milestones:`
  }

  return (
    <div className="education">
      <div className="education-title-container">
        <Typography variant="h3">{EDUCATION_TITLE}</Typography>
      </div>

      <LoadingSpinnerComponent loaded={contentLoaded}>
        <div>
          {educations?.map((education) => (
            <Panel
              className="education-card"
              key={education.institutionShortHand}
            >
              <Layout orientation="horizontal">
                <a href={education.institutionWebsite}>
                  <Layout
                    className="education-card-title-container"
                    orientation="horizontal"
                  >
                    <Typography variant="h4">
                      {education.institutionName}
                    </Typography>
                    <Typography variant="subtitle1">
                      {getYearRangeBetween(
                        education.startDate,
                        education.endDate
                      )}
                    </Typography>
                    <LaunchIcon></LaunchIcon>
                  </Layout>
                </a>
              </Layout>

              {education?.summaries?.map((summary) => (
                <Typography
                  variant="body1"
                  className="education-card-body-text"
                  key={summary.length}
                >
                  {summary}
                </Typography>
              ))}

              {/* using "component={'span'}" to suppress error "<ul> cannot appear as a child of <p>" 
                                as material Typography by default wraps everything in using <p>*/}
              <Typography
                component={'span'}
                variant="body1"
                className="education-card-body-text"
              >
                {getAchievementTitle(education.institutionShortHand)}
                <ul>
                  {education?.achievements?.map((achievement) => (
                    <li key={achievement.length}>{achievement}</li>
                  ))}
                </ul>
              </Typography>
            </Panel>
          ))}
        </div>
      </LoadingSpinnerComponent>
    </div>
  )
}

export default EducationComponent
