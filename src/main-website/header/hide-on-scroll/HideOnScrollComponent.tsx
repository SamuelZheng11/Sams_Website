import { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';

export interface IHideOnScrollProps {
    children: ReactElement;
}

function HideOnScroll(props: IHideOnScrollProps) { 
    const { children } = props;
    const scrollTrigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!scrollTrigger}>
          {children}
        </Slide>
      );
}

export default HideOnScroll;