"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Users,
  MapPin,
  CalendarDays,
  MessageCircle,
  Plus,
  X,
  Search,
  Compass,
  Mountain,
  Camera,
  Flame,
  Heart,
  Send,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface TravelGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  destination: string;
  date: string;
  maxMembers: number;
  members: Member[];
  tags: string[];
  createdBy: string;
  messages: Message[];
}

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

/* ─── Demo Data ─── */
const demoGroups: TravelGroup[] = [
  {
    id: "grp-1",
    name: "Sandakphu Trek Jan 2026",
    description: "4-day trek to the Sleeping Buddha viewpoint. Looking for 3 more trekkers to share guide costs.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    destination: "Sandakphu",
    date: "Jan 15–18, 2026",
    maxMembers: 6,
    members: [
      { id: "u1", name: "Rahul", avatar: "" },
      { id: "u2", name: "Priya", avatar: "" },
    ],
    tags: ["trekking", "high-altitude", "photography"],
    createdBy: "Rahul",
    messages: [
      { id: "m1", senderId: "u1", senderName: "Rahul", text: "Anyone bringing a tent?", timestamp: "2h ago" },
      { id: "m2", senderId: "u2", senderName: "Priya", text: "I have a 2-person tent we can share.", timestamp: "1h ago" },
    ],
  },
  {
    id: "grp-2",
    name: "Sittong Orange Weekend",
    description: "Weekend escape to the orange village. Plan is orchard walks, campfire, and lots of photography.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    destination: "Sittong",
    date: "Dec 20–22, 2025",
    maxMembers: 8,
    members: [
      { id: "u3", name: "Arjun", avatar: "" },
      { id: "u4", name: "Meera", avatar: "" },
      { id: "u5", name: "Soham", avatar: "" },
    ],
    tags: ["weekend", "photography", "food"],
    createdBy: "Arjun",
    messages: [
      { id: "m3", senderId: "u3", senderName: "Arjun", text: "Should we book the Orange Grove Camp?", timestamp: "5h ago" },
    ],
  },
  {
    id: "grp-3",
    name: "Kalimpong–Pelling Road Trip",
    description: "Self-drive road trip via Jorethang. Looking for 2 people with valid licenses to split fuel.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    destination: "Kalimpong → Pelling",
    date: "Feb 10–13, 2026",
    maxMembers: 4,
    members: [
      { id: "u6", name: "Dev", avatar: "" },
    ],
    tags: ["road-trip", "car", "explore"],
    createdBy: "Dev",
    messages: [],
  },
  {
    id: "grp-4",
    name: "Mirik Lake Retreat",
    description: "Relaxed lakeside weekend. Families and couples welcome. Boating, tea garden walks, and quiet evenings.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    destination: "Mirik",
    date: "Nov 28–30, 2025",
    maxMembers: 10,
    members: [
      { id: "u7", name: "Ananya", avatar: "" },
      { id: "u8", name: "Kunal", avatar: "" },
      { id: "u9", name: "Riya", avatar: "" },
      { id: "u10", name: "Vikram", avatar: "" },
    ],
    tags: ["family", "lake", "relax"],
    createdBy: "Ananya",
    messages: [
      { id: "m4", senderId: "u7", senderName: "Ananya", text: "Kids are excited for the boat ride!", timestamp: "1d ago" },
    ],
  },
  {
    id: "grp-5",
    name: "Chatakpur Birdwatching",
    description: "Early morning birding in the rhododendron forest. Bring binoculars and a field guide.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    destination: "Chatakpur",
    date: "Mar 5–7, 2026",
    maxMembers: 5,
    members: [
      { id: "u11", name: "Dr. Sen", avatar: "" },
      { id: "u12", name: "Tanya", avatar: "" },
    ],
    tags: ["birding", "nature", "early-morning"],
    createdBy: "Dr. Sen",
    messages: [],
  },
  {
    id: "grp-6",
    name: "Kolakham Kanchenjunga Photographers",
    description: "Photography group heading to Kolakham for sunrise shots of Kanchenjunga. DSLR/mirrorless preferred.",
    image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    destination: "Kolakham",
    date: "Dec 28–30, 2025",
    maxMembers: 6,
    members: [
      { id: "u13", name: "Rohan", avatar: "" },
      { id: "u14", name: "Isha", avatar: "" },
      { id: "u15", name: "Amit", avatar: "" },
    ],
    tags: ["photography", "sunrise", "mountains"],
    createdBy: "Rohan",
    messages: [
      { id: "m5", senderId: "u13", senderName: "Rohan", text: "Tripod is essential for the blue hour shots.", timestamp: "3h ago" },
    ],
  },
];

const tagIcons: Record<string, React.ReactNode> = {
  trekking: <Mountain className="h-3 w-3" />,
  photography: <Camera className="h-3 w-3" />,
  "road-trip": <Compass className="h-3 w-3" />,
  weekend: <CalendarDays className="h-3 w-3" />,
  family: <Users className="h-3 w-3" />,
  nature: <Flame className="h-3 w-3" />,
  sunrise: <Sun className="h-3 w-3" />,
};

const STORAGE_KEY = "kv-groups";

function loadGroups(): TravelGroup[] {
  if (typeof window === "undefined") return demoGroups;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return demoGroups;
}

