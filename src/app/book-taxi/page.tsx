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
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  ArrowRight,
  ArrowLeft,
  Shield,
  Phone,
  CreditCard,
  Info,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const destinations = [
  "Kalimpong", "Pabong", "Lebong", "Ramdhura", "Mirik", "Lamahatta",
  "Lepchajagat", "Chatakpur", "Samsing", "Sittong", "Bijanbari",
  "Ahaldhara", "Kolbong", "Kolakham", "Peshok", "Rishikhola", "Pelling",
];

const vehicleOptions = [
  { type: "Shared Jeep", price: 150, unit: "per person", icon: Car },
  { type: "Private SUV", price: 2500, unit: "per trip", icon: Car },
  { type: "Luxury Innova", price: 3500, unit: "per trip", icon: Car },
  { type: "Bike Rental", price: 600, unit: "per day", icon: Car },
];

const fareMatrix: Record<string, Record<string, number>> = {
  "Kalimpong": { "Pelling": 2500, "Darjeeling": 1500, "Mirik": 1200, "Sittong": 900, "Siliguri": 2500, "Gangtok": 2800 },
  "Pelling": { "Kalimpong": 2500, "Gangtok": 2200, "Yuksom": 1200, "Siliguri": 3500, "Darjeeling": 3000 },
  "Mirik": { "Kalimpong": 1200, "Darjeeling": 900, "Siliguri": 800, "Kurseong": 600 },
  "Sittong": { "Kalimpong": 900, "Darjeeling": 1400, "Siliguri": 1600, "Ahaldhara": 400 },
  "Lamahatta": { "Darjeeling": 800, "Kalimpong": 1000, "Takdah": 300, "Tinchuley": 400 },
  "Rishikhola": { "Samsing": 500, "Lava": 1000, "Kalimpong": 1500, "Siliguri": 1800 },
};

function getFare(from: string, to: string) {
  if (from === to) return 500;
  const f = fareMatrix[from]?.[to] ?? fareMatrix[to]?.[from];
  return f ?? 1200;
}

export default function BookTaxiPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("Private SUV");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState("Medium");
  const [instructions, setInstructions] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const baseFare = from && to ? getFare(from, to) : 0;
  const vehicleOpt = vehicleOptions.find((v) => v.type === vehicle)!;
  const multiplier = vehicle === "Shared Jeep" ? passengers : 1;
  const vehicleCost = vehicleOpt.price * multiplier;
  const estimatedFare = baseFare + vehicleCost;
  const gst = estimatedFare * 0.05;
  const total = estimatedFare + gst;

  const handleAddToCart = () => {
    if (!from || !to || !date) return;
    addToCart({
      type: "taxi",
      name: `${from} → ${to} (${vehicle})`,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
      location: `${from} to ${to}`,
      date,
      guests: passengers,
      pricePerUnit: Math.round(total),
      quantity: 1,
      duration: time || "Flexible",
      details: instructions,
    });
  };

  const handleBookNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop"
          alt="Mountain road"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10 flex h-full flex-col justify-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold sm:text-4xl">Book Your Mountain Taxi</h1>
            <p className="mt-2 text-white/80">Reliable local drivers who know every turn of the Himalayas</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                <h2 className="text-lg font-bold">Trip Details</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">From</label>
                  <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select pickup location</option>
                    {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">To</label>
                  <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select drop location</option>
                    {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Pickup Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Pickup Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium">Vehicle Type</label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {vehicleOptions.map((v) => {
                    const Icon = v.icon;
                    const selected = vehicle === v.type;
                    return (
                      <button
                        key={v.type}
                        onClick={() => setVehicle(v.type)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                          selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                        )}
                      >
                        <Icon className={cn("h-6 w-6", selected ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">{v.type}</span>
                        <span className="text-xs text-muted-foreground">₹{v.price} {v.unit}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Passengers</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPassengers((p) => Math.max(1, p - 1))} className="h-9 w-9 rounded-lg border border-border text-lg hover:bg-muted">-</button>
                    <span className="w-8 text-center font-medium">{passengers}</span>
                    <button onClick={() => setPassengers((p) => Math.min(10, p + 1))} className="h-9 w-9 rounded-lg border border-border text-lg hover:bg-muted">+</button>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Luggage</label>
                  <select value={luggage} onChange={(e) => setLuggage(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1 block text-sm font-medium">Special Instructions</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g., Need a baby seat, prefer morning departure..." className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" rows={3} />
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
                  <h2 className="text-lg font-bold">Contact Details</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Full Name *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Phone *</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="text-lg font-bold">Fare Estimate</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare ({from} → {to})</span>
                    <span>₹{baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle ({vehicle})</span>
                    <span>₹{vehicleCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span>₹{gst.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-base font-bold">
                    <span>Estimated Total</span>
                    <span className="text-primary">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button className="w-full" disabled={!from || !to || !date || !name || !phone} onClick={handleBookNow}>
                    <CreditCard className="mr-2 h-4 w-4" /> Book Now
                  </Button>
                  <Button variant="outline" className="w-full" disabled={!from || !to || !date} onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Verified drivers • Instant confirmation</span>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
