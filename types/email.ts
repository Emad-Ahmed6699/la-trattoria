// types/email.ts

export interface ReservationEmailData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterEmailData {
  email: string;
}

export interface AdminNotificationData {
  type: 'reservation' | 'inquiry';
  data: ReservationEmailData | ContactEmailData;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}
