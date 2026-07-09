import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | Hidden Gems",
};

export default function WishlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
