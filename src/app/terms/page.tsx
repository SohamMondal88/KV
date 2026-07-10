import React from "react";
import { Container } from "@/components/ui/Container";

export default function TermsPage() {
  const lastUpdated = "July 9, 2026";

  return (
    <div className="flex flex-col">
      <section className="bg-forest py-16 text-white">
        <Container className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-white/70">Last updated: {lastUpdated}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                By accessing or using the KuboVista website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">2. Services</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                KuboVista provides an online platform to discover, plan, and book travel experiences in offbeat Himalayan destinations. We act as an intermediary between travelers and local service providers, including homestays, hotels, guides, and transport operators.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">3. Bookings and Payments</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>A 50% advance payment is required to confirm bookings.</li>
                <li>Prices listed are in Indian Rupees (INR) unless stated otherwise.</li>
                <li>Additional charges such as permits, entry fees, and personal expenses are not included unless explicitly mentioned.</li>
                <li>We reserve the right to cancel bookings due to unforeseen circumstances, with a full refund.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">4. Cancellations and Refunds</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Cancellations 14+ days before departure: full refund.</li>
                <li>Cancellations 7-14 days before departure: 50% refund.</li>
                <li>Cancellations within 7 days: non-refundable.</li>
                <li>No-shows are treated as same-day cancellations and are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">5. User Conduct</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You agree to use our platform lawfully and respectfully. You must not upload harmful content, attempt to breach security, or misuse our services. We reserve the right to suspend accounts violating these rules.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">6. Limitation of Liability</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                KuboVista is not liable for personal injury, loss, or damage arising from activities arranged through third-party providers. We strongly recommend purchasing comprehensive travel insurance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">7. Intellectual Property</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                All content on this website, including text, images, logos, and software, is the property of KuboVista Travel Pvt. Ltd. or its licensors. You may not reproduce, distribute, or create derivative works without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">8. Modifications to Terms</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We may revise these Terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">9. Governing Law</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gangtok, Sikkim.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">10. Contact</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For any questions regarding these Terms, please contact us at hello@KuboVista.com.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
