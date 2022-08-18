export enum LandingPages {
    home, project, contact, education, employment, about
}

export type Theme = 'light' | 'dark';

export interface IBio {
    contact: IContact,
    aboutMe: string,
    maintenanceNote: MaintenanceNote
}

export interface IContact {
    givenNames: string[],
    surname: string,
    location: string,
    email: string,
    gitHub: string,
    linkedIn: string
}

export interface MaintenanceNote {
    credits: string[],
    acknowledgments: string[],
}
