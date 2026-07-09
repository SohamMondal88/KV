import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Destinations | Hidden Gems",
  description:
    "Discover 17 hidden Himalayan destinations with Hidden Gems. Filter by state, tags, and ratings to find your perfect offbeat getaway.",
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
