import { apiRequest } from './http';

export interface ContactFormPayload {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  send(payload: ContactFormPayload) {
    return apiRequest<ContactFormResponse>({
      path: '/send-email',
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
