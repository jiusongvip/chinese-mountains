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

export interface Persona {
  id: string;
  label: string;
  verdict: "go" | "skip" | "conditional";
  summary: string;
  advice: string;
}

export interface RouteOption {
  name: string;
  gate: string;
  type: "cable-car" | "hike" | "shuttle";
  time: string;
  cost: string;
  difficulty: "easy" | "moderate" | "hard";
  scenery: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  recommended?: boolean;
}

export interface ItineraryStep {
  time: string;
  title: string;
  detail: string;
  duration: string;
}

export interface Itinerary {
  days: number;
  title: string;
  suitable: string;
  steps: ItineraryStep[];
  note: string;
}

export interface StayOption {
  name: string;
  location: "summit" | "base" | "city";
  price: string;
  sunriseAccess: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface SeasonProfile {
  season: string;
  months: string;
  weather: string;
  views: string;
  crowds: "busy" | "moderate" | "quiet";
  score: number;
  highlight: string;
}

export interface CostPlan {
  tier: "budget" | "mid" | "premium";
  days: number;
  totalPerPerson: string;
  items: string[];
}

export interface Comparison {
  slug: string;
  headline: string;
  differences: string[];
  verdict: string;
}

export interface PackingItem {
  item: string;
  why: string;
}

export interface MountainDepth {
  verifiedDate: string;
  verdict: {
    score: number;
    headline: string;
    worthIt: string;
    skipIf: string;
    bestFor: string;
  };
  personas: Persona[];
  routes: RouteOption[];
  itineraries: Itinerary[];
  stays: StayOption[];
  seasons: SeasonProfile[];
  costs: {
    entry: string;
    cableCar: string;
    shuttle: string;
    hotelDorm: string;
    hotelPrivate: string;
    mealBudget: string;
    /** Editor footnote under the price list (e.g. "Sightseeing bus CNY 90 extra") */
    note?: string;
    samplePlans: CostPlan[];
    calculator: {
      entryPeak: number;
      entryOffPeak: number;
      cableCar: number;
      shuttle: number;
      dormPerNight: number;
      privatePerNight: number;
      baseHotelPerNight: number;
      mealPerDay: number;
      canyonRailway: number;
      /** Optional label for the extras toggle (e.g. "Ten-mile Gallery train"); the toggle is hidden when canyonRailway is 0 */
      extraLabel?: string;
      /** Footnote under the calculator total; defaults to the Huangshan note */
      note?: string;
    };
  };
  comparisons: Comparison[];
  proTips: string[];
  packing: PackingItem[];
}
