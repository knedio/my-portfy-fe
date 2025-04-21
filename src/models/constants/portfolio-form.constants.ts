import { Education, PortfolioDetails, Project, Skill } from '@/models/portfolio.model';

export const PORTFOLIO_SCROLL_CONTAINER_SELECTOR = 'portfolio-preview-wrapper';

export const PORTFOLIO_FORM_EDUCATIONS: Education = {
  school: '',
  degree: '',
  yearFrom: '',
  yearTo: '',
};

export const PORTFOLIO_FORM_PROJECTS: Project = {
  title: '',
  description: '',
  tech: '',
  image: '',
  link: '',
};

export const PORTFOLIO_FORM_SKILLS: Skill = { name: '', level: '', experience: '', icon: '' };

export const PORTFOLIO_FORM: PortfolioDetails = {
  firstName: '',
  lastName: '',
  contactEmail: '',
  location: '',
  about: {
    title: '',
    description: '',
    image: '',
  },
  banner: {
    title: '',
    description: '',
    btnLabel: '',
  },
  educations: [PORTFOLIO_FORM_EDUCATIONS],
  projects: [PORTFOLIO_FORM_PROJECTS],
  skills: [PORTFOLIO_FORM_SKILLS],
};
