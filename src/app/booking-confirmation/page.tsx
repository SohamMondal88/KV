"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  FileText,
  Share2,
  Mountain,
  ArrowRight,
  HelpCircle,
  Mail,
  Phone,
  Copy,
  Check,
  Calendar,
  CreditCard,
  User,
} from "lucide-react";

import { useCart, type Booking } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const delay = `${Math.random() * 1.5}s`;
        const duration = `${1.5 + Math.random() * 2}s`;
        const color = ["#0B5D3B", "#FF8A00", "#1D4ED8", "#16A34A", "#DC2626"][
          i % 5
        ];
        return (
          <motion.div
            key={i}
            className="absolute top-0 h-2 w-2 rounded-full"
            style={{ left, backgroundColor: color }}
            initial={{ y: -10, opacity: 1, rotate: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [1, 1, 0],
              rotate: [0, 720],
              x: [0, (Math.random() - 0.5) * 120],
            }}
            transition={{
              duration: parseFloat(duration),
              delay: parseFloat(delay),
              ease: "easeIn",
            }}
          />
        );
      })}
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const { bookings } = useCart();
  const bookingId = searchParams.get("id");

  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const booking: Booking | undefined = bookings.find(
    (b) => b.id === bookingId
  );

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleDownloadInvoice = () => {
    if (!booking) return;
    const invoiceHtml = `
<!DOCTYPE html>
<html>
<head><title>Invoice - ${booking.id}</title>
<style>
body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;border:1px solid #eee}
h1{color:#0B5D3B}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0}
.total{font-weight:bold;font-size:1.1em;border-top:2px solid #0B5D3B;margin-top:8px;padding-top:8px}
</style></head>
<body>
<h1>KuboVista Booking Invoice</h1>
<p><strong>Booking ID:</strong> ${booking.id}</p>
<p><strong>Date:</strong> ${formatDate(booking.bookingDate)}</p>
<p><strong>Customer:</strong> ${booking.customerName} &#183; ${booking.customerEmail} &#183; ${booking.customerPhone}</p>
<hr/>
<h3>Items</h3>
${booking.items.map(item => `
<div class="row"><span>${item.name} × ${item.quantity}</span><span>${formatINR(item.pricePerUnit * item.quantity)}</span></div>
`).join("")}
<div class="row total"><span>Total</span><span>${formatINR(booking.totalAmount)}</span></div>
<p>Payment Method: ${booking.paymentMethod || "N/A"}</p>
<p>Transaction ID: ${booking.paymentId || "N/A"}</p>
</body>
</html>
    `;
    const blob = new Blob([invoiceHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${booking.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!booking) {
    return (
      <div className="min-h-full">
        <section className="py-20">
          <Container className="text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              No Booking Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              We couldn't find a booking with that ID. Please check your link or
              browse our destinations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button variant="primary">
                  <ArrowRight className="mr-1 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Link href="/my-bookings">
                <Button variant="outline">View My Bookings</Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {showConfetti && <Confetti />}

      <section className="py-8 sm:py-12">
        <Container className="max-w-3xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
            >
              <CheckCircle className="h-10 w-10 text-success" />
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Booking Confirmed!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for choosing KuboVista. Your Himalayan adventure awaits!
            </p>
          </motion.div>

          {/* Booking ID */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">Booking ID:</span>
              <span className="font-mono text-base font-bold text-foreground">
                {booking.id}
              </span>
              <button
                onClick={handleShare}
                className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Copy booking link"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Booking Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card hoverLift={false} className="p-5 sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-foreground">
                Booking Summary
              </h2>

              {/* Items */}
              <div className="space-y-4">
                {booking.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Mountain className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.location} · {item.date} · {item.guests} guest
                          {item.guests > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {formatINR(item.pricePerUnit * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Amount Paid</span>
                  <span className="font-medium text-foreground">
                    {formatINR(booking.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Method</span>
                  <span className="font-medium text-foreground">
                    {booking.paymentMethod || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Transaction ID</span>
                  <span className="font-mono text-foreground">
                    {booking.paymentId || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Booking Date</span>
                  <span className="text-foreground">
                    {formatDate(booking.bookingDate)}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div className="mt-5 border-t border-border pt-4">
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  Customer Details
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    <span>{booking.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{booking.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{booking.customerPhone}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Email note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-5 text-center text-sm text-muted-foreground"
          >
            A confirmation email has been sent to{" "}
            <strong className="text-foreground">{booking.customerEmail}</strong>
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <Button variant="primary" onClick={handleDownloadInvoice}>
              <Download className="mr-1 h-4 w-4" />
              Download Invoice
            </Button>
            <Link href="/my-bookings">
              <Button variant="outline">
                <Calendar className="mr-1 h-4 w-4" />
                View My Bookings
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleShare}>
              {copied ? (
                <Check className="mr-1 h-4 w-4 text-success" />
              ) : (
                <Share2 className="mr-1 h-4 w-4" />
              )}
              {copied ? "Link Copied" : "Share Booking"}
            </Button>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 text-center"
          >
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Need Help?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:support@kubovista.travel"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" />
                support@kubovista.travel
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" />
                +91 98765 43210
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-sm text-primary transition-colors hover:underline"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Contact Support
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
