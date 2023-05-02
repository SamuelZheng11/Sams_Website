import { Typography } from "@mui/material";
import React from "react";

import { getYearRangeBetween } from "../../core/date.functions";
import Layout from "../../core/layout/LayoutComponent";
import LoadingSpinnerComponent from "../../core/loading/LoadingSpinnerComponent";
import Panel from "../../core/panel/PanelComponent";
import { useAppSelector } from "../LandingPageHooks";
import { PROJECT_TITLE, SOURCE_CODE_LINK_WORK, SOURCE_CODE_TITLE } from "./ProjectConstants";

import './ProjectComponent.scss';

function ProjectComponent() {
    const contentLoaded = useAppSelector(state => state.information.websiteInfoLoaded);
    const projects = useAppSelector(state => state.information.projects);

    const getProjectRepoText = (projectRepoUrl: string) => {
        return (
            <React.Fragment>
                {SOURCE_CODE_TITLE} <a 
                href={projectRepoUrl}>
                    {SOURCE_CODE_LINK_WORK} 
                </a>
            </React.Fragment>
        );
    }

    return(
        <Layout className="project">
            <div className="project-title-container">
                <Typography variant="h3">{PROJECT_TITLE}</Typography>
            </div>

            <LoadingSpinnerComponent loaded={contentLoaded}>
                <div>
                    {projects?.map(project =>(
                        <Panel className="project-card" key={project.projectName}>
                            <Layout className="project-card-title-container" orientation='horizontal'>
                                <Typography variant="h4">{project.projectName}</Typography>
                                <Typography variant="subtitle1">{getYearRangeBetween(project.startDate, project.endDate)}</Typography>
                            </Layout>
            
                            <div className="project-card-body">
                                {project.summaries.map(summary => (
                                    <Typography variant="body1" className="project-card-body-text" key={summary.length}>
                                        {summary}
                                    </Typography>
                                ))}
            
                                <Typography variant="body1" className="project-card-body-text">
                                    {getProjectRepoText(project.projectRepositoryUrl)}
                                </Typography>
                            </div>
                        </Panel>
                    ))}
                </div>
            </LoadingSpinnerComponent>
        </Layout>
    );
}

export default ProjectComponent;