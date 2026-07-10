"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  User,
  Bot,
  Trash2,
} from "lucide-react";
import { Destination } from "@/lib/types";
import { destinations, hotels, homestays } from "@/lib/data";

interface Message {
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

function findDestination(query: string): Destination | undefined {
  const lower = query.toLowerCase();
  return destinations.find(
    (d) =>
      lower.includes(d.name.toLowerCase()) ||
      lower.includes(d.slug.toLowerCase())
  );
}

function findTwoDestinations(query: string): [Destination, Destination] | null {
  const lower = query.toLowerCase();
  const matches = destinations.filter(
    (d) =>
      lower.includes(d.name.toLowerCase()) ||
      lower.includes(d.slug.toLowerCase())
  );
  if (matches.length >= 2) return [matches[0], matches[1]];
  return null;
}

export function getAIResponse(
  question: string,
  _destinationsList: Destination[]
): string {
  const q = question.toLowerCase();

  // Greeting fallback
  if (
    q.trim().length === 0 ||
    /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/.test(q)
  ) {
    return "Hello! I'm your KuboVista AI Assistant. Ask me anything about our destinations!";
  }

  const compareMatch = findTwoDestinations(q);
  const isCompare = /compare/.test(q);
  if (isCompare && compareMatch) {
    const [d1, d2] = compareMatch;
    return `Here's a quick comparison between **${d1.name}** and **${d2.name}**:\n\n**Altitude:** ${d1.altitude} vs ${d2.altitude}\n**Best Time:** ${d1.bestTime} vs ${d2.bestTime}\n**Budget (Backpacker):** ${d1.budgetPlanner.backpacker} vs ${d2.budgetPlanner.backpacker}\n**Budget (Luxury):** ${d1.budgetPlanner.luxury} vs ${d2.budgetPlanner.luxury}`;
  }

  const dest = findDestination(q);

  if (!dest) {
    return "I'd be happy to help! Could you tell me which destination you're interested in?";
  }

  if (/best time|when to visit/.test(q)) {
    return `${dest.bestTime}. The weather is ${dest.weather}.`;
  }

  if (/hotel|stay|accommodation/.test(q)) {
    const localHotels = hotels.filter(
      (h) =>
        h.location.toLowerCase().includes(dest.name.toLowerCase()) ||
        dest.name.toLowerCase().includes(h.location.toLowerCase())
    );
    const localHomestays = homestays.filter(
      (h) =>
        h.location.toLowerCase().includes(dest.name.toLowerCase()) ||
        dest.name.toLowerCase().includes(h.location.toLowerCase())
    );
    const stays = [...localHotels, ...localHomestays];
    if (stays.length === 0) {
      return `I don't have specific stay listings for ${dest.name} yet, but you'll find lovely homestays and budget hotels once you're there.`;
    }
    const names = stays
      .map((s) => {
        const price =
          "pricePerNight" in s ? `₹${s.pricePerNight}/night` : "";
        return `${s.name} (${price})`;
      })
      .join(", ");
    return `Here are some stays in ${dest.name}: ${names}.`;
  }

  if (/pack|packing|carry/.test(q)) {
    const items = dest.packingList.slice(0, 8).join(", ");
    return `Pack these essentials for ${dest.name}: ${items}, and more depending on season.`;
  }

  if (/food|eat|cafe|restaurant/.test(q)) {
    const foodList = dest.localFood.join(", ");
    const topRestaurant =
      dest.restaurants[0]?.name ?? "a local eatery";
    return `Try the local food in ${dest.name}: ${foodList}. You should also try ${topRestaurant}.`;
  }

  if (/trek|hike|adventure|activity/.test(q)) {
    const activities = dest.adventureActivities.map((a) => a.name).join(", ");
    if (!activities) {
      return `There are relaxing nature walks and village tours in ${dest.name}.`;
    }
    return `Adventure activities in ${dest.name}: ${activities}.`;
  }

  if (/budget|cost|price/.test(q)) {
    return `Budget for ${dest.name} ranges from ${dest.budgetPlanner.backpacker} (backpacker) to ${dest.budgetPlanner.luxury} (luxury).`;
  }

  if (/weather/.test(q)) {
    return `In ${dest.name}, temperatures are around ${dest.temperature.summer} in summer, ${dest.temperature.winter} in winter, and ${dest.temperature.monsoon} during monsoon. Overall, the weather is ${dest.weather}.`;
  }

  if (/how to reach|transport/.test(q)) {
    const modes = dest.transportation.howToReach.map((t) => t.mode).join(", ");
    return `You can reach ${dest.name} by ${modes}.`;
  }

  return `Here is what I know about **${dest.name}** — ${dest.tagline}. ${dest.introduction}`;
}

const QUICK_QUESTIONS = [
  "Best time to visit Kalimpong?",
  "Budget hotels in Pelling?",
  "What to pack for Sittong?",
  "Trekking in Samsing?",
  "Local food in Lamahatta?",
  "Compare Kalimpong vs Pelling",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm your KuboVista AI Assistant. Ask me anything about our destinations!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI "thinking" delay
    setTimeout(() => {
      const reply = getAIResponse(userMsg.text, destinations);
      const aiMsg: Message = { role: "ai", text: reply, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Hello! I'm your KuboVista AI Assistant. Ask me anything about our destinations!",
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl dark:border-[#1F2937] dark:bg-[#111827]"
            style={{
              width: "clamp(320px, 90vw, 380px)",
              maxWidth: "100%",
              height: "clamp(380px, 70vh, 500px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-[#1F2937]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B5D3B]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    KuboVista AI
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(156,163,175,0.5) transparent",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user"
                        ? "bg-[#0B5D3B] text-white"
                        : "bg-muted text-muted-foreground dark:bg-[#1F2937]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0B5D3B] text-white"
                          : "bg-muted text-card-foreground dark:bg-[#1F2937] dark:text-[#F8FAFC]"
                      }`}
                    >
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                    <p
                      className={`mt-1 text-[10px] text-muted-foreground ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-[#1F2937]">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-xl bg-muted px-3 py-2 dark:bg-[#1F2937]">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="border-t border-border px-4 py-2 dark:border-[#1F2937]">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {QUICK_QUESTIONS.map((qq, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(qq)}
                    className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition hover:bg-primary hover:text-white dark:border-[#1F2937] dark:bg-[#0B0F19] dark:hover:bg-[#0B5D3B]"
                  >
                    {qq}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input */}
            <div className="flex items-center gap-2 border-t border-border px-3 py-2 dark:border-[#1F2937]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about a destination..."
                className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm text-card-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[#0B5D3B] dark:bg-[#1F2937] dark:text-[#F8FAFC]"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B5D3B] text-white transition hover:bg-[#094d31] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center gap-2 rounded-full bg-[#0B5D3B] px-4 py-3 text-white shadow-lg transition hover:bg-[#094d31]"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Sparkles className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
        </span>
        <span className="hidden text-sm font-medium sm:inline">Ask AI</span>
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-40" />
      </motion.button>
    </div>
  );
}
