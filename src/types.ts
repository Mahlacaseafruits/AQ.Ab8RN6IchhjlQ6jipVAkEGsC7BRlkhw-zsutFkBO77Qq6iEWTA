export type TabType = 'accueil' | 'services' | 'galerie' | 'devis' | 'carte' | 'faq' | 'conseils' | 'apropos' | 'contact' | 'drive';

export interface AdviceArticle {
  id: string;
  title: string;
  category: 'canalisations' | 'fuites' | 'economies' | 'urgence' | 'materiaux';
  categoryLabel: string;
  readTime: string;
  iconName: string;
  summary: string;
  content: string[];
  tipBox?: string;
  warningBox?: string;
  recommendedServiceId?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  priceRange: string;
  estimatedDuration: string;
  includedFeatures: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'sanitaire' | 'tuyauterie' | 'chauffe-eau' | 'depannage' | 'video';
  location: 'Foumbot' | 'Bafoussam' | 'Foumban';
  type: 'photo' | 'video' | 'before-after';
  url: string;
  beforeUrl?: string;
  afterUrl?: string;
  videoPoster?: string;
  description: string;
  date: string;
}

export interface InterventionZone {
  name: string;
  desc: string;
  approxResponseTime: string;
  landmark: string;
  lat: number;
  lng: number;
  activeChantiersCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  date: string;
}

export interface QuoteRequest {
  clientName: string;
  phone: string;
  email?: string;
  city: 'Foumbot' | 'Bafoussam' | 'Foumban' | 'Autre';
  serviceType: string;
  urgency: 'normale' | 'urgente' | 'immédiate';
  description: string;
  estimatedBudget?: string;
  photo?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'depannage' | 'installation' | 'tarifs' | 'intervention';
}
