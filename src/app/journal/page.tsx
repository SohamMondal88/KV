"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  X,
  Camera,
  MapPin,
  CalendarDays,
  Star,
  Trash2,
  Pencil,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  CheckSquare,
  Square,
  Smile,
  TrendingUp,
  ImageIcon,
  Compass,
  Save,
} from "lucide-react";
import { destinations } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ─── Types ─── */
type ExpenseCategory = "Food" | "Stay" | "Transport" | "Shopping" | "Other";

interface JournalExpense {
  item: string;
  amount: number;
  category: ExpenseCategory;
}

interface JournalEntry {
  id: string;
  tripName: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  coverPhoto: string;
  photos: string[];
  notes: string;
  expenses: JournalExpense[];
  visitedPlaces: string[];
  mood: number;
  bestMemory: string;
  createdAt: string;
}

const STORAGE_KEY = "kv-journal";

const categoryColors: Record<ExpenseCategory, string> = {
  Food: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Stay: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Transport: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Shopping: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Other: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

function loadEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JournalEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function generateId() {
  return `je-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ─── Empty State ─── */
function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-6 flex items-center justify-center gap-4">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent"
        >
          <BookOpen className="h-7 w-7" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Camera className="h-8 w-8" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary"
        >
          <Compass className="h-7 w-7" />
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-foreground">Start your first travel diary</h3>
      <p className="mt-2 max-w-md text-muted-foreground">
        Your memories deserve to be preserved. Document every journey with photos, notes, and expenses.
      </p>
      <Button variant="accent" size="md" className="mt-6" onClick={onCreate}>
        <Plus className="mr-1.5 h-4 w-4" />
        New Entry
      </Button>
    </motion.div>
  );
}

/* ─── Star Input ─── */
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const active = starValue <= (hover || value);
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(starValue)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-7 w-7 ${active ? "text-accent-gold fill-accent-gold" : "text-muted-foreground/30"}`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-medium text-muted-foreground">
        {value > 0 ? ["Terrible", "Bad", "Okay", "Good", "Excellent"][value - 1] : "Select mood"}
      </span>
    </div>
  );
}

