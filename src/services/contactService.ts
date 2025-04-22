import { api } from '@/utils/api';
import { ContactForm } from '@/models/contact-form.model';

export const sendMessage = async (payload: ContactForm) => {
  const response = await api.post('/contact', payload);
  return response.data;
};
