"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bell,
  Snowflake,
  CloudRain,
  Sun,
  Users,
  CalendarDays,
  MapPin,
  X,
  TrendingUp,
  AlertTriangle,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "weather" | "festival" | "crowd" | "road" | "deal" | "system";
  title: string;
  message: string;
  destination?: string;
  action?: { label: string; href: string };
  read: boolean;
  timestamp: string;
}

const STORAGE_KEY = "kv-notifications";
const LAST_SEEN_KEY = "kv-notifications-seen";

function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveNotifications(nots: Notification[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nots));
}

function generateDefaultNotifications(): Notification[] {
  return [
    {
      id: "notif-1",
      type: "weather",
      title: "Snow Expected in Sandakphu",
      message: "Heavy snowfall predicted tomorrow (Jan 15). If you're heading there, shift your trek by 2 days for safer conditions.",
      destination: "Sandakphu",
      action: { label: "View Trek", href: "/book-trek" },
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "notif-2",
      type: "festival",
      title: "Cherry Blossom Festival Starts Next Week",
      message: "Sittong and Ahaldhara will turn pink starting Nov 20. Perfect time for a weekend escape.",
      destination: "Sittong",
      action: { label: "Plan Trip", href: "/travel-planner" },
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "notif-3",
      type: "crowd",
      title: "Kalimpong is Crowded This Weekend",
      message: "Hotel occupancy at 85%. Consider nearby Ramdhura or Tinchuley for a quieter stay.",
      destination: "Kalimpong",
      action: { label: "Explore Alternatives", href: "/destinations" },
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "notif-4",
      type: "road",
      title: "Landslide Alert: Kalimpong–Pelling Route",
      message: "Road partially blocked near Jorethang. Add 90 mins to your journey. Check alternatives.",
      destination: "Pelling",
      action: { label: "Road Status", href: "/road-conditions" },
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
    {
      id: "notif-5",
      type: "deal",
      title: "Flash Sale: 30% Off Orange Village Retreat",
      message: "Sittong homestay packages slashed for this week only. Book before midnight.",
      destination: "Sittong",
      action: { label: "Book Now", href: "/packages" },
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: "notif-6",
      type: "system",
      title: "Your Trip Itinerary is Ready",
      message: "AI Trip Planner generated a 4-day Kolakham itinerary based on your preferences. Review and book.",
      action: { label: "View Itinerary", href: "/timeline" },
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ];
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let notifs = loadNotifications();
    if (notifs.length === 0) {
      notifs = generateDefaultNotifications();
      saveNotifications(notifs);
    }
    setNotifications(notifs);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveNotifications(notifications);
  }, [notifications, mounted]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notifications, unreadCount, markRead, markAllRead, dismiss, mounted };
}

/* ─── Navbar Bell Component ─── */
export function NotificationBell() {
  const { unreadCount, markRead, markAllRead, notifications, mounted } = useNotifications();
  const [open, setOpen] = useState(false);

  if (!mounted) return (
    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70">
      <Bell className="h-4 w-4" />
    </button>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-[#0B3D2E] p-3 shadow-2xl backdrop-blur-xl sm:w-96"
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-sm font-semibold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={() => { markAllRead(); }} className="text-xs text-[#F6C453] hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 space-y-1 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <NotificationRow key={n.id} notif={n} onClick={() => { markRead(n.id); setOpen(false); }} />
                ))}
                {notifications.length === 0 && (
                  <div className="py-6 text-center text-sm text-white/40">No notifications yet</div>
                )}
              </div>
              <Link href="/notifications" onClick={() => setOpen(false)}>
                <div className="mt-2 cursor-pointer rounded-lg py-2 text-center text-xs text-[#F6C453] hover:bg-white/5">
                  View all notifications →
                </div>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationRow({ notif, onClick }: { notif: Notification; onClick: () => void }) {
  const typeIcons: Record<string, React.ReactNode> = {
    weather: <Snowflake className="h-3.5 w-3.5 text-sky-300" />,
    festival: <CalendarDays className="h-3.5 w-3.5 text-pink-300" />,
    crowd: <Users className="h-3.5 w-3.5 text-amber-300" />,
    road: <AlertTriangle className="h-3.5 w-3.5 text-red-300" />,
    deal: <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />,
    system: <Sun className="h-3.5 w-3.5 text-yellow-300" />,
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-2 rounded-lg p-2.5 text-left transition-colors",
        notif.read ? "hover:bg-white/5" : "bg-white/5 hover:bg-white/10"
      )}
    >
      <div className="mt-0.5 shrink-0">{typeIcons[notif.type]}</div>
      <div className="min-w-0 flex-1">
        <p className={cn("text-xs font-medium", notif.read ? "text-white/60" : "text-white")}>
          {notif.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[11px] text-white/40">{notif.message}</p>
      </div>
      {!notif.read && <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F6C453]" />}
    </button>
  );
}

