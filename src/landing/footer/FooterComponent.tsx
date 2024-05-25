import { Typography } from '@mui/material'

import Layout from '../../core/layout/LayoutComponent'
import LoadingSpinnerComponent from '../../core/loading/LoadingSpinnerComponent'

import './FooterComponent.scss'
import { useAppSelector } from '../../hooks'

function FooterComponent() {
  const contentLoaded = useAppSelector(
    (state) => state.information.websiteInfoLoaded
  )
  const maintenanceNote = useAppSelector(
    (state) => state.information.bio?.maintenanceNote
  )

  const getMaintenanceNotesAcknowledgments = () => {
    return maintenanceNote?.acknowledgments.join(' | ')
  }

  return (
    <Layout orientation="vertical" className="footer">
      <LoadingSpinnerComponent loaded={contentLoaded}>
        <div>
          <Typography variant="subtitle2" className="footer-text">
            {maintenanceNote?.credits}
          </Typography>
          <Layout orientation="horizontal">
            <Typography variant="subtitle2" className="footer-text">
              {getMaintenanceNotesAcknowledgments()}
            </Typography>
          </Layout>
        </div>
      </LoadingSpinnerComponent>
    </Layout>
  )
}

export default FooterComponent
