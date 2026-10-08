import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

import { getYearRangeBetween } from '../../core/date.functions'
import Layout from '../../core/layout/LayoutComponent'
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'
import Panel from '../../core/panel/PanelComponent'
import { PROJECT_TITLE } from './ProjectConstants'

import './ProjectComponent.scss'
import { useAppSelector } from '../../hooks'

function ProjectComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const projects = useAppSelector((state) => state.information.projects)

  return (
    <Layout
      className="project"
      component="section"
      aria-labelledby="project-title"
    >
      <div className="project-title-container">
        <Typography variant="h3" component="h2" id="project-title">
          {PROJECT_TITLE}
        </Typography>
      </div>

      <LoadingSpinnerComponent loaded={contentLoaded}>
        <div>
          {projects?.map((project) => {
            const title = (
              <Layout
                className="project-card-title-container"
                orientation="horizontal"
              >
                <Typography variant="h4" component="h3">
                  {project.projectName}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  {getYearRangeBetween(project.startDate, project.endDate)}
                </Typography>
                {project.projectRepositoryUrl && (
                  <LaunchIcon aria-hidden="true" />
                )}
              </Layout>
            )

            return (
              <Panel className="project-card" key={project.projectName}>
                <Layout orientation="horizontal">
                  {project.projectRepositoryUrl ? (
                    <a href={project.projectRepositoryUrl}>{title}</a>
                  ) : (
                    title
                  )}
                </Layout>

                <div className="project-card-body">
                  {project.summaries.map((summary) => (
                    <Typography
                      variant="body1"
                      className="project-card-body-text"
                      key={summary.length}
                    >
                      {summary}
                    </Typography>
                  ))}
                </div>
              </Panel>
            )
          })}
        </div>
      </LoadingSpinnerComponent>
    </Layout>
  )
}

export default ProjectComponent
