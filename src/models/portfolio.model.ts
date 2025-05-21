export interface Education {
  id?: number;
  school: string;
  degree: string;
  yearFrom: string;
  yearTo: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  tech: string;
  image: string;
  link: string;
  category: string;
}

export interface Skill {
  id?: number;
  name: string;
  level: string;
  experience: string;
  icon: string;
  subSkills?: string[];
  subSkillsText?: string; // for temporary storing as string
}

export interface PortfolioDetails {
  firstName: string;
  lastName: string;
  contactEmail: string;
  mobileNumber?: string;
  location: string;
  about: {
    title: string;
    description: string;
    image: string;
  };
  banner: {
    title: string;
    description: string;
    btnLabel: string;
  };
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}
