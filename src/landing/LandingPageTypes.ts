export enum LandingPages {
  home,
  about,
  work,
  experience,
  products,
  contact,
}

export interface IBio {
  contact: IContact
  aboutMe: string
  maintenanceNote: MaintenanceNote
}

export interface IContact {
  givenNames: string[]
  surname: string
  location: string
  email: string
  gitHub: string
  linkedIn: string
}

export interface MaintenanceNote {
  credits: string[]
  acknowledgments: string[]
}