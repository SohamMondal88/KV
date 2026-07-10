"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  ArrowRight,
} from "lucide-react";
import {
  ParallaxLayer,
  TextReveal,
  CountUp,
  IconMorph,
  HoverGlow,
  FadeInSection,
} from "@/components/animations/MicroInteractions";

export default function AboutPage() {
  const valueCards = [
    {
      icon: MapPin,
      hoverIcon: ArrowRight,
      title: "Local Expertise",
      description:
        "Our team lives and breathes the Himalayas. Every recommendation comes from first-hand experience and deep local relationships.",
    },
    {
      icon: Heart,
      hoverIcon: ArrowRight,
      title: "Authentic Experiences",
      description:
        "We go beyond sightseeing. Stay in village homes, share meals with families, and participate in age-old traditions.",
    },
    {
      icon: Leaf,
      hoverIcon: ArrowRight,
      title: "Sustainable Tourism",
      description:
        "We are committed to low-impact travel. Our partnerships fund conservation and empower communities directly.",
    },
    {
      icon: ShieldCheck,
      hoverIcon: ArrowRight,
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
            <TextReveal>Our Story</TextReveal>
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
      <ParallaxLayer speed={0.15}>
        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                title={<TextReveal>Our Mission</TextReveal>}
                subtitle="To make the hidden corners of the Himalayas accessible, sustainable, and unforgettable — one traveler at a time."
              />
              <p className="mt-6 text-muted-foreground">
                We believe the best travel stories are found where the roads end. Our mission is to connect
                conscious travelers with offbeat destinations while preserving their natural and cultural heritage.
              </p>
            </div>
          </Container>
        </section>
      </ParallaxLayer>

      {/* Why KuboVista */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container>
          <SectionHeading
            title={<TextReveal>Why KuboVista?</TextReveal>}
            subtitle="Four pillars that define everything we do."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((vc, i) => (
              <FadeInSection key={vc.title} delay={i * 0.1} direction="up">
                <HoverGlow glowColor="rgba(246,196,83,0.15)" glowSize={100}>
                  <Card className="flex h-full flex-col p-6 group">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <IconMorph
                        icon={<vc.icon className="h-5 w-5" />}
                        hoverIcon={<vc.hoverIcon className="h-5 w-5" />}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{vc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {vc.description}
                    </p>
                  </Card>
                </HoverGlow>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <ParallaxLayer speed={0.2}>
        <section className="py-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <FadeInSection key={s.label} delay={i * 0.1} direction="up">
                  <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
                    <s.icon className="h-8 w-8 text-primary" />
                    <span className="mt-4 text-3xl font-extrabold text-foreground">
                      <CountUp target={s.value} suffix={s.suffix} duration={2} />
                    </span>
                    <span className="mt-1 text-sm font-medium text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </Container>
        </section>
      </ParallaxLayer>

      {/* Team */}
      <ParallaxLayer speed={-0.1}>
        <section className="border-t border-border bg-muted/40 py-16">
          <Container>
            <SectionHeading
              title={<TextReveal>Meet the Team</TextReveal>}
              subtitle="The people behind your Himalayan adventures."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <FadeInSection key={member.name} delay={i * 0.1} direction="up">
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
                </FadeInSection>
              ))}
            </div>
          </Container>
        </section>
      </ParallaxLayer>

      {/* Our Values */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title={<TextReveal>Our Values</TextReveal>}
            subtitle="Principles that guide every decision we make."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <FadeInSection key={v.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
