export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ScreenMeta {
  id: ScreenId;
  title: string;
  subtitle: string;
  badge: string;
}

export interface CelebrationEvent {
  id: string;
  name: string;
  teluguName?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  dressCode: string;
  description: string;
  accentColor: string;
  illustrationType: 'haldi' | 'mehendi' | 'wedding' | 'reception';
}

export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  heartsCount?: number;
}

export interface RSVPRecord {
  attending: boolean;
  name: string;
  phone?: string;
  adultsCount?: number;
  childrenCount?: number;
  guestsCount?: number;
  events: string[];
  message?: string;
  dietaryOrNote?: string;
  submittedAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption?: string;
}

export type TemplateId = 'royal-traditional' | 'neobloom' | 'myshaadhi-traditional' | 'kalyana-mandapam' | 'teatro' | 'ulems';

export interface InvitationTemplate {
  id: TemplateId;
  name: string;
  teluguName: string;
  tagline: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  heroImage: string;
  sampleCouple: {
    groom: string;
    bride: string;
    date: string;
    location: string;
  };
  features: string[];
}

export interface CustomInvitationData {
  templateId: TemplateId;
  groom: string;
  bride: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  guestName: string;
  customMessage: string;
  upiId?: string;
}
