import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

import Layout from '../../core/layout/LayoutComponent'
import Panel from '../../core/panel/PanelComponent'
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'
import { getYearRangeBetween } from '../../core/date.functions'
import { EMPLOYMENT_TITLE } from './EmploymentConstants'

import './EmploymentComponent.scss'
import { useAppSelector } from '../../hooks'

function EmploymentComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const employments = useAppSelector((state) => state.information.employments)

  return (
    <Layout
      className="employment"
      component="section"
      aria-labelledby="employment-title"
    >
      <div className="employment-title-container">
        <Typography variant="h3" component="h2" id="employment-title">
          {EMPLOYMENT_TITLE}
        </Typography>
      </div>

      <LoadingSpinnerComponent loaded={contentLoaded}>
        <div>
          {employments?.map((employment) => (
            <Panel className="employment-card" key={employment.employer}>
              <Layout orientation="horizontal">
                <a href={employment.employerWebsite}>
                  <Layout
                    className="employment-card-title-container"
                    orientation="horizontal"
                  >
                    <Typography variant="h4" component="h3">
                      {employment.employer}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {getYearRangeBetween(
                        employment.startDate,
                        employment.endDate
                      )}
                    </Typography>
                    <LaunchIcon aria-hidden="true" />
                  </Layout>
                </a>
              </Layout>

              {employment.summaries.map((summary) => (
                <Typography
                  variant="body1"
                  className="employment-card-body-text"
                  key={summary.length}
                >
                  {summary}
                </Typography>
              ))}
            </Panel>
          ))}
        </div>
      </LoadingSpinnerComponent>
    </Layout>
  )
}

export default EmploymentComponent