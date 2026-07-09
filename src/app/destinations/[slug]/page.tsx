import { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { Destination } from "@/lib/types";
import { DestinationHero } from "@/components/destination/DestinationHero";
import { DestinationNav } from "@/components/destination/DestinationNav";
import { DestinationOverview } from "@/components/destination/DestinationOverview";
import { DestinationAttractions } from "@/components/destination/DestinationAttractions";
import { DestinationFood } from "@/components/destination/DestinationFood";
import { DestinationActivities } from "@/components/destination/DestinationActivities";
import { DestinationItinerary } from "@/components/destination/DestinationItinerary";
import { DestinationTransport } from "@/components/destination/DestinationTransport";
import { DestinationReviews } from "@/components/destination/DestinationReviews";
import { DestinationFAQ } from "@/components/destination/DestinationFAQ";
import { DestinationGallery } from "@/components/destination/DestinationGallery";
import { DestinationSidebar } from "@/components/destination/DestinationSidebar";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return { title: "Not Found | Hidden Gems" };

  return {
    title: `${destination.name} — ${destination.tagline} | Hidden Gems`,
    description: destination.introduction,
    openGraph: {
      title: `${destination.name} | Hidden Gems`,
      description: destination.introduction,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return notFound();

  return (
    <div className="min-h-screen">
      <DestinationHero destination={destination} />
      <DestinationNav />

      <section id="overview">
        <DestinationOverview destination={destination} />
      </section>

      <section id="gallery">
        <DestinationGallery destination={destination} />
      </section>

      <Container className="py-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 min-w-0">
            <section id="attractions">
              <DestinationAttractions destination={destination} />
            </section>
            <section id="food">
              <DestinationFood destination={destination} />
            </section>
            <section id="activities">
              <DestinationActivities destination={destination} />
            </section>
            <section id="itinerary">
              <DestinationItinerary destination={destination} />
            </section>
            <section id="transport">
              <DestinationTransport destination={destination} />
            </section>
            <section id="reviews">
              <DestinationReviews destination={destination} />
            </section>
            <section id="faq">
              <DestinationFAQ destination={destination} />
            </section>
          </div>

          <div className="w-full shrink-0 lg:w-80 xl:w-96">
            <div className="lg:sticky lg:top-20">
              <DestinationSidebar destination={destination} />
            </div>
          </div>
        </div>
      </Container>

      {/* Nearby Places Section */}
      <section className="bg-muted/50 py-16">
        <Container>
          <SectionHeading title="Nearby Places" subtitle="Explore destinations around this area" align="left" className="mb-10" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destination.nearbyPlaces.map((place, i) => (
              <div key={i} className="rounded-xl bg-card p-5 border border-border shadow-sm">
                <h4 className="text-base font-semibold">{place.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{place.distance}</p>
                <p className="text-sm text-muted-foreground mt-2">{place.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Plan Your Trip</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Let our experts craft a personalized itinerary for your {destination.name} adventure.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button variant="accent" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
