"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CounterAnimation } from "@/components/animations/GSAPScroll";
import {
  MapPin,
  Heart,
  Leaf,
  ShieldCheck,
  Users,
  Compass,
  Mountain,
  Building,
  Package,
} from "lucide-react";

export default function AboutPage() {
  const valueCards = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description:
        "Our team lives and breathes the Himalayas. Every recommendation comes from first-hand experience and deep local relationships.",
    },
    {
      icon: Heart,
      title: "Authentic Experiences",
      description:
        "We go beyond sightseeing. Stay in village homes, share meals with families, and participate in age-old traditions.",
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description:
        "We are committed to low-impact travel. Our partnerships fund conservation and empower communities directly.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Stays",
      description:
        "Every homestay and hotel is personally inspected. Clean, safe, and genuinely welcoming — guaranteed.",
    },
  ];

  const teamMembers = [
    {
      name: "Tenzing Norbu",
      role: "Founder & CEO",
      bio: "Born in the hills of Sikkim, Tenzing turned his passion for exploration into a mission to reveal hidden destinations.",
    },
    {
      name: "Ankita Sharma",
      role: "Head of Experiences",
      bio: "Ankita designs immersive itineraries that connect travelers with the soul of each destination.",
    },
    {
      name: "Rahul Basnet",
      role: "Operations Lead",
      bio: "Rahul ensures every trip runs like clockwork, from transport to the smallest homestay detail.",
    },
    {
      name: "Priya Limbu",
      role: "Community Manager",
      bio: "Priya bridges the gap between travelers and hosts, building a network of trusted local partners.",
    },
  ];

  const stats = [
    { icon: Compass, value: 17, suffix: "+", label: "Destinations" },
    { icon: Users, value: 12000, suffix: "+", label: "Happy Travelers" },
    { icon: Building, value: 340, suffix: "+", label: "Homestays" },
    { icon: Package, value: 85, suffix: "+", label: "Curated Packages" },
  ];

  const values = [
    {
      title: "Respect for Culture",
      text: "We honor the traditions of the communities we visit and educate travelers to do the same.",
    },
    {
      title: "Transparency",
      text: "No hidden fees, no surprise costs. What you see is what you pay — and where your money goes.",
    },
    {
      title: "Safety First",
      text: "From verified hosts to emergency protocols, your well-being is our highest priority.",
    },
    {
      title: "Community First",
      text: "A significant portion of every booking directly supports local families and conservation.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-forest py-24 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2000&auto=format&fit=crop"
            alt="Our story"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </div>
        <Container className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Born in the Himalayas, built for the curious traveler. KuboVista is redefining how India discovers its own mountains.
          </motion.p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title="Our Mission"
              subtitle="To make the hidden corners of the Himalayas accessible, sustainable, and unforgettable — one traveler at a time."
            />
            <p className="mt-6 text-muted-foreground">
              We believe the best travel stories are found where the roads end. Our mission is to connect
              conscious travelers with offbeat destinations while preserving their natural and cultural heritage.
            </p>
          </div>
        </Container>
      </section>

      {/* Why KuboVista */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container>
          <SectionHeading
            title="Why KuboVista?"
            subtitle="Four pillars that define everything we do."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((vc, i) => (
              <motion.div
                key={vc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <vc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{vc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {vc.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
              >
                <s.icon className="h-8 w-8 text-primary" />
                <span className="mt-4 text-3xl font-extrabold text-foreground">
                  <CounterAnimation target={s.value} suffix={s.suffix} duration={2} />
                </span>
                <span className="mt-1 text-sm font-medium text-muted-foreground">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container>
          <SectionHeading
            title="Meet the Team"
            subtitle="The people behind your Himalayan adventures."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex h-full flex-col p-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="Principles that guide every decision we make."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
