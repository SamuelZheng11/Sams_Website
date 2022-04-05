import './Website.scss'
import Header from './header/HeaderComponent';
import HomePageComponent from './home/HomePageComponent';
import ContactComponent from './contact/ContactComponent';
import { createRef, useEffect } from 'react';
import { useAppSelector } from './WebsiteHooks';
import { EWebsitePages } from './WebsiteTypes';
import EmploymentComponent from './employment/EmploymentComponent';

function Website() {
	const view = useAppSelector(state  => state.navigation.view);
	const [homeRef, employmentRef, contactRef] = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()];

	useEffect(() => {
		checkViewToScrollTo()
	});

	const checkViewToScrollTo = () => {
		switch(view) {
			case EWebsitePages.home: 
				homeRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			case EWebsitePages.employment:
				employmentRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			case EWebsitePages.contact: 
				contactRef.current?.scrollIntoView({behavior: "smooth"});
				break;

			default: 
				return;
		}
	};

	return (
		<div className="website">
			<Header></Header>
			<div className="website-body">
				<div ref={homeRef}>
					<HomePageComponent></HomePageComponent>
				</div>
				<div ref={employmentRef}>
					<EmploymentComponent></EmploymentComponent>
				</div>
				<div ref={contactRef}>
					<ContactComponent></ContactComponent>
				</div>
			</div>
		</div>
	);
}

export default Website;
