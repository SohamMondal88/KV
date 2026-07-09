import {
  HeroSection,
} from "@/components/sections/HeroSection";
import { FeaturedDestinations } from "@/components/sections/FeaturedDestinations";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { TopHomestays } from "@/components/sections/TopHomestays";
import { AdventureActivities } from "@/components/sections/AdventureActivities";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { TravelBlog } from "@/components/sections/TravelBlog";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <FeaturedPackages />
      <TopHomestays />
      <AdventureActivities />
      <UpcomingEvents />
      <TravelBlog />
      <Testimonials />
      <Newsletter />
      <FAQSection />
    </>
  );
}
