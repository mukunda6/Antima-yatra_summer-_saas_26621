export type RitualStage = 
  | 'onboarding' 
  | 'religion' 
  | 'region' 
  | 'community' 
  | 'language' 
  | 'mode' 
  | 'ceremony' 
  | 'dashboard';

export type GuidanceMode = 'journey' | 'specific';

export interface SelectionState {
  religion: string | null;
  region: string | null;
  state: string | null;
  community: string;
  language: string;
  mode: GuidanceMode | null;
  ceremony: string | null;
}

export const LANGUAGES = [
  'English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Urdu'
];

export const CEREMONY_JOURNEYS: Record<string, string[]> = {
  hindu: [
    'Immediate Arrangements',
    'Cremation Preparation',
    'Cremation Process (Mukhagni)',
    'Asthi Collection (3rd Day)',
    'Asthi Visarjan (Ashes Immersion)',
    'Daily Rituals',
    '10th Day Ritual',
    '11th Day Ritual',
    '13th Day Ceremony (Terahvin)',
    'Memorial Guidance'
  ],
  muslim: [
    'Janazah Preparation',
    'Ghusl (Special Bath)',
    'Kafan (Shrouding)',
    'Namaz-e-Janazah (Prayer)',
    'Burial Process (Tadfin)',
    'Post-Burial Community Prayer'
  ],
  christian: [
    'Hospital/Church Coordination',
    'Funeral Service',
    'Burial Ceremony',
    'Prayer Gathering',
    'Memorial Mass'
  ],
  sikh: [
    'Antam Sanskar',
    'Path & Ardas',
    'Cremation Rites',
    'Bhog/Final Prayer'
  ]
};
