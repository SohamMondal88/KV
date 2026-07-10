import React from "react";
import { Container } from "@/components/ui/Container";

export default function PrivacyPage() {
  const lastUpdated = "July 9, 2026";

  return (
    <div className="flex flex-col">
      <section className="bg-forest py-16 text-white">
        <Container className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/70">Last updated: {lastUpdated}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                KuboVista Travel Pvt. Ltd. (“we”, “our”, or “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Travel preferences and itinerary details</li>
                <li>Payment and billing information</li>
                <li>Device and usage data (IP address, browser type, pages visited)</li>
                <li>Location data when you opt in</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>To process bookings and provide travel services</li>
                <li>To communicate trip updates, offers, and newsletters</li>
                <li>To improve our website and personalize user experience</li>
                <li>To comply with legal obligations and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">4. Sharing Your Information</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We do not sell your personal data. We may share it with trusted partners such as homestay hosts, payment processors, and service providers strictly necessary to fulfill your booking. We may also disclose information to comply with applicable laws or protect our rights.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">5. Data Security</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">6. Your Rights</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Access, correct, or delete your personal data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
                <li>Object to processing based on legitimate interests</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">7. Cookies</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can manage cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">8. Changes to This Policy</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">9. Contact Us</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at hello@KuboVista.com or through our Contact page.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