/* ─── Entry Form ─── */
function EntryForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: JournalEntry;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}) {
  const [tripName, setTripName] = useState(initial?.tripName || "");
  const [destination, setDestination] = useState(initial?.destination || "");
  const [dateFrom, setDateFrom] = useState(initial?.dateFrom || "");
  const [dateTo, setDateTo] = useState(initial?.dateTo || "");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [bestMemory, setBestMemory] = useState(initial?.bestMemory || "");
  const [mood, setMood] = useState(initial?.mood || 0);
  const [expenses, setExpenses] = useState<JournalExpense[]>(
    initial?.expenses?.length ? initial.expenses : [{ item: "", amount: 0, category: "Food" }]
  );
  const [visitedPlaces, setVisitedPlaces] = useState<string[]>(initial?.visitedPlaces || []);

  const selectedDest = destinations.find((d) => d.name === destination);

  const attractionNames = useMemo(() => {
    if (!selectedDest) return [];
    return [
      ...selectedDest.nearbyAttractions.map((a) => a.name),
      ...selectedDest.KuboVista.map((h) => h.name),
      ...selectedDest.viewpoints.map((v) => v.name),
    ];
  }, [selectedDest]);

  const togglePlace = (name: string) => {
    setVisitedPlaces((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const addExpense = () => {
    setExpenses((prev) => [...prev, { item: "", amount: 0, category: "Food" }]);
  };

  const removeExpense = (idx: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateExpense = (idx: number, field: keyof JournalExpense, val: string | number) => {
    setExpenses((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName.trim() || !destination || !dateFrom || !dateTo) return;
    const entry: JournalEntry = {
      id: initial?.id || generateId(),
      tripName: tripName.trim(),
      destination,
      dateFrom,
      dateTo,
      coverPhoto: selectedDest?.heroImage || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      photos: [],
      notes,
      expenses: expenses.filter((ex) => ex.item.trim() && ex.amount > 0),
      visitedPlaces,
      mood,
      bestMemory: bestMemory.trim(),
      createdAt: initial?.createdAt || new Date().toISOString(),
    };
    onSave(entry);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-lg"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">
          {initial ? "Edit Entry" : "New Travel Entry"}
        </h3>
        <button onClick={onCancel} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Trip Name</label>
            <input
              required
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g. Weekend in Kalimpong"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Destination</label>
            <select
              required
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setVisitedPlaces([]);
              }}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">From</label>
            <input
              required
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To</label>
            <input
              required
              type="date"
              value={dateTo}
              min={dateFrom}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Write about your experiences, people you met, funny moments..."
            className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Expenses</label>
          <div className="space-y-2">
            {expenses.map((exp, idx) => (
              <div key={idx} className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
                <input
                  value={exp.item}
                  onChange={(e) => updateExpense(idx, "item", e.target.value)}
                  placeholder="Item"
                  className="h-9 flex-1 rounded-md border border-border bg-card px-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/40"
                />
                <div className="flex items-center gap-1 rounded-md border border-border bg-card px-2">
                  <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="number"
                    min={0}
                    value={exp.amount || ""}
                    onChange={(e) => updateExpense(idx, "amount", Number(e.target.value))}
                    placeholder="0"
                    className="h-9 w-20 bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
                <select
                  value={exp.category}
                  onChange={(e) => updateExpense(idx, "category", e.target.value as ExpenseCategory)}
                  className="h-9 rounded-md border border-border bg-card px-2 text-sm text-foreground outline-none"
                >
                  {(["Food", "Stay", "Transport", "Shopping", "Other"] as ExpenseCategory[]).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeExpense(idx)}
                  className="rounded-md p-1.5 text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addExpense}>
            <Plus className="mr-1 h-4 w-4" /> Add Expense
          </Button>
        </div>

        {attractionNames.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Visited Places</label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {attractionNames.map((name) => {
                const checked = visitedPlaces.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => togglePlace(name)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      checked
                        ? "border-accent/40 bg-accent/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {checked ? <CheckSquare className="h-4 w-4 text-accent" /> : <Square className="h-4 w-4" />}
                    <span className="line-clamp-1">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Mood Rating</label>
          <StarInput value={mood} onChange={setMood} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Best Memory</label>
          <input
            value={bestMemory}
            onChange={(e) => setBestMemory(e.target.value)}
            placeholder="One highlight from this trip..."
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" size="md">
            <Save className="mr-1.5 h-4 w-4" />
            {initial ? "Update Entry" : "Save Entry"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

/* ─── Entry Card ─── */
function EntryCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry;
  onEdit: (e: JournalEntry) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const totalExpenses = entry.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <Card className="overflow-hidden border-0 bg-card shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={entry.coverPhoto}
          alt={entry.tripName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{entry.tripName}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {entry.destination}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {entry.dateFrom} → {entry.dateTo}
            </span>
          </div>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          <Badge variant="outline" className="border-white/20 bg-black/30 text-white backdrop-blur-sm">
            <Camera className="mr-1 h-3 w-3" />
            {entry.photos.length || 0}
          </Badge>
          {entry.mood > 0 && (
            <Badge variant="outline" className="border-white/20 bg-black/30 text-accent-gold backdrop-blur-sm">
              <Star className="mr-1 h-3 w-3 fill-accent-gold" />
              {entry.mood}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-medium text-foreground">
              <IndianRupee className="h-4 w-4 text-accent" />
              {totalExpenses.toLocaleString("en-IN")}
            </span>
            {entry.visitedPlaces.length > 0 && (
              <Badge variant="ghost" className="text-xs">
                {entry.visitedPlaces.length} places visited
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(entry)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {entry.notes && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Notes</h4>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{entry.notes}</p>
                  </div>
                )}

                {entry.expenses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Expenses</h4>
                    <div className="mt-2 space-y-1.5">
                      {entry.expenses.map((ex, i) => (
                        <div key={i} className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] ${categoryColors[ex.category]}`}>
                              {ex.category}
                            </Badge>
                            <span className="text-foreground">{ex.item}</span>
                          </div>
                          <span className="font-medium text-foreground">₹{ex.amount.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between px-3 pt-1 text-sm font-semibold text-foreground">
                        <span>Total</span>
                        <span className="text-accent">₹{totalExpenses.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {entry.visitedPlaces.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Visited Places</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.visitedPlaces.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">
                          <CheckSquare className="mr-1 h-3 w-3" />
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {entry.bestMemory && (
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                    <h4 className="text-sm font-semibold text-accent-gold">Best Memory</h4>
                    <p className="mt-1 text-sm text-foreground">{entry.bestMemory}</p>
                  </div>
                )}

                {/* Simulated Photos Grid */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Photos</h4>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-center"
                      >
                        <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
                          <ImageIcon className="h-5 w-5" />
                          <span className="text-[10px]">Upload coming soon</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </Card>
  );
}

/* ─── Stats ─── */
function Stats({ entries }: { entries: JournalEntry[] }) {
  const stats = useMemo(() => {
    const totalTrips = entries.length;
    const totalPhotos = entries.reduce((s, e) => s + (e.photos.length || 0), 0) + entries.length * 3; // simulated
    const totalExpenses = entries.reduce((s, e) => s + e.expenses.reduce((es, ex) => es + ex.amount, 0), 0);
    const destCounts: Record<string, number> = {};
    entries.forEach((e) => {
      destCounts[e.destination] = (destCounts[e.destination] || 0) + 1;
    });
    const mostVisited = Object.entries(destCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    const avgMood = entries.length
      ? (entries.reduce((s, e) => s + e.mood, 0) / entries.filter((e) => e.mood > 0).length || 1).toFixed(1)
      : "—";
    return { totalTrips, totalPhotos, totalExpenses, mostVisited, avgMood };
  }, [entries]);

  const items = [
    { label: "Trips", value: stats.totalTrips, icon: Compass },
    { label: "Photos", value: stats.totalPhotos, icon: Camera },
    { label: "Expenses", value: `₹${stats.totalExpenses.toLocaleString("en-IN")}`, icon: IndianRupee },
    { label: "Most Visited", value: stats.mostVisited, icon: MapPin },
    { label: "Avg Mood", value: stats.avgMood, icon: Smile },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <s.icon className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-foreground">{s.value}</span>
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEntries(loadEntries());
  }, []);

  const handleSave = (entry: JournalEntry) => {
    setEntries((prev) => {
      const exists = prev.find((e) => e.id === entry.id);
      const next = exists ? prev.map((e) => (e.id === entry.id ? entry : e)) : [entry, ...prev];
      saveEntries(next);
      return next;
    });
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this journal entry?")) return;
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  };

  const sorted = useMemo(() => [...entries].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)), [entries]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-20">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Travel Journal</h1>
              <p className="mt-2 text-lg text-primary-foreground/80">Capture memories from every journey</p>
            </div>
            <Button variant="accent" size="md" onClick={() => { setEditing(null); setShowForm(true); }}>
              <Plus className="mr-1.5 h-4 w-4" />
              New Entry
            </Button>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Stats */}
        {entries.length > 0 && (
          <div className="mb-10">
            <Stats entries={entries} />
          </div>
        )}

        {/* Form */}
        <AnimatePresence>
          {(showForm || editing) && (
            <div className="mb-10">
              <EntryForm
                initial={editing || undefined}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditing(null); }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Entries */}
        {entries.length === 0 ? (
          <EmptyState onCreate={() => { setEditing(null); setShowForm(true); }} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sorted.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <EntryCard
                    entry={entry}
                    onEdit={(e) => { setEditing(e); setShowForm(true); }}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Container>
    </div>
  );
}