/* ─── Full Notifications Page ─── */
export default function NotificationsPage() {
  const { notifications, markRead, markAllRead, dismiss, mounted } = useNotifications();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Bell className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Notifications</h1>
            <p className="mt-2 text-white/60">Stay updated on weather, festivals, road alerts, and deals</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === "all" ? "border-[#F6C453]/50 bg-[#F6C453]/15 text-[#F6C453]" : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === "unread" ? "border-[#F6C453]/50 bg-[#F6C453]/15 text-[#F6C453]" : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              Unread
            </button>
          </div>
          <Button size="sm" variant="ghost" onClick={markAllRead}>Mark all read</Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((n) => (
              <NotificationCard key={n.id} notif={n} onRead={() => markRead(n.id)} onDismiss={() => dismiss(n.id)} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-white/40">No notifications to show.</div>
          )}
        </div>
      </Container>
    </div>
  );
}

function NotificationCard({ notif, onRead, onDismiss }: { notif: Notification; onRead: () => void; onDismiss: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const typeConfig: Record<Notification["type"], { color: string; icon: React.ReactNode }> = {
    weather: { color: "text-sky-300 bg-sky-500/10", icon: <Snowflake className="h-4 w-4" /> },
    festival: { color: "text-pink-300 bg-pink-500/10", icon: <CalendarDays className="h-4 w-4" /> },
    crowd: { color: "text-amber-300 bg-amber-500/10", icon: <Users className="h-4 w-4" /> },
    road: { color: "text-red-300 bg-red-500/10", icon: <AlertTriangle className="h-4 w-4" /> },
    deal: { color: "text-emerald-300 bg-emerald-500/10", icon: <TrendingUp className="h-4 w-4" /> },
    system: { color: "text-yellow-300 bg-yellow-500/10", icon: <Sun className="h-4 w-4" /> },
  };

  const cfg = typeConfig[notif.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card className={cn("overflow-hidden", !notif.read && "border-l-2 border-l-[#F6C453]")}>
        <div className="flex items-start gap-3 p-4">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", cfg.color)}>
            {cfg.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={cn("text-sm font-medium", notif.read ? "text-white/60" : "text-white")}>{notif.title}</p>
                <p className="mt-0.5 text-xs text-white/40">{notif.message}</p>
              </div>
              <button onClick={onDismiss} className="shrink-0 text-white/20 hover:text-white/60">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {notif.destination && (
                <Badge variant="outline" className="text-[10px]">
                  <MapPin className="mr-1 h-3 w-3" /> {notif.destination}
                </Badge>
              )}
              {notif.action && (
                <Link href={notif.action.href} onClick={onRead}>
                  <Badge className="cursor-pointer text-[10px] bg-[#F6C453]/15 text-[#F6C453] border-[#F6C453]/20 hover:bg-[#F6C453]/25">
                    {notif.action.label} <ChevronRight className="ml-1 h-3 w-3" />
                  </Badge>
                </Link>
              )}
              {!notif.read && (
                <button onClick={onRead} className="text-[10px] text-white/30 hover:text-[#F6C453]">
                  Mark read
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
