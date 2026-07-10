"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
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

const languagesOptions = [
  "English",
  "Hindi",
  "Nepali",
  "Bengali",
  "Tibetan",
  "Lepcha",
  "Bhutia",
];

const specialtiesOptions = [
  "Trekking",
  "Culture",
  "Photography",
  "Wildlife",
  "History",
  "Food",
];

const daysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function GuideRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    languages: [] as string[],
    yearsExperience: "",
    specialties: [] as string[],
    certifications: "",
    guideLicenseNumber: "",
    preferredDestinations: [] as string[],
    dailyRate: "",
    availableDays: [] as string[],
    emergencyName: "",
    emergencyPhone: "",
    agreeTerms: false,
  });

  const toggleMulti = (
    key: "languages" | "specialties" | "preferredDestinations" | "availableDays",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((x) => x !== value)
        : [...prev[key], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `KV-GD-${Date.now().toString(36).toUpperCase()}`;
    setAppId(id);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 to-sky-900 pb-16 pt-28 text-white">
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
              Become a Certified KuboVista Guide
            </h1>
            <p className="mt-3 max-w-xl text-white/80">
              Share your local knowledge and earn doing what you love.
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
              {/* Personal Info */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Map className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Personal Information
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
                      Date of Birth
                    </label>
                    <input
                      required
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {languagesOptions.map((l) => {
                        const selected = form.languages.includes(l);
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={() => toggleMulti("languages", l)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {selected && (
                              <CheckCircle className="mr-1 inline h-3.5 w-3.5" />
                            )}
                            {l}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Professional Info */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Map className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Professional Information
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Years of Experience
                    </label>
                    <input
                      required
                      type="number"
                      min={0}
                      value={form.yearsExperience}
                      onChange={(e) =>
                        setForm({ ...form, yearsExperience: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Daily Rate (₹)
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      value={form.dailyRate}
                      onChange={(e) =>
                        setForm({ ...form, dailyRate: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g., 1500"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Specialties
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {specialtiesOptions.map((s) => {
                        const selected = form.specialties.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleMulti("specialties", s)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {selected && (
                              <CheckCircle className="mr-1 inline h-3.5 w-3.5" />
                            )}
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Certifications
                    </label>
                    <textarea
                      rows={3}
                      value={form.certifications}
                      onChange={(e) =>
                        setForm({ ...form, certifications: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="List any certifications (e.g., Sikkim Tourism Guide Certificate, Wilderness First Aid...)"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Guide License Number
                    </label>
                    <input
                      required
                      value={form.guideLicenseNumber}
                      onChange={(e) =>
                        setForm({ ...form, guideLicenseNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your official guide license number"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Preferred Destinations
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {destinations.map((d) => {
                        const selected = form.preferredDestinations.includes(d);
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => toggleMulti("preferredDestinations", d)}
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
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Available Days
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {daysOptions.map((d) => {
                        const selected = form.availableDays.includes(d);
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => toggleMulti("availableDays", d)}
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
                      Upload ID Proof
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setTooltip("id")}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() => setTooltip("id")}
                        onBlur={() => setTooltip(null)}
                        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                        Upload ID Proof
                      </button>
                      {tooltip === "id" && (
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Upload Guide License
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setTooltip("license")}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() => setTooltip("license")}
                        onBlur={() => setTooltip(null)}
                        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Guide License
                      </button>
                      {tooltip === "license" && (
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
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Emergency Contact
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        required
                        value={form.emergencyName}
                        onChange={(e) =>
                          setForm({ ...form, emergencyName: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Contact Name"
                      />
                      <input
                        required
                        type="tel"
                        value={form.emergencyPhone}
                        onChange={(e) =>
                          setForm({ ...form, emergencyPhone: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Contact Phone"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        checked={form.agreeTerms}
                        onChange={(e) =>
                          setForm({ ...form, agreeTerms: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to KuboVista guide terms and confirm that all
                        information provided is accurate.
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
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
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
