"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Upload,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

const vehicleTypes = ["SUV", "Sedan", "Innova", "Bike", "Tempo Traveller"];

export default function TaxiRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    driversLicense: "",
    vehicleType: "",
    vehicleModel: "",
    registrationNumber: "",
    seats: "",
    ac: "Yes",
    luggageCapacity: "",
    serviceAreas: [] as string[],
    baseLocation: "",
    ratePerKm: "",
    minimumCharge: "",
    available24_7: "Yes",
    insuranceNumber: "",
    permitDetails: "",
  });

  const toggleServiceArea = (d: string) => {
    setForm((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(d)
        ? prev.serviceAreas.filter((x) => x !== d)
        : [...prev.serviceAreas, d],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `KV-TX-${Date.now().toString(36).toUpperCase()}`;
    setAppId(id);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-700 to-amber-900 pb-16 pt-28 text-white">
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
              Register Your Transport Service
            </h1>
            <p className="mt-3 max-w-xl text-white/80">
              Connect with travelers who need reliable transport across the Himalayas.
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
              {/* Owner Info */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Car className="h-5 w-5" />
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
                      Driver&apos;s License Number
                    </label>
                    <input
                      required
                      value={form.driversLicense}
                      onChange={(e) =>
                        setForm({ ...form, driversLicense: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter license number"
                    />
                  </div>
                </div>
              </Card>

              {/* Vehicle Info */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Car className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Vehicle Information
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Vehicle Type
                    </label>
                    <select
                      required
                      value={form.vehicleType}
                      onChange={(e) =>
                        setForm({ ...form, vehicleType: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select vehicle type</option>
                      {vehicleTypes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Vehicle Model
                    </label>
                    <input
                      required
                      value={form.vehicleModel}
                      onChange={(e) =>
                        setForm({ ...form, vehicleModel: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., Toyota Innova Crysta"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Registration Number
                    </label>
                    <input
                      required
                      value={form.registrationNumber}
                      onChange={(e) =>
                        setForm({ ...form, registrationNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., WB-01-AB-1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Number of Seats
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.seats}
                      onChange={(e) =>
                        setForm({ ...form, seats: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 7"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      AC Available
                    </label>
                    <select
                      required
                      value={form.ac}
                      onChange={(e) =>
                        setForm({ ...form, ac: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Luggage Capacity
                    </label>
                    <input
                      required
                      value={form.luggageCapacity}
                      onChange={(e) =>
                        setForm({ ...form, luggageCapacity: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 4 large suitcases"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Vehicle Photos
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setTooltip("vehicle-photos")}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() => setTooltip("vehicle-photos")}
                        onBlur={() => setTooltip(null)}
                        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Vehicle Photos
                      </button>
                      {tooltip === "vehicle-photos" && (
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

              {/* Service Info */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Car className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Service Information
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Service Areas
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {destinations.map((d) => {
                        const selected = form.serviceAreas.includes(d);
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => toggleServiceArea(d)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {selected && (
                              <CheckCircle className="mr-1 inline h-3.5 w-3.5" />
                            )}
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Base Location
                    </label>
                    <select
                      required
                      value={form.baseLocation}
                      onChange={(e) =>
                        setForm({ ...form, baseLocation: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select base location</option>
                      {destinations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Available 24/7?
                    </label>
                    <select
                      required
                      value={form.available24_7}
                      onChange={(e) =>
                        setForm({ ...form, available24_7: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Rate per km (₹)
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.ratePerKm}
                      onChange={(e) =>
                        setForm({ ...form, ratePerKm: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 15"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Minimum Charge (₹)
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.minimumCharge}
                      onChange={(e) =>
                        setForm({ ...form, minimumCharge: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 500"
                    />
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
                      Vehicle Insurance Number
                    </label>
                    <input
                      required
                      value={form.insuranceNumber}
                      onChange={(e) =>
                        setForm({ ...form, insuranceNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter insurance policy number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Permit Details
                    </label>
                    <input
                      required
                      value={form.permitDetails}
                      onChange={(e) =>
                        setForm({ ...form, permitDetails: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="State / National permit details"
                    />
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
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
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