function saveGroups(groups: TravelGroup[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

export default function CommunityPage() {
  const [groups, setGroups] = useState<TravelGroup[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<TravelGroup | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const g = loadGroups();
    setGroups(g);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveGroups(groups);
  }, [groups, mounted]);

  const filtered = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.destination.toLowerCase().includes(search.toLowerCase()) ||
      g.tags.some((t) => t.includes(search.toLowerCase()))
  );

  const joinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId && g.members.length < g.maxMembers
          ? { ...g, members: [...g.members, { id: `u-${Date.now()}`, name: "You", avatar: "" }] }
          : g
      )
    );
  };

  const sendMessage = (groupId: string, text: string) => {
    if (!text.trim()) return;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              messages: [
                ...g.messages,
                {
                  id: `m-${Date.now()}`,
                  senderId: "you",
                  senderName: "You",
                  text: text.trim(),
                  timestamp: "Just now",
                },
              ],
            }
          : g
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <section className="border-b border-white/10 py-12">
        <Container className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Users className="mx-auto mb-3 h-10 w-10 text-[#F6C453]" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Travel Community</h1>
            <p className="mx-auto mt-2 max-w-xl text-lg text-white/60">
              Join travel groups, find trip buddies, chat with fellow adventurers, and explore the Himalayas together.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-8">
        {/* Search + Create */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups by destination, tag, or name..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#F6C453]/30"
            />
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Group
          </Button>
        </div>

        {/* Groups Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hoverLift className="group cursor-pointer overflow-hidden" onClick={() => setSelectedGroup(group)}>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex gap-1">
                    {group.tags.map((tag) => (
                      <Badge key={tag} className="bg-black/50 text-white text-[10px] backdrop-blur-sm">
                        {tagIcons[tag] || <Compass className="h-3 w-3" />} <span className="ml-1">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white">{group.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/70">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {group.destination}</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {group.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((m) => (
                        <div key={m.id} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0B3D2E] bg-white/10 text-[10px] text-white">
                          {m.name[0]}
                        </div>
                      ))}
                      {group.members.length > 3 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0B3D2E] bg-white/10 text-[10px] text-white">
                          +{group.members.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-white/40">
                      {group.members.length}/{group.maxMembers} joined
                    </span>
                  </div>
                  <Badge className={cn(
                    "text-[10px]",
                    group.members.length < group.maxMembers
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  )}>
                    {group.members.length < group.maxMembers ? "Open" : "Full"}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/40">No groups match your search.</div>
        )}
      </Container>

      {/* Group Detail Modal */}
      <AnimatePresence>
        {selectedGroup && (
          <GroupDetailModal
            group={selectedGroup}
            onClose={() => setSelectedGroup(null)}
            onJoin={() => joinGroup(selectedGroup.id)}
            onSendMessage={(text) => sendMessage(selectedGroup.id, text)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GroupDetailModal({
  group,
  onClose,
  onJoin,
  onSendMessage,
}: {
  group: TravelGroup;
  onClose: () => void;
  onJoin: () => void;
  onSendMessage: (text: string) => void;
}) {
  const [msg, setMsg] = useState("");
  const isFull = group.members.length >= group.maxMembers;
  const isJoined = group.members.some((m) => m.name === "You");

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-8 sm:items-center sm:pt-0">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0B3D2E] shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative h-48 w-full">
          <Image src={group.image} alt={group.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5">
            <h2 className="text-xl font-bold text-white">{group.name}</h2>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <MapPin className="h-3 w-3" /> {group.destination} • {group.date}
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-white/60">{group.description}</p>

          {/* Members */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Members ({group.members.length}/{group.maxMembers})</p>
            <div className="flex flex-wrap gap-2">
              {group.members.map((m) => (
                <div key={m.id} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">{m.name[0]}</div>
                  {m.name}
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Group Chat</p>
            <div className="mb-3 max-h-48 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-3">
              {group.messages.length === 0 && (
                <p className="text-center text-xs text-white/30">No messages yet. Be the first!</p>
              )}
              {group.messages.map((m) => (
                <div key={m.id} className="text-sm">
                  <span className="font-medium text-[#F6C453]">{m.senderName}: </span>
                  <span className="text-white/70">{m.text}</span>
                  <span className="ml-1 text-[10px] text-white/20">{m.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { onSendMessage(msg); setMsg(""); }}}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#F6C453]/30"
              />
              <button
                onClick={() => { onSendMessage(msg); setMsg(""); }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F6C453]/15 text-[#F6C453] transition-colors hover:bg-[#F6C453]/25"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action */}
          <div className="mt-5 flex gap-3">
            {!isJoined ? (
              <button
                onClick={onJoin}
                disabled={isFull}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors",
                  isFull
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-[#F6C453] text-[#0B3D2E] hover:opacity-90"
                )}
              >
                {isFull ? "Group Full" : "Join Group"}
              </button>
            ) : (
              <div className="flex-1 rounded-full bg-emerald-500/10 py-2.5 text-center text-sm font-semibold text-emerald-400">
                ✓ You're in this group
              </div>
            )}
            <Link href={`/destinations`} className="flex-1">
              <button className="w-full rounded-full border border-white/20 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5">
                Explore Destination
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
