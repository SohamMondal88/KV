"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Camera,
  Bird,
  Mountain,
  CreditCard,
  Shield,
  Check,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const guides = [
  {
    id: "g1",
    name: "Pemba Sherpa",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    experience: 12,
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["Trekking", "Culture"],
    rating: 4.9,
    reviews: 87,
    pricePerDay: 1200,
    bio: "Born in the hills of Kalimpong, Pemba has led over 500 treks across the Eastern Himalayas.",
  },
  {
    id: "g2",
    name: "Doma Bhutia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    experience: 8,
    languages: ["English", "Sikkimese", "Nepali"],
    specialties: ["Photography", "Wildlife"],
    rating: 4.8,
    reviews: 56,
    pricePerDay: 1500,
    bio: "A wildlife photographer turned guide, Doma knows every hidden viewpoint in Sikkim.",
  },
  {
    id: "g3",
    name: "Roshan Gurung",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    experience: 15,
    languages: ["English", "Nepali", "Hindi", "Bengali"],
    specialties: ["Trekking", "Birdwatching", "History"],
    rating: 4.7,
    reviews: 124,
    pricePerDay: 1000,
    bio: "Former mountaineering instructor with deep knowledge of local flora and fauna.",
  },
  {
    id: "g4",
    name: "Tshering Lepcha",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    experience: 6,
    languages: ["English", "Lepcha", "Nepali"],
    specialties: ["Culture", "Photography"],
    rating: 5.0,
    reviews: 34,
    pricePerDay: 1800,
    bio: "Passionate about preserving Lepcha heritage and sharing hidden cultural gems.",
  },
];

const destinations = [
  "Kalimpong", "Pabong", "Lebong", "Ramdhura", "Mirik", "Lamahatta",
  "Lepchajagat", "Chatakpur", "Samsing", "Sittong", "Bijanbari",
  "Ahaldhara", "Kolbong", "Kolakham", "Peshok", "Rishikhola", "Pelling",
];

export default function BookGuidePage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedGuide, setSelectedGuide] = useState(guides[0].id);
  const [destination, setDestination] = useState("Kalimpong");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(2);
  const [groupSize, setGroupSize] = useState(4);
  const [difficulty, setDifficulty] = useState("Moderate");
  const [interests, setInterests] = useState("");

  const guide = guides.find((g) => g.id === selectedGuide)!;
  const guideCost = guide.pricePerDay * duration;
  const gst = guideCost * 0.05;
  const total = guideCost + gst;

  const handleAddToCart = () => {
    if (!date) return;
    addToCart({
      type: "guide",
      name: `Guide: ${guide.name} (${destination})`,
      image: guide.image,
      location: destination,
      date,
      guests: groupSize,
      pricePerUnit: Math.round(total),
      quantity: 1,
      duration: `${duration} days`,
      details: `Specialties: ${guide.specialties.join(", ")}. Interests: ${interests}`,
    });
  };

  const handleBookNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" alt="Guide" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10 flex h-full flex-col justify-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold sm:text-4xl">Book a Local Mountain Guide</h1>
            <p className="mt-2 text-white/80">Experienced local guides who bring destinations to life</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
            {/* Guide Selection */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Select Your Guide</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {guides.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGuide(g.id)}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border p-4 text-left transition-all",
                      selectedGuide === g.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30"
                    )}
                  >
                    <Image src={g.image} alt={g.name} width={60} height={60} className="rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{g.name}</span>
                        <Badge variant="secondary">₹{g.pricePerDay}/day</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{g.experience} years • {g.languages.join(", ")}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {g.specialties.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span>{g.rating} ({g.reviews} reviews)</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Booking Form */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Trip Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Destination</label>
                  <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Start Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Duration (days)</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setDuration((d) => Math.max(1, d - 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">-</button>
                    <span className="w-8 text-center font-medium">{duration}</span>
                    <button onClick={() => setDuration((d) => Math.min(7, d + 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">+</button>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Group Size</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGroupSize((s) => Math.max(1, s - 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">-</button>
                    <span className="w-8 text-center font-medium">{groupSize}</span>
                    <button onClick={() => setGroupSize((s) => Math.min(15, s + 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">+</button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Trek Difficulty Preference</label>
                <div className="flex gap-2">
                  {["Easy", "Moderate", "Hard"].map((d) => (
                    <button key={d} onClick={() => setDifficulty(d)} className={cn("rounded-lg border px-4 py-2 text-sm transition-all", difficulty === d ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary/30")}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Special Interests</label>
                <textarea value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., Bird photography, monastery visits, offbeat trails..." className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" rows={2} />
              </div>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="sticky top-24 space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <Image src={guide.image} alt={guide.name} width={50} height={50} className="rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{guide.name}</p>
                    <p className="text-xs text-muted-foreground">{guide.experience} years experience</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guide fee ({duration} days)</span>
                    <span>₹{guideCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span>₹{gst.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button className="w-full" disabled={!date} onClick={handleBookNow}>
                    <CreditCard className="mr-2 h-4 w-4" /> Book Now
                  </Button>
                  <Button variant="outline" className="w-full" disabled={!date} onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Guide will contact you within 24 hours</span>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
