export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  distance?: string;
}

export interface HiddenGem {
  id: string;
  name: string;
  description: string;
  image: string;
  whyVisit: string;
}

export interface Viewpoint {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "sunrise" | "sunset" | "photography" | "panoramic";
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  description: string;
}

export interface Cafe {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  description: string;
}

export interface StreetFood {
  name: string;
  description: string;
}

export interface Market {
  id: string;
  name: string;
  description: string;
  whatToBuy: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  duration: string;
  price: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  transport: string;
  accommodation: string;
  budget: string;
}

export interface Itinerary {
  days: number;
  title: string;
  overview: string;
  daysPlan: ItineraryDay[];
  estimatedBudget: string;
}

export interface TransportOption {
  mode: "train" | "flight" | "bus" | "car" | "bike";
  description: string;
  duration: string;
  cost: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  type: "hospital" | "police" | "rescue" | "tourist";
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  state: string;
  district: string;
  heroImage: string;
  galleryImages: string[];
  introduction: string;
  history: string;
  coordinates: Coordinates;
  altitude: string;
  temperature: {
    summer: string;
    winter: string;
    monsoon: string;
  };
  weather: string;
  bestTime: string;
  bestTimeMonths: string[];
  nearbyAttractions: Attraction[];
  hiddenGems: HiddenGem[];
  viewpoints: Viewpoint[];
  adventureActivities: Activity[];
  localFood: string[];
  restaurants: Restaurant[];
  cafes: Cafe[];
  streetFood: StreetFood[];
  shopping: Market[];
  culture: string;
  festivals: string[];
  traditionalDresses: string[];
  language: string;
  budgetPlanner: {
    backpacker: string;
    midRange: string;
    luxury: string;
  };
  transportation: {
    howToReach: TransportOption[];
    nearbyRailway: string;
    nearbyAirport: string;
    taxiFare: string;
    bikeRental: string;
  };
  packingList: string[];
  emergencyContacts: EmergencyContact[];
  networkAvailability: string;
  internetSpeed: string;
  workationFriendly: boolean;
  familyFriendly: boolean;
  coupleFriendly: boolean;
  soloFriendly: boolean;
  seniorFriendly: boolean;
  petFriendly: boolean;
  travelTips: string[];
  thingsToAvoid: string[];
  commonScams: string[];
  weatherAlerts: string[];
  suggestedItineraries: Itinerary[];
  nearbyPlaces: { name: string; distance: string; description: string }[];
  reviews: Review[];
  faqs: FAQ[];
  tags: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  type: "weekend" | "luxury" | "budget" | "family" | "couple" | "backpacking" | "photography" | "camping" | "trekking" | "honeymoon" | "corporate" | "college" | "group";
  image: string;
  duration: string;
  price: number;
  originalPrice: number;
  destinations: string[];
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Itinerary;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface Homestay {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  description: string;
  hostName: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  stars: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  description: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  category: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  type: "festival" | "cultural" | "adventure" | "seasonal";
}
