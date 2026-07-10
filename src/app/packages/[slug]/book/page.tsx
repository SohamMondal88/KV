import { packages } from "@/lib/data";
import PackageBookingClient from "./PackageBookingClient";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PackageBookingPage({ params }: Props) {
  const { slug } = await params;
  return <PackageBookingClient slug={slug} />;
}
