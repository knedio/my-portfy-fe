export interface Template {
  id: number;
  name: string;
  description: string;
  previewImage: string;
  default_data?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}
