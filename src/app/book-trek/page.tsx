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
  Mountain,
  Calendar,
  Users,
  Footprints,
  Tent,
  Camera,
  CreditCard,
  Shield,
  Clock,
  MapPin,
  Check,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const treks = [
  {
    id: "t1",
    name: "Sandakphu Trek",
    destination: "Maneybhanjyang",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    duration: "4 Days",
    difficulty: "Hard",
    price: 4500,
    description: "The highest peak in West Bengal offering views of 4 of the 5 highest peaks in the world.",
    highlights: ["Sleeping Buddha view", "Rhododendron forests", "Sunrise at Sandakphu"],
  },
  {
    id: "t2",
    name: "Yuksom Heritage Trek",
    destination: "Pelling",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    duration: "1 Day",
    difficulty: "Easy",
    price: 2000,
    description: "Explore the first capital of Sikkim with ancient monasteries and coronation throne.",
    highlights: ["Dubdi Monastery", "Coronation Throne", "Norbugang Park"],
  },
  {
    id: "t3",
    name: "Lava-Lolaygaon Circuit",
    destination: "Lava",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days",
    difficulty: "Moderate",
    price: 3000,
    description: "Dense forest trek through Neora Valley with chances to spot red pandas.",
    highlights: ["Neora Valley", "Canopy Walk", "Birdwatching"],
  },
  {
    id: "t4",
    name: "Changey Falls Trek",
    destination: "Kolakham",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    duration: "1 Day",
    difficulty: "Moderate",
    price: 1200,
    description: "Trek through rhododendron forests to a beautiful waterfall with Kanchenjunga views.",
    highlights: ["Waterfall", "Rhododendron blooms", "Kanchenjunga viewpoint"],
  },
  {
    id: "t5",
    name: "Samthar Village Trek",
    destination: "Kalimpong",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    duration: "1 Day",
    difficulty: "Easy",
    price: 1500,
    description: "Gentle trek through tea gardens and remote villages with panoramic views.",
    highlights: ["Tea gardens", "Remote villages", "Rolling hills"],
  },
  {
    id: "t6",
    name: "Ramdhura Ridge Walk",
    destination: "Ramdhura",
    image: "https://images.unsplash.com/photo-1447752875215-b596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    duration: "1 Day",
    difficulty: "Easy",
    price: 800,
    description: "Scenic ridge walk connecting Sillery Gaon and Ramdhura with valley views.",
    highlights: ["Teesta River views", "Pine forests", "Birdwatching"],
  },
];

const equipmentOptions = [
  { id: "e1", name: "Trekking Poles", price: 200, unit: "pair/day" },
  { id: "e2", name: "Trekking Boots", price: 400, unit: "pair/day" },
  { id: "e3", name: "Day Backpack", price: 150, unit: "day" },
  { id: "e4", name: "Headlamp", price: 100, unit: "day" },
  { id: "e5", name: "Rain Poncho", price: 100, unit: "trip" },
];

export default function BookTrekPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedTrek, setSelectedTrek] = useState("t1");
  const [date, setDate] = useState("");
  const [trekkers, setTrekkers] = useState(2);
  const [experience, setExperience] = useState("Intermediate");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [guideRequired, setGuideRequired] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState("");

  const trek = treks.find((t) => t.id === selectedTrek)!;
  const trekCost = trek.price * trekkers;
  const equipmentCost = equipment.reduce((sum, eqId) => {
    const eq = equipmentOptions.find((e) => e.id === eqId);
    return sum + (eq ? eq.price * trekkers : 0);
  }, 0);
  const guideCost = guideRequired ? 1000 * trekkers : 0;
  const subtotal = trekCost + equipmentCost + guideCost;
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  const toggleEquipment = (id: string) => {
    setEquipment((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  };

  const handleAddToCart = () => {
    if (!date) return;
    addToCart({
      type: "trek",
      name: `Trek: ${trek.name}`,
      image: trek.image,
      location: trek.destination,
      date,
      guests: trekkers,
      pricePerUnit: Math.round(total),
      quantity: 1,
      duration: trek.duration,
      details: `Difficulty: ${trek.difficulty}. Guide: ${guideRequired ? "Yes" : "No"}. Equipment: ${equipment.map((e) => equipmentOptions.find((o) => o.id === e)?.name).join(", ") || "None"}`,
    });
  };

  const handleBookNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" alt="Trek" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10 flex h-full flex-col justify-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold sm:text-4xl">Book Your Himalayan Trek</h1>
            <p className="mt-2 text-white/80">From gentle walks to challenging summits — find your perfect trail</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
            {/* Trek Selection */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Select Your Trek</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {treks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrek(t.id)}
                    className={cn(
                      "relative overflow-hidden rounded-xl border text-left transition-all",
                      selectedTrek === t.id ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="relative h-32">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-xs text-white/80">{t.destination} • {t.duration}</p>
                      </div>
                      <Badge className={cn("absolute right-2 top-2", t.difficulty === "Easy" ? "bg-success" : t.difficulty === "Hard" ? "bg-danger" : "bg-warning")}>
                        {t.difficulty}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">{t.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold">₹{t.price}/person</span>
                        {selectedTrek === t.id && <Check className="h-4 w-4 text-success" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Form */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-bold">Trek Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Trek Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Number of Trekkers</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setTrekkers((t) => Math.max(1, t - 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">-</button>
                    <span className="w-8 text-center font-medium">{trekkers}</span>
                    <button onClick={() => setTrekkers((t) => Math.min(15, t + 1))} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Experience Level</label>
                <div className="flex gap-2">
                  {["Beginner", "Intermediate", "Expert"].map((e) => (
                    <button key={e} onClick={() => setExperience(e)} className={cn("rounded-lg border px-4 py-2 text-sm transition-all", experience === e ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary/30")}>{e}</button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium">Equipment Rental</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {equipmentOptions.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => toggleEquipment(eq.id)}
                      className={cn(
                        "flex items-center justify-between rounded-lg border p-3 text-sm transition-all",
                        equipment.includes(eq.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      )}
                    >
                      <span>{eq.name}</span>
                      <span className="text-muted-foreground">₹{eq.price}/{eq.unit}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="guide"
                  checked={guideRequired}
                  onChange={(e) => setGuideRequired(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary"
                />
                <label htmlFor="guide" className="text-sm">
                  Include certified mountain guide (₹1,000/trekker) — Recommended for safety
                </label>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Emergency Contact</label>
                <input value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} placeholder="Name and phone number" className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="sticky top-24 space-y-4">
              <Card className="p-6">
                <h3 className="font-bold">{trek.name}</h3>
                <p className="text-sm text-muted-foreground">{trek.destination} • {trek.duration} • {trek.difficulty}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {trek.highlights.map((h) => <Badge key={h} variant="outline" className="text-[10px]">{h}</Badge>)}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trek fee ({trekkers} trekkers)</span>
                    <span>₹{trekCost}</span>
                  </div>
                  {equipmentCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equipment rental</span>
                      <span>₹{equipmentCost}</span>
                    </div>
                  )}
                  {guideCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guide fee</span>
                      <span>₹{guideCost}</span>
                    </div>
                  )}
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
                  <span>Includes permit fees and safety equipment</span>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
