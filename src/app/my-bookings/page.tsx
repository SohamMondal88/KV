"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  CalendarDays,
  MapPin,
  Mountain,
  Eye,
  XCircle,
  RotateCcw,
  ChevronDown,
  ArrowUpDown,
  TicketCheck,
  PackageOpen,
  ArrowRight,
} from "lucide-react";

import { useCart, type Booking } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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

type StatusFilter = "all" | "upcoming" | "completed" | "cancelled";

const tabs: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    variant: "primary" as const,
    icon: TicketCheck,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  pending: {
    label: "Pending",
    variant: "accent" as const,
    icon: CalendarDays,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
  cancelled: {
    label: "Cancelled",
    variant: "outline" as const,
    icon: XCircle,
    color: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/20",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    icon: PackageOpen,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
};

type SortOrder = "newest" | "oldest" | "amount-high" | "amount-low";

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useCart();

  const [activeTab, setActiveTab] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);

  // Load from localStorage on mount (CartContext already does this, but ensure rehydration)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    let list = [...bookings];

    if (activeTab !== "all") {
      list = list.filter((b) => {
        if (activeTab === "upcoming")
          return b.status === "confirmed" || b.status === "pending";
        return b.status === activeTab;
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.items.some((i) => i.name.toLowerCase().includes(q)) ||
          b.customerName.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.bookingDate).getTime() -
            new Date(b.bookingDate).getTime()
          );
        case "amount-high":
          return b.totalAmount - a.totalAmount;
        case "amount-low":
          return a.totalAmount - b.totalAmount;
        case "newest":
        default:
          return (
            new Date(b.bookingDate).getTime() -
            new Date(a.bookingDate).getTime()
          );
      }
    });

    return list;
  }, [bookings, activeTab, search, sort]);

  const handleCancel = (id: string) => {
    cancelBooking(id);
    setCancelConfirm(null);
    setSelectedBooking((prev) => (prev?.id === id ? null : prev));
  };

  return (
    <div className="min-h-full">
      <section className="py-8 sm:py-12">
        <Container>
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Bookings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your reservations and trip details
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/packages">
                <Button size="sm" variant="primary">
                  <ArrowRight className="mr-1 h-3.5 w-3.5" />
                  Book New Trip
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by booking ID or destination..."
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-9 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
                className="appearance-none rounded-lg border border-border bg-background py-2.5 pl-3 pr-8 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Empty State */}
          {(!mounted || filtered.length === 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <PackageOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                No bookings yet
              </h2>
              <p className="mb-8 max-w-md text-muted-foreground">
                Start your adventure by exploring our curated packages and
                destinations across the Himalayas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/packages">
                  <Button variant="primary">Browse Packages</Button>
                </Link>
                <Link href="/destinations">
                  <Button variant="outline">Explore Destinations</Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Booking Grid */}
          {mounted && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onView={() => setSelectedBooking(booking)}
                    onCancel={() => setCancelConfirm(booking.id)}
                    onBookAgain={() => { /* noop for demo */ }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <Modal onClose={() => setSelectedBooking(null)}>
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Booking Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedBooking.id}
                  </p>
                </div>
                <StatusBadge status={selectedBooking.status} />
              </div>

              <div className="space-y-3">
                {selectedBooking.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Mountain className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.location} · {item.date} · {item.guests} guest
                        {item.guests > 1 ? "s" : ""}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatINR(item.pricePerUnit * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Amount</span>
                  <span className="font-medium text-foreground">
                    {formatINR(selectedBooking.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Booking Date</span>
                  <span className="text-foreground">
                    {formatDate(selectedBooking.bookingDate)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Method</span>
                  <span className="text-foreground">
                    {selectedBooking.paymentMethod || "N/A"}
                  </span>
                </div>
                {selectedBooking.paymentId && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Transaction ID</span>
                    <span className="font-mono text-foreground">
                      {selectedBooking.paymentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Customer</span>
                  <span className="text-foreground">
                    {selectedBooking.customerName}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {(selectedBooking.status === "confirmed" ||
                  selectedBooking.status === "pending") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCancelConfirm(selectedBooking.id)}
                  >
                    <XCircle className="mr-1 h-3.5 w-3.5" />
                    Cancel Booking
                  </Button>
                )}
                <Link href="/packages">
                  <Button size="sm" variant="ghost">
                    <RotateCcw className="mr-1 h-3.5 w-3.5" />
                    Book Again
                  </Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation */}
      <AnimatePresence>
        {cancelConfirm && (
          <Modal onClose={() => setCancelConfirm(null)}>
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Cancel Booking?
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Are you sure you want to cancel this booking? This action cannot be
              undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCancelConfirm(null)}
              >
                Keep Booking
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCancel(cancelConfirm)}
              >
                <XCircle className="mr-1 h-3.5 w-3.5" />
                Confirm Cancel
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function BookingCard({
  booking,
  onView,
  onCancel,
}: {
  booking: Booking;
  onView: () => void;
  onCancel: () => void;
  onBookAgain: () => void;
}) {
  const firstItem = booking.items[0];
  const moreCount = booking.items.length - 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
    >
      <Card hoverLift={false} className="flex h-full flex-col overflow-hidden">
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
            <StatusBadge status={booking.status} />
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
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant="ghost" onClick={onView}>
                <Eye className="mr-1 h-3.5 w-3.5" />
                View
              </Button>
              {(booking.status === "confirmed" ||
                booking.status === "pending") && (
                <Button size="sm" variant="outline" onClick={onCancel}>
                  <XCircle className="mr-1 h-3.5 w-3.5" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color} border ${cfg.border}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
