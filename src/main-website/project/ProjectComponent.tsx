import { Typography } from "@mui/material";

import Layout from "../../core/layout/LayoutComponent";
import Panel from "../../core/panel/PanelComponent";

import './ProjectComponent.scss';

const PROJECT_TITLE = 'Projects';

function ProjectComponent() {
    return(
        <Layout className="project">
            <div className="project-title-container">
                <Typography variant="h3">{PROJECT_TITLE}</Typography>
            </div>

            <Panel className="project-card">
                <Layout className="project-card-title-container" orientation='horizontal'>
                    <Typography variant="h4">This Website</Typography>
                    <Typography variant="subtitle1">(2022)</Typography>
                </Layout>

                <div className="project-card-body">
                    <Typography variant="body1" className="project-card-body-text">
                        This website was made as a project of passion. I always wanted my very own website but never understood exactly
                        how to put one up. During my free time on the weekends and the few hours after work, I spent a small amount 
                        of time researching what was required to host one. This website is a work in progress and new features will be 
                        added as I develop it. As I learn new skills and work on other projects I will upload and host them here.
                    </Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        The source code for this website can be found <a 
                        href="https://github.com/SamuelZheng11/Sams_Website">
                            here 
                        </a>
                    </Typography>
                </div>
            </Panel>

            <Panel className="project-card">
                <Layout className="project-card-title-container" orientation='horizontal'>
                    <Typography variant="h4">Optimal Task Scheduler</Typography>
                </Layout>

                <div className="project-card-body">
                    <Typography variant="h6" className="project-card-body-text">Demo comming soon</Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        The purpose of this project was to solve a difficult (NP-Hard) problem. The tool uses 
                        a modified version of the Branch and Bound A* algorithm. This tool also comes with a Graphical 
                        User Interface to help with user interaction and visualization.
                    </Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        The Problem goes as follows: given a handful of tasks with a varying amount of time to complete said tasks 
                        and a fixed number of works. How would you order the tasks for each work such that it takes the shortest
                        amount of time to complete all tasks
                    </Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        The source code for the analyser can be found <a 
                        href="https://github.com/SamuelZheng11/NarrativeFictionAnalyzer">
                            here 
                        </a>
                    </Typography>
                </div>
            </Panel>

            <Panel className="project-card">
                <Layout className="project-card-title-container" orientation='horizontal'>
                    <Typography variant="h4">Narrative Fiction Analyzer</Typography>
                </Layout>

                <div className="project-card-body">
                    <Typography variant="h6" className="project-card-body-text">Demo comming soon</Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        This project/tool was built over a year to be able to read over a fictional text and inform 
                        you about major events in the text corpus. The Standford CoreNLP Library was used to perform 
                        categorization of the words found in the text (I.E. is the word a noun, verb, adverb, etc)
                        which we then build up information about the entities from there.
                    </Typography>

                    <Typography variant="body1" className="project-card-body-text">
                        The source code for the analyser can be found <a 
                        href="https://github.com/SamuelZheng11/NarrativeFictionAnalyzer">
                            here 
                        </a>
                    </Typography>
                </div>
            </Panel>
        </Layout>
    );
}

export default ProjectComponent;