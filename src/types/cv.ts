// CV Types for International CV Designer

export type CountryCode = 'fr' | 'us' | 'uk' | 'de' | 'international';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  nameEn: string;
  flag: string;
  allowPhoto: boolean;
  photoRequired: boolean;
  showAge: boolean;
  showMaritalStatus: boolean;
  showNationality: boolean;
  maxPages: number;
  includeObjective: boolean;
  includeReferences: boolean;
  dateFormat: string;
  tips: string[];
  warnings: string[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  photo: string | null;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CVData {
  selectedCountry: CountryCode;
  selectedTemplate: 'classic' | 'modern' | 'creative' | 'minimal';
  selectedColor: string;
  personalInfo: PersonalInfo;
  objective: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
}

export const defaultCVData: CVData = {
  selectedCountry: 'international',
  selectedTemplate: 'modern',
  selectedColor: '#2563eb',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    photo: null,
    dateOfBirth: '',
    nationality: '',
    maritalStatus: '',
    linkedin: '',
    website: '',
  },
  objective: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  references: [],
};

export const countryConfigs: Record<CountryCode, CountryConfig> = {
  fr: {
    code: 'fr',
    name: 'France',
    nameEn: 'France',
    flag: '🇫🇷',
    allowPhoto: true,
    photoRequired: false,
    showAge: true,
    showMaritalStatus: false,
    showNationality: true,
    maxPages: 2,
    includeObjective: false,
    includeReferences: false,
    dateFormat: 'MM/YYYY',
    tips: [
      'Format anti-chronologique recommandé',
      'Une photo professionnelle est appréciée',
      'Le CV doit tenir sur 1 à 2 pages maximum',
    ],
    warnings: [
      'Évitez les informations trop personnelles',
    ],
  },
  us: {
    code: 'us',
    name: 'États-Unis',
    nameEn: 'United States',
    flag: '🇺🇸',
    allowPhoto: false,
    photoRequired: false,
    showAge: false,
    showMaritalStatus: false,
    showNationality: false,
    maxPages: 1,
    includeObjective: true,
    includeReferences: true,
    dateFormat: 'MM/YYYY',
    tips: [
      'Strictement 1 page maximum',
      'Utilisez des verbes d\'action',
    ],
    warnings: [
      '⚠️ NE JAMAIS inclure de photo - illégal aux USA',
      '⚠️ Ne mentionnez PAS l\'âge ou la situation familiale',
    ],
  },
  uk: {
    code: 'uk',
    name: 'Royaume-Uni',
    nameEn: 'United Kingdom',
    flag: '🇬🇧',
    allowPhoto: false,
    photoRequired: false,
    showAge: false,
    showMaritalStatus: false,
    showNationality: false,
    maxPages: 2,
    includeObjective: true,
    includeReferences: true,
    dateFormat: 'MM/YYYY',
    tips: [
      'Appelez-le "CV" et non "Resume"',
      '2 pages maximum sont acceptables',
    ],
    warnings: [
      '⚠️ Pas de photo - discriminatoire au UK',
    ],
  },
  de: {
    code: 'de',
    name: 'Allemagne',
    nameEn: 'Germany',
    flag: '🇩🇪',
    allowPhoto: true,
    photoRequired: true,
    showAge: true,
    showMaritalStatus: false,
    showNationality: true,
    maxPages: 2,
    includeObjective: false,
    includeReferences: false,
    dateFormat: 'MM/YYYY',
    tips: [
      'Une photo professionnelle est fortement recommandée',
      'Format structuré et précis attendu',
    ],
    warnings: [
      'Un CV sans photo peut être mal perçu en Allemagne',
    ],
  },
  international: {
    code: 'international',
    name: 'International',
    nameEn: 'International',
    flag: '🌍',
    allowPhoto: true,
    photoRequired: false,
    showAge: true,
    showMaritalStatus: false,
    showNationality: true,
    maxPages: 2,
    includeObjective: true,
    includeReferences: true,
    dateFormat: 'MM/YYYY',
    tips: [
      'Format polyvalent adapté à la plupart des pays',
      'Adaptez le contenu selon le pays visé',
    ],
    warnings: [],
  },
};

export const colorOptions = [
  { name: 'Bleu', value: '#2563eb' },
  { name: 'Vert', value: '#16a34a' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Rouge', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Gris', value: '#374151' },
  { name: 'Marine', value: '#1e3a5f' },
  { name: 'Teal', value: '#0d9488' },
];

export const skillLevels = [
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
  { value: 'expert', label: 'Expert' },
];

export const languageLevels = [
  { value: 'native', label: 'Langue maternelle' },
  { value: 'fluent', label: 'Courant' },
  { value: 'advanced', label: 'Avancé' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'basic', label: 'Notions' },
];
