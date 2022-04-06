import { Typography } from '@mui/material';

import './AboutComponent.scss';

const ABOUT_TITLE = 'About Me';

function AboutComponent() {
    return (
        <div className='about'>
            <div className="about-title-container">
                <Typography variant='h3'>
                    {ABOUT_TITLE}
                </Typography>
            </div>

            <div className='about-body-container'>
                <Typography variant="body1" className='about-body-text'>
                    Ever since I was young, I had always been amazed by technology and what it has done for mankind. 
                    I am especially intrigued by its ability to connect entire communities together and revolutionise 
                    the way people experience the world. I would be thrilled to be involved in the development of 
                    anything which helps other people or improves quality of life for others. I am a hardworking and
                    enthusiastic person who always tries his best in any situation and greatly relishes working in a 
                    team to solve problems. One of the key lessons I have learned from my time working in professional 
                    environments and at university is the importance of teamwork and coherent communication. As a result, 
                    I have developed skills in leadership, speech and management, especially in group activities and projects.
                </Typography>
            </div>
            
        </div>
    );
}

export default AboutComponent;