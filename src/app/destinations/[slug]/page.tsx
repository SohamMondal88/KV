import { Metadata } from "next";
import { destinations } from "@/lib/data";
import DestinationDetailClient from "@/components/destination/DestinationDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return { title: "Not Found | KuboVista" };

  return {
    title: `${destination.name} — ${destination.tagline} | KuboVista`,
    description: destination.introduction,
    openGraph: {
      title: `${destination.name} | KuboVista`,
      description: destination.introduction,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DestinationDetailClient slug={slug} />;
}
