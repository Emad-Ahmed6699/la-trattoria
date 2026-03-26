import Link from "next/link";

export const metadata = {
  title: "Terms of Service | La Trattoria",
  description: "La Trattoria Terms of Service — the rules governing use of our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-on-surface pt-32 pb-24 px-6 lg:px-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary">Terms of Service</span>
        </div>

        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Terms of Service</h1>
        <p className="text-on-surface-variant mb-16 text-sm">Last updated: March 2025</p>

        <div className="space-y-12 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Agreement to Terms</h2>
            <p className="text-on-surface-variant">
              By accessing or using the La Trattoria website, you agree to be bound by these Terms of Service 
              and our Privacy Policy. If you disagree with any part of these terms, you may not access the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Reservations & Cancellations</h2>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Reservations must be made at least 2 hours in advance.",
                "Cancellations must be made at least 24 hours before the reservation time.",
                "Late cancellations or no-shows may incur a cancellation fee.",
                "We reserve the right to cancel reservations due to unforeseen circumstances.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Use of the Website</h2>
            <p className="text-on-surface-variant mb-4">You agree not to:</p>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Use the website for any unlawful purpose",
                "Attempt to gain unauthorized access to any part of the site",
                "Transmit any viruses or malicious code",
                "Collect user data without explicit consent",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Intellectual Property</h2>
            <p className="text-on-surface-variant">
              All content on this website — including text, images, logos, and design — is the property of 
              La Trattoria and is protected by applicable copyright and trademark laws. You may not reproduce, 
              distribute, or create derivative works without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Limitation of Liability</h2>
            <p className="text-on-surface-variant">
              La Trattoria is not liable for any indirect, incidental, or consequential damages arising from 
              your use of the website or our services. Our total liability in connection with any claim shall 
              not exceed the amount paid by you for the service in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Changes to Terms</h2>
            <p className="text-on-surface-variant">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective 
              immediately upon posting. Your continued use of the website after any changes constitutes 
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Contact</h2>
            <p className="text-on-surface-variant">
              For any questions about these Terms, contact us at{" "}
              <a href="mailto:ciao@latrattoria.it" className="text-primary hover:underline">ciao@latrattoria.it</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/20">
          <Link href="/" className="text-sm text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
