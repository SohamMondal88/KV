import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | KuboVista",
};

export default function WishlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
