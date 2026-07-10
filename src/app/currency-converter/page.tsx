"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  ArrowRightLeft,
  TrendingUp,
  Clock,
  Wallet,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const currencies = [
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
];

// Base INR rates (1 unit of foreign = X INR)
const ratesToINR: Record<string, number> = {
  INR: 1,
  USD: 83.5,
  EUR: 90.2,
  GBP: 106.4,
  JPY: 0.562,
  AUD: 55.1,
  CAD: 61.3,
  SGD: 62.0,
  CHF: 95.5,
  CNY: 11.6,
};

// Derived: from any to any
function getRate(from: string, to: string): number {
  const fromRate = ratesToINR[from] ?? 1;
  const toRate = ratesToINR[to] ?? 1;
  return toRate / fromRate;
}

function formatNumber(n: number, currencyCode: string): string {
  const symbol = currencies.find((c) => c.code === currencyCode)?.symbol ?? "";
  if (n < 0.01) {
    return `${symbol}${n.toExponential(2)}`;
  }
  if (n < 1) {
    return `${symbol}${n.toFixed(4)}`;
  }
  if (n < 1000) {
    return `${symbol}${n.toFixed(2)}`;
  }
  return `${symbol}${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;
}

function AnimatedValue({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(2));
  const [displayText, setDisplayText] = useState("0.00");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setDisplayText(v));
    return unsub;
  }, [display]);

  return <span ref={ref}>{displayText}</span>;
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [lastUpdated] = useState(() => new Date().toLocaleString("en-IN"));

  const numericAmount = parseFloat(amount) || 0;
  const rate = getRate(fromCurrency, toCurrency);
  const converted = numericAmount * rate;
  const reverseRate = getRate(toCurrency, fromCurrency);

  const fromSymbol = currencies.find((c) => c.code === fromCurrency)?.symbol ?? "";
  const toSymbol = currencies.find((c) => c.code === toCurrency)?.symbol ?? "";

  const commonConversions = useMemo(() => {
    const values = [5000, 10000, 20000, 50000];
    return values.map((v) => ({
      amount: v,
      converted: v * getRate(fromCurrency, toCurrency),
    }));
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 via-background to-background">
      <Container className="py-8 md:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Wallet className="h-4 w-4" />
            Travel Smart
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Travel Smart, Convert Easy
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Real-time currency conversion for your Himalayan adventures. Plan your budget with confidence.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {/* Converter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-white/20 bg-white/70 shadow-2xl shadow-primary/5 backdrop-blur-xl dark:bg-black/40 dark:border-white/10">
              <div className="p-6 md:p-10">
                {/* Amount Input */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                      {fromSymbol}
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="any"
                      placeholder="Enter amount"
                      className="w-full rounded-xl border border-border bg-card py-4 pl-10 pr-4 text-2xl font-bold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 md:text-3xl"
                    />
                  </div>
                </div>

                {/* From / Swap / To */}
                <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
                  {/* From */}
                  <div className="w-full flex-1">
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      From
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card py-3 pl-3 pr-10 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Swap */}
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg active:scale-95"
                    aria-label="Swap currencies"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </button>

                  {/* To */}
                  <div className="w-full flex-1">
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      To
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card py-3 pl-3 pr-10 text-sm font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Converted Amount */}
                <motion.div
                  key={`${amount}-${fromCurrency}-${toCurrency}`}
                  initial={{ scale: 0.98, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 rounded-2xl bg-primary/5 p-6 text-center"
                >
                  <p className="mb-1 text-sm text-muted-foreground">
                    Converted Amount
                  </p>
                  <p className="text-4xl font-bold text-primary md:text-5xl">
                    {toSymbol}
                    <AnimatedValue value={converted} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {fromSymbol}
                    {numericAmount.toLocaleString("en-IN")} {fromCurrency} = {toSymbol}
                    {converted.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {toCurrency}
                  </p>
                </motion.div>

                {/* Rate Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-muted/50 p-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>
                      1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {lastUpdated}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Common Conversions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Common Conversions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {commonConversions.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-sm font-medium text-foreground">
                    {fromSymbol}
                    {item.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {toSymbol}
                    {item.converted.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Travel Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4"
          >
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Travel Tip</p>
              <p className="text-sm text-muted-foreground">
                Cash is king in the mountains! ATMs may be limited in remote
                areas. Carry sufficient INR for homestays, local transport, and
                small eateries.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
