import { LucideIcon, Hospital, Users, FileText, Truck, Info, Heart, ShieldAlert, LayoutDashboard } from 'lucide-react';

export type HospitalStep = 
  | 'confirmation'
  | 'communication'
  | 'documents'
  | 'transportation'
  | 'mortuary'
  | 'ceremony'
  | 'emergency'
  | 'dashboard';

export interface StepInfo {
  id: HospitalStep;
  title: string;
  icon: LucideIcon;
  description: string;
}

export const HOSPITAL_STEPS: StepInfo[] = [
  {
    id: 'confirmation',
    title: 'Hospital Confirmation',
    icon: Hospital,
    description: 'Initial details and death confirmation guidance.'
  },
  {
    id: 'communication',
    title: 'Family Support',
    icon: Users,
    description: 'Notify family and coordinate arrival.'
  },
  {
    id: 'documents',
    title: 'Required Documents',
    icon: FileText,
    description: 'Checklist for certificates and permissions.'
  },
  {
    id: 'transportation',
    title: 'Transportation',
    icon: Truck,
    description: 'Book hearse or ambulance services.'
  },
  {
    id: 'mortuary',
    title: 'Mortuary Guidance',
    icon: Info,
    description: 'Release process and waiting times.'
  },
  {
    id: 'ceremony',
    title: 'Ceremony Prep',
    icon: Heart,
    description: 'Connect with ritual and event services.'
  },
  {
    id: 'emergency',
    title: 'Emergency Help',
    icon: ShieldAlert,
    description: '24/7 coordinator and assistance.'
  },
  {
    id: 'dashboard',
    title: 'Support Tracker',
    icon: LayoutDashboard,
    description: 'Overview of all coordination progress.'
  }
];

export interface HospitalData {
  hospitalName: string;
  patientName: string;
  dateTime: string;
  causeCategory: string;
  attendingDoctor: string;
  hospitalContact: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isRequired: boolean;
}

export interface TransportService {
  id: string;
  type: 'hearse' | 'ambulance' | 'family' | 'intercity';
  name: string;
  price: string;
  eta: string;
  status: 'available' | 'busy';
}
