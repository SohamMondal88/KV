"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { destinations } from "@/lib/data";
import {
  Phone,
  MapPin,
  Hospital,
  Shield,
  Flame,
  AlertTriangle,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Stethoscope,
  Thermometer,
  Droplets,
  Bandage,
  Footprints,
  Mountain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const emergencyNumbers = [
  { label: "Ambulance", number: "108", icon: Stethoscope, color: "#EF4444" },
  { label: "Police", number: "100", icon: Shield, color: "#3B82F6" },
  { label: "Fire", number: "101", icon: Flame, color: "#F59E0B" },
  { label: "Disaster Mgmt", number: "1070", icon: AlertTriangle, color: "#DC2626" },
  { label: "Tourist Helpline", number: "1363", icon: Phone, color: "#10B981" },
  { label: "Women's Helpline", number: "181", icon: Heart, color: "#EC4899" },
];

const firstAid = [
  {
    title: "Altitude Sickness",
    icon: Mountain,
    symptoms: "Headache, nausea, dizziness, shortness of breath",
    actions: ["Rest immediately", "Drink plenty of water", "Descend if symptoms worsen", "Seek medical help if severe"],
  },
  {
    title: "Hypothermia",
    icon: Thermometer,
    symptoms: "Shivering, confusion, slurred speech, weak pulse",
    actions: ["Move to warm shelter", "Remove wet clothing", "Warm with blankets", "Drink warm liquids"],
  },
  {
    title: "Snake Bite",
    icon: AlertTriangle,
    symptoms: "Puncture marks, swelling, pain, nausea",
    actions: ["Keep victim calm and still", "Do not suck venom", "Do not apply tourniquet", "Rush to hospital immediately"],
  },
  {
    title: "Fracture / Sprain",
    icon: Footprints,
    symptoms: "Pain, swelling, inability to move, deformity",
    actions: ["Immobilize the area", "Apply ice pack", "Do not massage", "Seek medical attention"],
  },
  {
    title: "Cuts & Bleeding",
    icon: Bandage,
    symptoms: "Open wound, bleeding, pain",
    actions: ["Apply direct pressure", "Clean with antiseptic", "Cover with sterile bandage", "Elevate if possible"],
  },
];

const emergencyPhrases = [
  { nepali: "मलाई सहयोग चाहिन्छ", hindi: "मुझे मदद चाहिए", bengali: "আমাকে সাহায্য দরকার", english: "I need help" },
  { nepali: "हस्पिटल कहाँ छ?", hindi: "हस्पिटल कहाँ है?", bengali: "হাসপাতাল কোথায়?", english: "Where is the hospital?" },
  { nepali: "एम्बुलेन्स बोलाउनुहोस्", hindi: "एम्बुलेंस बुलाओ", bengali: "অ্যাম্বুলেন্স ডাকুন", english: "Call an ambulance" },
  { nepali: "म ठीक छैन", hindi: "मैं ठीक नहीं हूँ", bengali: "আমি ভালো নেই", english: "I am not okay" },
];

export default function EmergencyPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedAid, setExpandedAid] = useState<string | null>(null);
  const [selectedDest, setSelectedDest] = useState(destinations[0]);

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      {/* Warning Banner */}
      <div className="bg-red-500/10 border-b border-red-500/20 py-3">
        <Container className="flex items-center justify-center gap-2 text-center text-sm text-red-300">
          <AlertTriangle className="h-4 w-4" />
          <span>In life-threatening emergency, call <strong className="text-white">108</strong> (Ambulance) or <strong className="text-white">100</strong> (Police) immediately</span>
        </Container>
      </div>

      <Container className="py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Emergency Assistance</h1>
          <p className="mt-1 text-white/60">Help is just a call away — anywhere in the Himalayas</p>
        </div>

        {/* Quick Action Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {emergencyNumbers.map((em) => {
            const Icon = em.icon;
            return (
              <motion.button
                key={em.number}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyNumber(em.number)}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${em.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: em.color }} />
                </div>
                <span className="text-xs text-white/60">{em.label}</span>
                <span className="text-lg font-bold text-white">{em.number}</span>
                {copied === em.number && <span className="text-[10px] text-green-400">Copied!</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Destination Emergency Contacts */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Destination Emergency Contacts</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDest(d)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors",
                  selectedDest.id === d.id
                    ? "bg-[#F6C453]/20 text-[#F6C453]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {selectedDest.emergencyContacts.map((contact, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    {contact.type === "hospital" && <Hospital className="h-4 w-4 text-red-400" />}
                    {contact.type === "police" && <Shield className="h-4 w-4 text-blue-400" />}
                    {contact.type === "rescue" && <AlertTriangle className="h-4 w-4 text-orange-400" />}
                    {contact.type === "tourist" && <Phone className="h-4 w-4 text-green-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <p className="text-xs capitalize text-white/40">{contact.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyNumber(contact.phone)}
                  className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
                >
                  {copied === contact.phone ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                  {contact.phone}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Share Location */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <MapPin className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Share Live Location</p>
                <p className="text-xs text-white/40">Send your coordinates to emergency contacts</p>
              </div>
            </div>
            <a
              href="https://wa.me/?text=I%20need%20help%21%20My%20location%3A%20https%3A%2F%2Fmaps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-500"
            >
              <Share2 className="h-4 w-4" />
              Send via WhatsApp
            </a>
          </div>
        </div>

        {/* First Aid Guide */}
        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">First Aid Quick Guide</h2>
          <div className="space-y-2">
            {firstAid.map((aid) => {
              const Icon = aid.icon;
              const isOpen = expandedAid === aid.title;
              return (
                <div key={aid.title} className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setExpandedAid(isOpen ? null : aid.title)}
                    className="flex w-full items-center justify-between p-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-[#F6C453]" />
                      <span className="text-sm font-medium text-white">{aid.title}</span>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="px-3 pb-3"
                    >
                      <p className="mb-2 text-xs text-white/50"><strong>Symptoms:</strong> {aid.symptoms}</p>
                      <ol className="space-y-1">
                        {aid.actions.map((action, i) => (
                          <li key={i} className="text-xs text-white/70">{i + 1}. {action}</li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Phrases */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Emergency Phrases</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                  <th className="pb-2 pr-4">English</th>
                  <th className="pb-2 pr-4">Hindi</th>
                  <th className="pb-2 pr-4">Nepali</th>
                  <th className="pb-2">Bengali</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {emergencyPhrases.map((phrase, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-4 text-white/80">{phrase.english}</td>
                    <td className="py-2 pr-4 text-white/60">{phrase.hindi}</td>
                    <td className="py-2 pr-4 text-white/60">{phrase.nepali}</td>
                    <td className="py-2 text-white/60">{phrase.bengali}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
