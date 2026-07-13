"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  X,
  LayoutGrid,
  Eye,
  Trash2,
  MapPin,
  Heart,
  ArrowLeft,
  ImageIcon,
  CheckCircle2,
  Compass,
  Droplets,
  Mountain,
  Leaf,
  Camera,
  Wallet,
  Crown,
  Citrus,
} from "lucide-react";

import { destinations } from "@/lib/data";
import type { Destination } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  destinationIds: string[];
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/*  Default collections factory                                        */
/* ------------------------------------------------------------------ */

const parseAltitude = (alt: string): number => {
  const num = parseFloat(alt.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
};

const makeDefaultCollections = (): Collection[] => {
  const find = (slug: string) => destinations.find((d) => d.slug === slug)?.id;

  return [
    {
      id: "col-waterfalls",
      name: "Hidden Waterfalls",
      description: "Destinations with breathtaking waterfall attractions",
      coverImage:
        destinations.find((d) => d.slug === "kolakham")?.heroImage ?? "",
      destinationIds: [
        find("kolakham")!,
        find("ahaldhara")!,
        find("samsing")!,
      ].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-weekend",
      name: "Weekend Escapes",
      description: "Quick getaways within 3 hours of Siliguri",
      coverImage:
        destinations.find((d) => d.slug === "mirik")?.heroImage ?? "",
      destinationIds: [
        find("mirik")!,
        find("kalimpong")!,
        find("ramdhura")!,
        find("sittong")!,
      ].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-snow",
      name: "Snow Destinations",
      description: "High altitude gems above 1,800m",
      coverImage:
        destinations.find((d) => d.slug === "pelling")?.heroImage ?? "",
      destinationIds: destinations
        .filter((d) => parseAltitude(d.altitude) > 1800)
        .map((d) => d.id),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-tea",
      name: "Tea Gardens",
      description: "Walk through the finest tea estates",
      coverImage:
        destinations.find((d) => d.slug === "lebong")?.heroImage ?? "",
      destinationIds: [
        find("lebong")!,
        find("peshok")!,
        find("samsing")!,
        find("mirik")!,
      ].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-photo",
      name: "Photography Spots",
      description: "Frame-worthy locations for shutterbugs",
      coverImage:
        destinations.find((d) => d.slug === "chatakpur")?.heroImage ?? "",
      destinationIds: destinations
        .filter((d) => d.tags.includes("photography"))
        .map((d) => d.id),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-budget",
      name: "Budget Trips",
      description: "Backpacker-friendly adventures",
      coverImage:
        destinations.find((d) => d.slug === "rishikhola")?.heroImage ?? "",
      destinationIds: [
        find("rishikhola")!,
        find("bijanbari")!,
        find("kolbong")!,
        find("ahaldhara")!,
      ].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-luxury",
      name: "Luxury Stays",
      description: "Premium hotels and resorts",
      coverImage:
        destinations.find((d) => d.slug === "pelling")?.heroImage ?? "",
      destinationIds: [find("pelling")!, find("kalimpong")!].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
    {
      id: "col-orange",
      name: "Orange Orchards",
      description: "The fragrant orange villages of Bengal",
      coverImage:
        destinations.find((d) => d.slug === "sittong")?.heroImage ?? "",
      destinationIds: [find("sittong")!, find("ahaldhara")!].filter(Boolean),
      createdAt: new Date().toISOString(),
    },
  ];
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "kv-collections";

const loadCollections = (): Collection[] | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
};

const saveCollections = (cols: Collection[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
};

const iconMap: Record<string, React.ReactNode> = {
  "Hidden Waterfalls": <Droplets className="h-4 w-4" />,
  "Weekend Escapes": <Compass className="h-4 w-4" />,
  "Snow Destinations": <Mountain className="h-4 w-4" />,
  "Tea Gardens": <Leaf className="h-4 w-4" />,
  "Photography Spots": <Camera className="h-4 w-4" />,
  "Budget Trips": <Wallet className="h-4 w-4" />,
  "Luxury Stays": <Crown className="h-4 w-4" />,
  "Orange Orchards": <Citrus className="h-4 w-4" />,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CollectionsPage() {
  const [mounted, setMounted] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  /* init */
  useEffect(() => {
    const saved = loadCollections();
    if (saved && saved.length > 0) {
      setCollections(saved);
    } else {
      const defaults = makeDefaultCollections();
      setCollections(defaults);
      saveCollections(defaults);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCollections(collections);
  }, [collections, mounted]);

  /* derived */
  const detailCollection = useMemo(
    () => collections.find((c) => c.id === detailId) || null,
    [collections, detailId]
  );

  const getDestinations = (ids: string[]): Destination[] =>
    ids
      .map((id) => destinations.find((d) => d.id === id))
      .filter(Boolean) as Destination[];

  /* actions */
  const createCollection = useCallback(
    (name: string, description: string, coverImage: string) => {
      const col: Collection = {
        id: `col-${Date.now()}`,
        name,
        description,
        coverImage,
        destinationIds: [],
        createdAt: new Date().toISOString(),
      };
      setCollections((prev) => [col, ...prev]);
      setCreateOpen(false);
    },
    []
  );

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    setDetailId(null);
  }, []);

  const removeDestination = useCallback((colId: string, destId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === colId
          ? { ...c, destinationIds: c.destinationIds.filter((d) => d !== destId) }
          : c
      )
    );
  }, []);

  const addDestination = useCallback((colId: string, destId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === colId && !c.destinationIds.includes(destId)
          ? { ...c, destinationIds: [...c.destinationIds, destId] }
          : c
      )
    );
  }, []);

  const cloneDefaults = useCallback(() => {
    const defs = makeDefaultCollections();
    setCollections((prev) => {
      const existing = new Set(prev.map((c) => c.name));
      const toAdd = defs.filter((d) => !existing.has(d.name));
      return [...toAdd, ...prev];
    });
  }, []);

  /* empty state */
  const isEmpty = collections.length === 0;

  return (
    <div className="min-h-full">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              My Travel Collections
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl">
              Organize your dream trips into beautiful boards
            </p>
            <div className="mt-8">
              <Button
                variant="accent"
                size="md"
                onClick={() => setCreateOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Collection
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <Container>
          {!mounted ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <LayoutGrid className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Start building your travel boards
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Create collections to organize destinations by theme, mood, or
                trip plan.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => setCreateOpen(true)} variant="primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Collection
                </Button>
                <Button onClick={cloneDefaults} variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Add Suggested Collections
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Masonry Grid */}
              <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
                <AnimatePresence mode="popLayout">
                  {collections.map((col, idx) => {
                    const dests = getDestinations(col.destinationIds);
                    const cover =
                      col.coverImage || dests[0]?.heroImage || "";
                    return (
                      <motion.div
                        key={col.id}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.06,
                          ease: "easeOut",
                        }}
                        className="break-inside-avoid"
                      >
                        <Card
                          hoverLift
                          className="group relative cursor-pointer overflow-hidden"
                          onClick={() => setDetailId(col.id)}
                        >
                          {/* Cover */}
                          <div className="relative h-56 w-full overflow-hidden">
                            {cover ? (
                              <Image
                                src={cover}
                                alt={col.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="flex items-center gap-2 text-white/90">
                                {iconMap[col.name] ?? (
                                  <LayoutGrid className="h-4 w-4" />
                                )}
                                <h3 className="text-lg font-semibold">
                                  {col.name}
                                </h3>
                              </div>
                              <p className="mt-1 text-sm text-white/70">
                                {dests.length} destination
                                {dests.length !== 1 ? "s" : ""}
                              </p>
                              {/* Preview names on hover */}
                              <div className="mt-2 hidden flex-wrap gap-1 group-hover:flex">
                                {dests.slice(0, 4).map((d) => (
                                  <span
                                    key={d.id}
                                    className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
                                  >
                                    <MapPin className="h-3 w-3" />
                                    {d.name}
                                  </span>
                                ))}
                                {dests.length > 4 && (
                                  <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                                    +{dests.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between p-4">
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {col.description}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetailId(col.id);
                              }}
                            >
                              <Eye className="mr-1 h-3.5 w-3.5" />
                              View
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Detail View Modal */}
      <AnimatePresence>
        {detailCollection && (
          <DetailModal
            collection={detailCollection}
            destinations={getDestinations(detailCollection.destinationIds)}
            allDestinations={destinations}
            onClose={() => setDetailId(null)}
            onDelete={() => deleteCollection(detailCollection.id)}
            onRemoveDest={(destId) =>
              removeDestination(detailCollection.id, destId)
            }
            onAddDest={(destId) =>
              addDestination(detailCollection.id, destId)
            }
          />
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {createOpen && (
          <CreateModal
            allDestinations={destinations}
            onClose={() => setCreateOpen(false)}
            onCreate={createCollection}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Modal                                                       */
/* ------------------------------------------------------------------ */

function DetailModal({
  collection,
  destinations: dests,
  allDestinations,
  onClose,
  onDelete,
  onRemoveDest,
  onAddDest,
}: {
  collection: Collection;
  destinations: Destination[];
  allDestinations: Destination[];
  onClose: () => void;
  onDelete: () => void;
  onRemoveDest: (id: string) => void;
  onAddDest: (id: string) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const available = allDestinations.filter(
    (d) => !collection.destinationIds.includes(d.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10 sm:items-center sm:pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <button
              onClick={onClose}
              className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to collections
            </button>
            <h2 className="text-2xl font-bold text-foreground">
              {collection.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {collection.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Destination Grid inside collection */}
        {dests.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-12 text-center">
            <MapPin className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No destinations yet. Add some to get started!
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {dests.map((d) => (
              <motion.div
                key={d.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Card className="flex flex-col overflow-hidden">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={d.heroImage}
                      alt={d.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge variant="primary">{d.state}</Badge>
                    </div>
                    <button
                      onClick={() => onRemoveDest(d.id)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-danger"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-semibold text-foreground">
                      {d.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {d.tagline}
                    </p>
                    <div className="mt-auto pt-3">
                      <Link href={`/destinations/${d.slug}`}>
                        <Button size="sm" variant="ghost" className="w-full">
                          <Eye className="mr-1 h-3.5 w-3.5" />
                          View Destination
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {available.length > 0 && (
              <div className="relative">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setAddOpen((p) => !p)}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add Destination
                </Button>
                <AnimatePresence>
                  {addOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-xl"
                    >
                      <div className="max-h-60 overflow-y-auto space-y-1">
                        {available.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => {
                              onAddDest(d.id);
                              setAddOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                          >
                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={d.heroImage}
                                alt={d.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                            <span className="truncate">{d.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!confirmDelete ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete Collection
              </Button>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2">
                <span className="text-xs text-danger">Are you sure?</span>
                <button
                  onClick={onDelete}
                  className="text-xs font-medium text-danger hover:underline"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Create Modal                                                       */
/* ------------------------------------------------------------------ */

function CreateModal({
  allDestinations,
  onClose,
  onCreate,
}: {
  allDestinations: Destination[];
  onClose: () => void;
  onCreate: (name: string, description: string, coverImage: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverId, setCoverId] = useState("");

  const canSubmit = name.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const dest = allDestinations.find((d) => d.id === coverId);
    onCreate(name.trim(), description.trim(), dest?.heroImage || "");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Create Collection
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Monsoon Treks"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this collection about?"
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Cover Image
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {allDestinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setCoverId(d.id)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    coverId === d.id
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <Image
                    src={d.heroImage}
                    alt={d.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                  {coverId === d.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!canSubmit}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Create
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
