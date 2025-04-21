export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: string | null;
  contactEmail?: string | null;
  location?: string | null;
  banner?: {
    title: string;
    description: string;
    image: string;
  } | null;
  about?: string | null;
  templateId?: number | null;
  createdAt: string;
  updatedAt: string;
}
