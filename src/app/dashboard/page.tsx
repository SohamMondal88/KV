"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CalendarDays,
  Heart,
  Map,
  Settings,
  LogOut,
  Save,
  ChevronRight,
  Mountain,
  Eye,
  XCircle,
  PackageOpen,
  ArrowRight,
  TicketCheck,
  MapPin,
  Sun,
  Moon,
  Mail,
  Smartphone,
  Trash2,
  Award,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { useCart, type Booking } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { BadgeSystem } from "@/components/BadgeSystem";

type TabId = "profile" | "bookings" | "wishlist" | "saved-trips" | "settings" | "badges";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "My Bookings", icon: CalendarDays },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "saved-trips", label: "Saved Trips", icon: Map },
  { id: "badges", label: "Badges", icon: Award },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusConfig: Record<
  Booking["status"],
  { label: string; color: string; bg: string; border: string }
> = {
  confirmed: {
    label: "Confirmed",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  pending: {
    label: "Pending",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/20",
  },
  completed: {
    label: "Completed",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ========================== Page ========================== */
export default function DashboardPage() {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const { bookings } = useCart();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background md:flex-row">
      {/* Mobile Tab Bar */}
      <div className="border-b border-border bg-card md:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  {activeTab === t.id && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5" />
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="mt-auto flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Container className="py-6 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "profile" && <ProfileTab user={user} onUpdate={updateProfile} />}
              {activeTab === "bookings" && <BookingsTab bookings={bookings} />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "saved-trips" && <SavedTripsTab />}
              {activeTab === "badges" && <BadgesTab />}
              {activeTab === "settings" && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </Container>
      </main>
    </div>
  );
}

/* ========================== Not Logged In ========================== */
function NotLoggedIn() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Please Sign In
        </h2>
        <p className="mb-8 text-muted-foreground">
          Sign in to access your dashboard, bookings, and saved trips.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Create Account</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ========================== Profile Tab ========================== */
function ProfileTab({
  user,
  onUpdate,
}: {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  onUpdate: ReturnType<typeof useAuth>["updateProfile"];
}) {
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    bio: user.bio || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    onUpdate({ ...form });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Avatar Card */}
        <Card className="w-full md:w-72 p-6 text-center">
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Badge variant="primary">{user.role}</Badge>
          </div>
        </Card>

        {/* Edit Form */}
        <div className="flex-1 space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Edit Profile
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full rounded-lg border border-border bg-muted py-2 px-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  State
                </label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, state: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bio: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleSave} loading={saving}>
                <Save className="mr-1 h-4 w-4" />
                Save Changes
              </Button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-success"
                >
                  Saved successfully!
                </motion.span>
              )}
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Account Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium text-foreground">
                  {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <Badge variant="primary">{user.role}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ========================== Bookings Tab ========================== */
function BookingsTab({ bookings }: { bookings: Booking[] }) {
  const totalSpent = bookings.reduce((s, b) => s + b.totalAmount, 0);
  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  ).length;

  if (bookings.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your reservations
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <PackageOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No bookings yet
          </h3>
          <p className="mb-8 max-w-md text-muted-foreground">
            Start your adventure by exploring our curated packages and
            destinations across the Himalayas.
          </p>
          <Link href="/packages">
            <Button variant="primary">Browse Packages</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your reservations
          </p>
        </div>
        <div className="flex gap-3">
          <Card className="px-4 py-2" hoverLift={false}>
            <p className="text-xs text-muted-foreground">Upcoming</p>
            <p className="text-lg font-bold text-foreground">{upcoming}</p>
          </Card>
          <Card className="px-4 py-2" hoverLift={false}>
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-lg font-bold text-foreground">
              {formatINR(totalSpent)}
            </p>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const firstItem = booking.items[0];
  const moreCount = booking.items.length - 1;
  const cfg = statusConfig[booking.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex h-full flex-col overflow-hidden" hoverLift={false}>
        <div className="relative h-40 w-full overflow-hidden">
          {firstItem?.image ? (
            <Image
              src={firstItem.image}
              alt={firstItem.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Mountain className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color} border ${cfg.border}`}
            >
              {booking.status === "confirmed" && (
                <TicketCheck className="h-3 w-3" />
              )}
              {booking.status === "pending" && (
                <CalendarDays className="h-3 w-3" />
              )}
              {booking.status === "cancelled" && (
                <XCircle className="h-3 w-3" />
              )}
              {booking.status === "completed" && (
                <PackageOpen className="h-3 w-3" />
              )}
              {cfg.label}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-muted-foreground">
              {booking.id}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(booking.bookingDate)}
            </span>
          </div>
          <h3 className="mb-1 text-base font-semibold text-foreground">
            {firstItem?.name}
            {moreCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                +{moreCount} more
              </span>
            )}
          </h3>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {firstItem?.location || "Multiple"}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {firstItem?.date || "TBD"}
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <span className="text-sm font-bold text-foreground">
              {formatINR(booking.totalAmount)}
            </span>
            <Link href="/my-bookings">
              <Button size="sm" variant="ghost">
                <Eye className="mr-1 h-3.5 w-3.5" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ========================== Wishlist Tab ========================== */
function WishlistTab() {
  const [items, setItems] = useState<
    { id: string; name: string; location: string; image: string }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kv-wishlist");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const sampleItems = [
    {
      id: "w1",
      name: "Pelling Heritage Walk",
      location: "Pelling, Sikkim",
      image: "https://images.unsplash.com/photo-1540206351-d6465b3a5d7a?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "w2",
      name: "Mirik Lake Retreat",
      location: "Mirik, West Bengal",
      image: "https://images.unsplash.com/photo-1506905929765-7f4c2f5e803f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "w3",
      name: "Lamahatta Eco Stay",
      location: "Lamahatta, Darjeeling",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const displayItems = items.length > 0 ? items : sampleItems;

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Wishlist</h2>
        <p className="text-sm text-muted-foreground">
          Destinations and experiences you love
        </p>
      </div>

      {items.length === 0 && (
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          Showing sample items. Save destinations across the site to build your
          real wishlist.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayItems.map((item) => (
          <Card key={item.id} className="overflow-hidden" hoverLift={false}>
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {item.location}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="flex justify-center">
          <Link href="/destinations">
            <Button variant="primary">
              Browse Destinations
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

/* ========================== Saved Trips Tab ========================== */
function SavedTripsTab() {
  const [trips, setTrips] = useState<
    { id: string; destination: string; dates: string; budget: number; image: string }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hg-itineraries");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTrips(
            parsed.map((t: any, i: number) => ({
              id: t.id || `trip-${i}`,
              destination: t.destination || "Himalayan Journey",
              dates: t.dates || "Flexible",
              budget: t.budget || 0,
              image:
                t.image ||
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
            }))
          );
        }
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Saved Trips</h2>
          <p className="text-sm text-muted-foreground">
            AI-generated itineraries ready for your next adventure
          </p>
        </div>
        <Link href="/travel-planner">
          <Button variant="primary">
            <Map className="mr-1 h-4 w-4" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Map className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No saved trips yet
          </h3>
          <p className="mb-8 max-w-md text-muted-foreground">
            Use our AI Travel Planner to generate personalized itineraries and
            save them here.
          </p>
          <Link href="/travel-planner">
            <Button variant="primary">Plan a Trip</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden" hoverLift={false}>
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.destination}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground">
                  {trip.destination}
                </h3>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{trip.dates}</span>
                  <span className="font-medium text-foreground">
                    {formatINR(trip.budget)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================== Settings Tab ========================== */
function SettingsTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const toggleDark = () => {
    setDarkMode((v) => {
      const next = !v;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your preferences and account
        </p>
      </div>

      <div className="max-w-xl space-y-4">
        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                {darkMode ? (
                  <Moon className="h-4 w-4 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={toggleDark}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Receive updates about bookings and offers
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle email notifications"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Smartphone className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  SMS Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Get text alerts for booking confirmations
                </p>
              </div>
            </div>
            <button
              onClick={() => setSmsNotifications((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smsNotifications ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle SMS notifications"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smsNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="border-danger/30 p-5" hoverLift={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10">
                <Trash2 className="h-4 w-4 text-danger" />
              </div>
              <div>
                <p className="text-sm font-medium text-danger">
                  Delete Account
                </p>
                <p className="text-xs text-muted-foreground">
                  Permanently remove your account and data
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-danger text-danger hover:bg-danger/10">
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ========================== Badges Tab ========================== */
function BadgesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Achievements</h2>
        <p className="text-sm text-muted-foreground">
          Earn badges as you explore the Himalayas
        </p>
      </div>
      <BadgeSystem />
    </div>
  );
}
