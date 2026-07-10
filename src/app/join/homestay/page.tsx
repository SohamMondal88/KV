"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Upload,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const destinations = [
  "Kalimpong",
  "Pabong",
  "Lebong",
  "Ramdhura",
  "Mirik",
  "Lamahatta",
  "Lepchajagat",
  "Chatakpur",
  "Samsing",
  "Sittong",
  "Bijanbari",
  "Ahaldhara",
  "Kolbong",
  "Kolakham",
  "Peshok",
  "Rishikhola",
  "Pelling",
];

const amenityOptions = [
  "WiFi",
  "Hot Water",
  "Heater",
  "Parking",
  "Garden",
  "Kitchen",
  "Fireplace",
  "Mountain View",
  "Pet Friendly",
  "Work Desk",
];

export default function HomestayRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    idProofType: "",
    idProofNumber: "",
    homestayName: "",
    description: "",
    location: "",
    exactAddress: "",
    rooms: "",
    maxGuests: "",
    pricePerNight: "",
    amenities: [] as string[],
    businessRegNumber: "",
    panCard: "",
    confirmOwnership: false,
  });

  const toggleAmenity = (a: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `KV-HS-${Date.now().toString(36).toUpperCase()}`;
    setAppId(id);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-900 pb-16 pt-28 text-white">
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/join"
              className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Join
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Register Your Homestay
            </h1>
            <p className="mt-3 max-w-xl text-white/80">
              List your property and welcome travelers from around the world.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="pb-20 pt-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="mx-auto max-w-3xl space-y-10"
            >
              {/* Owner Information */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Home className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Owner Information
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      ID Proof Type
                    </label>
                    <select
                      required
                      value={form.idProofType}
                      onChange={(e) =>
                        setForm({ ...form, idProofType: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select ID type</option>
                      <option value="Aadhaar">Aadhaar</option>
                      <option value="Passport">Passport</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      ID Proof Number
                    </label>
                    <input
                      required
                      value={form.idProofNumber}
                      onChange={(e) =>
                        setForm({ ...form, idProofNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter ID proof number"
                    />
                  </div>
                </div>
              </Card>

              {/* Homestay Details */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Home className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Homestay Details
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Homestay Name
                    </label>
                    <input
                      required
                      value={form.homestayName}
                      onChange={(e) =>
                        setForm({ ...form, homestayName: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., Himalayan Haven"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Location
                    </label>
                    <select
                      required
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select destination</option>
                      {destinations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Describe your homestay, surroundings, and unique offerings..."
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Exact Address
                    </label>
                    <input
                      required
                      value={form.exactAddress}
                      onChange={(e) =>
                        setForm({ ...form, exactAddress: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Village, Road, Landmark, PIN"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Number of Rooms
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.rooms}
                      onChange={(e) =>
                        setForm({ ...form, rooms: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Max Guests
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.maxGuests}
                      onChange={(e) =>
                        setForm({ ...form, maxGuests: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 8"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Price per Night (₹)
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.pricePerNight}
                      onChange={(e) =>
                        setForm({ ...form, pricePerNight: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Amenities
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {amenityOptions.map((a) => {
                        const selected = form.amenities.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleAmenity(a)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {selected && (
                              <CheckCircle className="mr-1 inline h-3.5 w-3.5" />
                            )}
                            {a}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Photos
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setTooltip("photos")}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() => setTooltip("photos")}
                        onBlur={() => setTooltip(null)}
                        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Photos
                      </button>
                      {tooltip === "photos" && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-0 top-full z-10 mt-2 rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg"
                        >
                          <div className="flex items-center gap-1.5">
                            <Info className="h-3 w-3" />
                            Feature coming soon
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Verification */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Verification
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Business Registration Number
                    </label>
                    <input
                      value={form.businessRegNumber}
                      onChange={(e) =>
                        setForm({ ...form, businessRegNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      PAN Card / Tax ID
                    </label>
                    <input
                      value={form.panCard}
                      onChange={(e) =>
                        setForm({ ...form, panCard: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        checked={form.confirmOwnership}
                        onChange={(e) =>
                          setForm({ ...form, confirmOwnership: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm text-muted-foreground">
                        I confirm this is my property or I have permission to list
                        it on KuboVista.
                      </span>
                    </label>
                  </div>
                </div>
              </Card>

              <div className="flex items-center justify-end gap-3">
                <Link href="/join">
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" size="lg">
                  Submit Application
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-xl text-center"
            >
              <Card className="p-8 sm:p-12">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">
                  Application Submitted!
                </h2>
                <p className="mt-3 text-muted-foreground">
                  We&apos;ll review and contact you within 48 hours.
                </p>
                <div className="mt-6 inline-block rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground">
                  Application ID: <span className="text-primary">{appId}</span>
                </div>
                <div className="mt-8">
                  <Link href="/dashboard">
                    <Button size="lg">Go to Dashboard</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
