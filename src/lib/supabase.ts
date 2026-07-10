import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type SupabaseDestination = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  state: string;
  district: string;
  hero_image: string;
  gallery_images: string[];
  introduction: string;
  history: string;
  latitude: number;
  longitude: number;
  altitude: string;
  summer_temp: string;
  winter_temp: string;
  monsoon_temp: string;
  weather: string;
  best_time: string;
  best_time_months: string[];
  local_food: string[];
  culture: string;
  festivals: string[];
  traditional_dresses: string[];
  language: string;
  altitude_val: number;
  featured: boolean;
  rating: number;
  review_count: number;
  tags: string[];
};

export type SupabaseBooking = {
  id: string;
  user_id?: string;
  items: {
    type: string;
    name: string;
    image: string;
    location: string;
    date: string;
    guests: number;
    price_per_unit: number;
    quantity: number;
    duration?: string;
    details?: string;
  }[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  payment_method?: string;
  payment_id?: string;
};

export type SupabaseUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  created_at: string;
  address?: string;
  city?: string;
  state?: string;
  bio?: string;
  business_name?: string;
  verification_status?: "pending" | "verified" | "rejected";
};
