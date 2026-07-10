"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Waves,
  Wind,
  Mountain,
  TreePine,
  Tent,
  Camera,
  Footprints,
  Bike,
  Bird,
  CreditCard,
  Shield,
  Check,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const activities = [
  { id: "a1", name: "Paragliding", destination: "Kalimpong", image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop", difficulty: "Moderate", duration: "30 mins", price: 3000, category: "Air", icon: Wind, description: "Soar over the hills with stunning aerial views of the Himalayas." },
  { id: "a2", name: "Boating on Sumendu Lake", destination: "Mirik", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "1 hour", price: 300, category: "Water", icon: Waves, description: "Peaceful paddle boat rides surrounded by tea gardens." },
  { id: "a3", name: "Riverside Camping", destination: "Rishikhola", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "Overnight", price: 2000, category: "Land", icon: Tent, description: "Camp by the Rishi River with BBQ dinner and stargazing." },
  { id: "a4", name: "Horse Riding", destination: "Mirik", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "30 mins", price: 200, category: "Land", icon: Footprints, description: "Ride around the lake on well-trained mountain horses." },
  { id: "a5", name: "River Trekking", destination: "Bijanbari", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", difficulty: "Moderate", duration: "4 hours", price: 1000, category: "Water", icon: Waves, description: "Trek along the crystal clear Rangeet River through boulder fields." },
  { id: "a6", name: "Birdwatching Tour", destination: "Samsing", image: "https://images.unsplash.com/photo-1447752875215-b596d3c1e03a6?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "4 hours", price: 1000, category: "Land", icon: Bird, description: "Spot rare Himalayan birds in the Neora Valley forests." },
  { id: "a7", name: "Tea Garden Walk", destination: "Peshok", image: "https://images.unsplash.com/photo-1563911892437-1eda0179e1b?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "2 hours", price: 500, category: "Culture", icon: TreePine, description: "Guided walk through tea plantations with factory visit." },
  { id: "a8", name: "Forest Trek", destination: "Kolbong", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "3 hours", price: 600, category: "Land", icon: Mountain, description: "Trek through dense pine and dhupi forests." },
  { id: "a9", name: "Orchid Trail", destination: "Chatakpur", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "3 hours", price: 700, category: "Land", icon: TreePine, description: "Guided trek to spot rare Himalayan orchids." },
  { id: "a10", name: "Bamboo Craft Workshop", destination: "Sittong", image: "https://images.unsplash.com/photo-1447752875215-b596d3c1e03a6?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "3 hours", price: 800, category: "Culture", icon: Footprints, description: "Learn traditional bamboo weaving from local artisans." },
  { id: "a11", name: "Village Trek", destination: "Pabong", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", difficulty: "Moderate", duration: "5 hours", price: 1000, category: "Culture", icon: MapPin, description: "Trek through remote Lepcha villages and alpine meadows." },
  { id: "a12", name: "Photography Tour", destination: "Lepchajagat", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", difficulty: "Easy", duration: "4 hours", price: 600, category: "Land", icon: Camera, description: "Capture sunrise, landscapes, and village life with a local guide." },
];

const categories = ["All", "Water", "Air", "Land", "Culture"];
const difficulties = ["All", "Easy", "Moderate", "Hard"];

export default function BookActivityPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedActivity, setSelectedActivity] = useState("a1");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(2);
  const [timeSlot, setTimeSlot] = useState("Morning (6AM - 10AM)");
  const [requirements, setRequirements] = useState("");

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const catMatch = categoryFilter === "All" || a.category === categoryFilter;
      const diffMatch = difficultyFilter === "All" || a.difficulty === difficultyFilter;
      return catMatch && diffMatch;
    });
  }, [categoryFilter, difficultyFilter]);

  const activity = activities.find((a) => a.id === selectedActivity) || activities[0];
  const activityCost = activity.price * participants;
  const gst = activityCost * 0.05;
  const total = activityCost + gst;

  const handleAddToCart = () => {
    if (!date) return;
    addToCart({
      type: "activity",
      name: activity.name,
      image: activity.image,
      location: activity.destination,
      date,
      guests: participants,
      pricePerUnit: Math.round(total),
      quantity: 1,
      duration: activity.duration,
      details: `Time: ${timeSlot}. Category: ${activity.category}. ${requirements}`,
    });
  };

  const handleBookNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2000&auto=format&fit=crop" alt="Adventure" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10 flex h-full flex-col justify-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold sm:text-4xl">Adventure Awaits</h1>
            <p className="mt-2 text-white/80">Thrilling activities across the Himalayas for every adventurer</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Category</label>
                  <div className="flex flex-wrap gap-1">
                    {categories.map((c) => (
                      <button key={c} onClick={() => setCategoryFilter(c)} className={cn("rounded-md border px-3 py-1 text-xs transition-all", categoryFilter === c ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary/30")}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Difficulty</label>
                  <div className="flex flex-wrap gap-1">
                    {difficulties.map((d) => (
                      <button key={d} onClick={() => setDifficultyFilter(d)} className={cn("rounded-md border px-3 py-1 text-xs transition-all", difficultyFilter === d ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary/30")}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Activity Grid */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Select Activity ({filtered.length} available)</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedActivity(a.id)}
                      className={cn(
                        "relative overflow-hidden rounded-xl border text-left transition-all",
                        selectedActivity === a.id ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="relative h-28">
                        <Image src={a.image} alt={a.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <p className="font-bold text-white">{a.name}</p>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <Badge className={cn("absolute right-2 top-2 text-[10px]", a.difficulty === "Easy" ? "bg-success" : a.difficulty === "Hard" ? "bg-danger" : "bg-warning")}>
                          {a.difficulty}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground line-clamp-2">{a.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{a.destination} • {a.duration}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">₹{a.price}</span>
                            {selectedActivity === a.id && <Check className="h-4 w-4 text-success" />}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Form */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Booking Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Activity Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Time Slot</label>
                  <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Morning (6AM - 10AM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                    <option>Full Day</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Participants</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setParticipants((p) => Math.max(1, p - 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">-</button>
                    <span className="w-8 text-center font-medium">{participants}</span>
                    <button onClick={() => setParticipants((p) => Math.min(20, p + 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">+</button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Special Requirements</label>
                <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Any medical conditions, physical limitations, or special requests..." className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" rows={2} />
              </div>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="sticky top-24 space-y-4">
              <Card className="p-6">
                <h3 className="font-bold">{activity.name}</h3>
                <p className="text-sm text-muted-foreground">{activity.destination} • {activity.duration} • {activity.difficulty}</p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity fee ({participants} persons)</span>
                    <span>₹{activityCost}</span>
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
                  <span>Safety gear included • Certified instructors</span>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
