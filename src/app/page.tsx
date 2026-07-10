import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedDestinations } from "@/components/sections/FeaturedDestinations";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { TopHomestays } from "@/components/sections/TopHomestays";
import { AdventureActivities } from "@/components/sections/AdventureActivities";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { TravelBlog } from "@/components/sections/TravelBlog";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { FAQSection } from "@/components/sections/FAQSection";
import { ParallaxLayer, TextReveal, HoverGlow, FloatingElement } from "@/components/animations/MicroInteractions";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ParallaxLayer speed={0.15} direction="vertical">
        <FeaturedDestinations />
      </ParallaxLayer>

      <ParallaxLayer speed={-0.1} direction="vertical">
        <FeaturedPackages />
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} direction="vertical">
        <TopHomestays />
      </ParallaxLayer>

      <ParallaxLayer speed={-0.15} direction="vertical">
        <AdventureActivities />
      </ParallaxLayer>

      <UpcomingEvents />

      <ParallaxLayer speed={0.1} direction="vertical">
        <TravelBlog />
      </ParallaxLayer>

      <Testimonials />

      <ParallaxLayer speed={-0.08} direction="vertical">
        <Newsletter />
      </ParallaxLayer>

      <FAQSection />
    </>
  );
}
