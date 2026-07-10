import { homestays } from "@/lib/data";
import HomestayBookingClient from "./HomestayBookingClient";

export function generateStaticParams() {
  return homestays.map((h) => ({ slug: h.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function HomestayBookingPage({ params }: Props) {
  const { slug } = await params;
  return <HomestayBookingClient slug={slug} />;
}
