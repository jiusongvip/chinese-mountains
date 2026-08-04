export interface MountainName {
  en: string;
  zh: string;
  alt?: string;
}

export interface MountainLocation {
  province: string;
  region: "north" | "south" | "east" | "west" | "central" | "southwest" | "northwest";
  coordinates: { lat: number; lng: number };
  nearestCity: string;
}

export interface MountainPhysical {
  elevation: number;
  prominence?: number;
  geology: string;
  area: string;
}

export interface MountainTourism {
  difficulty: "easy" | "moderate" | "hard" | "extreme";
  bestSeason: string[];
  avgVisitDuration: string;
  ticketPrice: string;
}

export interface MountainCulture {
  type: string[];
  unescoSite: boolean;
  yearDesignated: number | null;
  significance: string;
}

export interface MountainRating {
  scenery: number;
  accessibility: number;
  culturalValue: number;
  hikingExperience: number;
  overall: number;
}

export interface MountainImage {
  src: string;
  alt: string;
  credit: string;
}

export interface Mountain {
  id: string;
  slug: string;
  name: MountainName;
  tagline: string;
  location: MountainLocation;
  physical: MountainPhysical;
  tourism: MountainTourism;
  culture: MountainCulture;
  rating: MountainRating;
  images: MountainImage[];
  description: string;
  highlights: string[];
  whenToGo: string;
  howToGetThere: string;
  faqs: { q: string; a: string }[];
}

export interface VibeGroup {
  id: string;
  label: string;
  emoji: string;
  description: string;
  mountainIds: string[];
}
