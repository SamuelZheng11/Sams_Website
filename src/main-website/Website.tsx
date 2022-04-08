import { createRef, useEffect } from 'react';

import { useAppSelector } from './WebsiteHooks';
import { EWebsitePages } from './WebsiteTypes';
import HeaderComponent from './header/HeaderComponent';
import HomePageComponent from './home/HomePageComponent';
import ContactComponent from './contact/ContactComponent';
import EmploymentComponent from './employment/EmploymentComponent';
import EducationComponent from './education/EducationComponent';
import ProjectComponent from './project/ProjectComponent';

import './Website.scss'
import AboutComponent from './about/AboutComponent';
import FooterComponent from './footer/FooterComponent';

function Website() {
	const view = useAppSelector(state => state.navigation.view);
	const theme = useAppSelector(state => state.navigation.theme);

	const [websiteRef, homeRef, aboutRef, employmentRef, educationRef, projectRef, contactRef] = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()];

	useEffect(() => {
		checkViewToScrollTo()
	}, [view]);

	useEffect(() => {
		theme !== 'light' ? websiteRef.current?.classList.add('is_inverted') : websiteRef.current?.classList.remove('is_inverted')
	}, [theme]);

	const checkViewToScrollTo = () => {
		switch(view) {
			case EWebsitePages.home: 
				homeRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			case EWebsitePages.about: 
			aboutRef.current?.scrollIntoView({behavior: "smooth"});
			break;

			case EWebsitePages.employment:
				employmentRef.current?.scrollIntoView({behavior: "smooth"});
				break;
				
			case EWebsitePages.education:
				educationRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			case EWebsitePages.project:
				projectRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			case EWebsitePages.contact: 
				contactRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			default: 
				return;
		}
	};

	return (
		<div className="website" ref={websiteRef}>
			<HeaderComponent></HeaderComponent>
			<div className="website-body">
				<div ref={homeRef}>
					<HomePageComponent></HomePageComponent>
				</div>
				<div ref={aboutRef}>
					<AboutComponent></AboutComponent>
				</div>
				<div ref={employmentRef}>
					<EmploymentComponent></EmploymentComponent>
				</div>
				<div ref={projectRef}>
					<ProjectComponent></ProjectComponent>
				</div>
				<div ref={educationRef}>
					<EducationComponent></EducationComponent>
				</div>
				<div ref={contactRef}>
					<ContactComponent></ContactComponent>
				</div>
			</div>
			<FooterComponent></FooterComponent>
		</div>
	);
}

export default Website;
