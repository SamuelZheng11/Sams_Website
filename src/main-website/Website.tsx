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
import { setApiOnline, setBio, setEducations, setEmployments, setProjects, setWebsiteInfoLoaded } from './slice/WebsiteInformationSlice';
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
		checkViewToScrollTo(view)
	}, [view]);

	useEffect(() => {
		theme === 'light' ? websiteRef.current?.classList.remove('is_inverted') : websiteRef.current?.classList.add('is_inverted');
	}, [theme]);

	useEffect(() => {
		loadWebsiteInfo();
	})

	useEffect( () => () => subscriptions.forEach(subscription => subscription.unsubscribe()), [] );

	// Ideally I would put this into a service or into its own file
	// At the moment this is the only place that I am calling an endpoint
	// So at the moment no point putting it elsewhere
	const loadWebsiteInfo = () => {
		let backendUri = process.env.REACT_APP_BACKEND_URI;
		let s3Uri = process.env.REACT_APP_S3_URI;
		
		Promise.allSettled([
			axios.get(`${backendUri}/Bio`)
			.then(response => {
				const bioResponse = response.data[0] as IBio
				dispatch(setBio(bioResponse))
			}).catch(() => {
				console.warn("Contacting S3 Backups for Bio");
				axios.get(`${s3Uri}/bio.json`)
				.then(response => {
					const bioResponse = response.data as IBio
					dispatch(setBio(bioResponse))
				});
				return Promise.reject("Failed to get to contact Live API for Bio");
			}), 

			axios.get(`${backendUri}/Education`).then(response => {
				const educationResponse = response.data as IEducation[]
				dispatch(setEducations(educationResponse))
			}).catch(() => {
				console.warn("Contacting S3 Backups for Education");
				axios.get(`${s3Uri}/education.json`)
				.then(response => {
					const educationResponse = response.data as IEducation[]
					dispatch(setEducations(educationResponse))
				});
				return Promise.reject("Failed to get to contact Live API for Education");
			}), 

			axios.get(`${backendUri}/Employment`).then(response => {
				const employmentResponse = response.data as IEmployment[]
				dispatch(setEmployments(employmentResponse))
			}).catch(() => {
				console.warn("Contacting S3 Backups for Employment");
				axios.get(`${s3Uri}/employment.json`)
				.then(response => {
					const employmentResponse = response.data as IEmployment[]
					dispatch(setEmployments(employmentResponse))
				});
				return Promise.reject("Failed to get to contact Live API for Employment");
			}), 

			axios.get(`${backendUri}/Project`).then(response => {
				const projectResponse = response.data as IProject[]
				dispatch(setProjects(projectResponse))
			}).catch((onReject) => {
				console.warn("Contacting S3 Backups for Projects");
				axios.get(`${s3Uri}/project.json`)
				.then(response => {
					const projectResponse = response.data as IProject[]
					dispatch(setProjects(projectResponse))
				});
				return Promise.reject("Failed to get to contact Live API for Projects");
			})
		]).then((results) => {
			dispatch(setWebsiteInfoLoaded(true));

			// TODO: need to create health checkpoint on api
			const allRequestsFulfilled = !results.some(r => r.status === 'rejected')
			dispatch(setApiOnline(allRequestsFulfilled));
		}).catch(() => {
			debugger;
		})
	}

	const checkViewToScrollTo = (view: EWebsitePages) => {
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
