import type { MetadataRoute } from "next";
import { destinations, packages, blogPosts } from "@/lib/data";

export const dynamic = "force-static";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "daily" | "weekly" | "monthly" | "always" | "hourly" | "yearly" | "never";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://KuboVista.travel";

  const staticRoutes: { route: string; freq: SitemapEntry["changeFrequency"]; priority: number }[] = [
    { route: "", freq: "daily", priority: 1.0 },
    { route: "/about", freq: "weekly", priority: 0.8 },
    { route: "/contact", freq: "weekly", priority: 0.8 },
    { route: "/faq", freq: "weekly", priority: 0.8 },
    { route: "/privacy", freq: "monthly", priority: 0.5 },
    { route: "/terms", freq: "monthly", priority: 0.5 },
    { route: "/destinations", freq: "weekly", priority: 0.9 },
    { route: "/packages", freq: "weekly", priority: 0.9 },
    { route: "/homestays", freq: "weekly", priority: 0.8 },
    { route: "/hotels", freq: "weekly", priority: 0.8 },
    { route: "/food-guide", freq: "weekly", priority: 0.8 },
    { route: "/blog", freq: "weekly", priority: 0.8 },
    { route: "/itineraries", freq: "weekly", priority: 0.7 },
    { route: "/attractions", freq: "weekly", priority: 0.7 },
    { route: "/travel-planner", freq: "weekly", priority: 0.8 },
    { route: "/trip-calculator", freq: "weekly", priority: 0.8 },
    { route: "/packing-list", freq: "weekly", priority: 0.7 },
    { route: "/weather-suggest", freq: "weekly", priority: 0.7 },
    { route: "/food-recommendations", freq: "weekly", priority: 0.7 },
    { route: "/hotel-recommendations", freq: "weekly", priority: 0.7 },
    { route: "/book-taxi", freq: "weekly", priority: 0.7 },
    { route: "/book-guide", freq: "weekly", priority: 0.7 },
    { route: "/book-trek", freq: "weekly", priority: 0.7 },
    { route: "/book-activity", freq: "weekly", priority: 0.7 },
    { route: "/cart", freq: "daily", priority: 0.6 },
    { route: "/checkout", freq: "daily", priority: 0.6 },
    { route: "/my-bookings", freq: "weekly", priority: 0.8 },
    { route: "/currency-converter", freq: "weekly", priority: 0.7 },
    { route: "/quiz", freq: "weekly", priority: 0.7 },
    { route: "/leaderboard", freq: "weekly", priority: 0.6 },
    { route: "/login", freq: "monthly", priority: 0.5 },
    { route: "/register", freq: "monthly", priority: 0.5 },
    { route: "/dashboard", freq: "weekly", priority: 0.8 },
    { route: "/admin", freq: "monthly", priority: 0.4 },
    { route: "/join", freq: "monthly", priority: 0.6 },
    { route: "/booking-confirmation", freq: "monthly", priority: 0.5 },
    { route: "/wishlist", freq: "monthly", priority: 0.5 },
  ];

  const staticPages: SitemapEntry[] = staticRoutes.map(({ route, freq, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  const destinationPages: SitemapEntry[] = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: dest.featured ? 0.9 : 0.7,
  }));

  const packagePages: SitemapEntry[] = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: pkg.featured ? 0.8 : 0.6,
  }));

  const blogPages: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...destinationPages, ...packagePages, ...blogPages] as MetadataRoute.Sitemap;
}
