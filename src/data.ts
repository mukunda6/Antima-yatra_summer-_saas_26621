import { 
  Home, BookOpen, MessageCircle, ShoppingBag, Calendar, 
  Wallet, Phone, Bell, Globe, Search, MapPin, Clock, 
  Trash2, User, ShieldCheck, Star, Heart, CheckCircle2,
  ChevronRight, Mic, Send, FileText, Download, Share2,
  CreditCard, Plus, HelpCircle, AlertCircle, Menu, X
} from 'lucide-react';

export const religions = [
  { id: 'hindu', name: 'Hindu', icon: 'Lotus' },
  { id: 'muslim', name: 'Muslim', icon: 'Moon' },
  { id: 'christian', name: 'Christian', icon: 'Cross' },
  { id: 'sikh', name: 'Sikh', icon: 'Khanda' },
  { id: 'jain', name: 'Jain', icon: 'Hand' },
  { id: 'buddhist', name: 'Buddhist', icon: 'Wheel' },
  { id: 'other', name: 'Other', icon: 'Sparkles' }
];

export const regions = [
  { id: 'south', name: 'South India', states: ['Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Kerala'] },
  { id: 'north', name: 'North India', states: ['Delhi', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Rajasthan'] },
  { id: 'east', name: 'East India', states: ['West Bengal', 'Odisha', 'Bihar', 'Assam'] },
  { id: 'west', name: 'West India', states: ['Maharashtra', 'Gujarat', 'Goa'] },
  { id: 'central', name: 'Central India', states: ['Madhya Pradesh', 'Chhattisgarh'] }
];

export const experts = [
  { 
    id: 'e1',
    name: "Pandit Rajesh Sharma", 
    specialty: "Vedic & North Indian Rituals", 
    religion: 'hindu',
    region: 'north',
    languages: ["Hindi", "English", "Sanskrit"], 
    experience: "25+ Years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  { 
    id: 'e2',
    name: "Sri G. Venkatesh", 
    specialty: "South Indian Ceremonial Guide", 
    religion: 'hindu',
    region: 'south',
    languages: ["Telugu", "Kannada", "Tamil"], 
    experience: "18+ Years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  { 
    id: 'e3',
    name: "Maulvi Abdul Karim", 
    specialty: "Islamic Burial Rites Expert", 
    religion: 'muslim',
    region: 'all',
    languages: ["Urdu", "Hindi", "Arabic"], 
    experience: "20+ Years",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1541175103-e9014015f3ec?auto=format&fit=crop&q=80&w=200&h=200"
  },
  { 
    id: 'e4',
    name: "Father Thomas D'Souza", 
    specialty: "Catholic Funeral Liturgy", 
    religion: 'christian',
    region: 'south',
    languages: ["English", "Malayalam", "Konkani"], 
    experience: "22+ Years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const marketplaceCategories = [
  "Funeral Van", "Freezer Box", "Flowers", "Ritual Kits", 
  "Priests", "Photo Frames", "Catering", "Seating/Tents", "Cremation Help", "Body Carriers"
];

export const mockProducts = [
  {
    id: 1,
    name: "AC Funeral Van",
    price: 3500,
    desc: "Available in 30 mins",
    vendor: "Ravi Transport",
    rating: 4.7,
    reviews: 128,
    badge: "Emergency",
    category: "Funeral Van",
    religion: "All",
    isVerified: true
  },
  {
    id: 2,
    name: "Freezer Box Rental",
    price: 2500,
    desc: "24/7 Available",
    vendor: "CoolCare Services",
    rating: 4.6,
    reviews: 84,
    badge: "Available Now",
    category: "Freezer Box",
    religion: "All",
    isVerified: true
  },
  {
    id: 3,
    name: "Rose & Marigold Garland",
    price: 799,
    desc: "Same-day delivery",
    vendor: "FlowerMart",
    rating: 4.8,
    reviews: 210,
    badge: "Available Now",
    category: "Flowers",
    religion: "Hindu",
    isVerified: false
  },
  {
    id: 4,
    name: "Complete Hindu Ritual Kit",
    price: 1999,
    desc: "Includes all puja items",
    vendor: "Pooja Stores",
    rating: 4.9,
    reviews: 156,
    badge: "Available Now",
    category: "Ritual Kits",
    religion: "Hindu",
    isVerified: true
  },
  {
    id: 5,
    name: "Professional Pallbearer Service (Team of 4)",
    price: 6000,
    desc: "Trained and respectful body carriers for the funeral procession.",
    vendor: "Seva Carriers",
    rating: 4.9,
    reviews: 42,
    badge: "Trusted",
    category: "Body Carriers",
    religion: "All",
    isVerified: true,
    culturalNote: "In some traditions, son-in-laws are restricted from lifting the body if their own parents are still living. Please verify family customs before selecting carriers."
  },
  {
    id: 6,
    name: "Emergency Burial Support Crew",
    price: 4500,
    desc: "Help with digging, lifting, and ceremonial placement.",
    vendor: "Quick Support",
    rating: 4.7,
    reviews: 96,
    badge: "Emergency",
    category: "Body Carriers",
    religion: "All",
    isVerified: true
  }
];

export const mockOrganizers = [
  {
    id: 1,
    name: "Shanti Funeral Services",
    tagline: "Full Hindu ceremony management",
    city: "Hyderabad",
    experience: "15+ Years",
    startingFrom: 25000,
    rating: 4.8,
    reviews: 320,
    services: ["Full Management", "Transportation", "Priests", "Catering"]
  },
  {
    id: 2,
    name: "Peace Memorial Team",
    tagline: "All religions - 24/7 emergency",
    city: "Hyderabad",
    experience: "8+ Years",
    startingFrom: 18000,
    rating: 4.7,
    reviews: 145,
    services: ["Transportation", "Priests", "Ceremony Setup"]
  }
];

export const mockSchemes = [
  {
    id: 1,
    name: "National Family Benefit Scheme",
    dept: "Ministry of Rural Development",
    eligibility: "BPL families who lost primary breadwinner",
    benefits: "₹20,000 one-time",
    docsCount: 5
  },
  {
    id: 2,
    name: "PM Jeevan Jyoti Bima Yojana",
    dept: "Ministry of Finance",
    eligibility: "Account holders aged 18-50",
    benefits: "₹2,00,000 insurance claim",
    docsCount: 4
  }
];
