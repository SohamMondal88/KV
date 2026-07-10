import { hotels } from "@/lib/data";
import HotelBookingClient from "./HotelBookingClient";

export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function HotelBookingPage({ params }: Props) {
  const { slug } = await params;
  return <HotelBookingClient slug={slug} />;
}
