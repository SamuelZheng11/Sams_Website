import { createRef, useEffect } from 'react';
import axios from 'axios';
import { Subscription } from 'rxjs';

import { useAppDispatch, useAppSelector } from './WebsiteHooks';
import { EWebsitePages, IBio } from './WebsiteTypes';
import HeaderComponent from './header/HeaderComponent';
import HomePageComponent from './home/HomePageComponent';
import ContactComponent from './contact/ContactComponent';
import EmploymentComponent from './employment/EmploymentComponent';
import EducationComponent from './education/EducationComponent';
import ProjectComponent from './project/ProjectComponent';
import AboutComponent from './about/AboutComponent';
import FooterComponent from './footer/FooterComponent';
import { setBio, setEducations, setEmployments, setProjects, setWebsiteInfoLoaded } from './slice/WebsiteInformationSlice';
import { IEmployment } from './employment/EmploymentTypes';
import { IProject } from './project/ProjectTypes';
import { IEducation } from './education/EducationTypes';

import './Website.scss'

function Website() {
	const dispatch = useAppDispatch()
	const subscriptions: Subscription[] = [];
	const view = useAppSelector(state => state.navigation.view);
	const theme = useAppSelector(state => state.theme.theme);

	const [websiteRef, homeRef, aboutRef, employmentRef, educationRef, projectRef, contactRef] = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()];

	useEffect(() => {
		checkViewToScrollTo()
	}, [view]);

	useEffect(() => {
		theme !== 'light' ? websiteRef.current?.classList.add('is_inverted') : websiteRef.current?.classList.remove('is_inverted')
	}, [theme]);

	useEffect(() => {
		loadWebsiteInfo();
	})

	useEffect( () => () => subscriptions.forEach(subscription => subscription.unsubscribe()), [] );

	const loadWebsiteInfo = () => {
		const backendUri = 'https://ec2-52-63-58-171.ap-southeast-2.compute.amazonaws.com';


		axios.get(`${backendUri}/Education`)
			.then(response => {
				const educationResponse = response.data as IEducation[]
				dispatch(setEducations(educationResponse))
			});

		axios.get(`${backendUri}/Project`)
			.then(response => {
				const projectResponse = response.data as IProject[]
				dispatch(setProjects(projectResponse))
			});

		axios.get(`${backendUri}/Bio`)
		.then(response => {
			const bioResponse = response.data[0] as IBio
			dispatch(setBio(bioResponse))
		});

		axios.get(`${backendUri}/Employment`)
			.then(response => {
				const employmentResponse = response.data as IEmployment[]
				dispatch(setEmployments(employmentResponse))
			});

		setTimeout(() => {
			dispatch(setWebsiteInfoLoaded(true));
		}, 1000);
	}

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
