import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | La Trattoria",
  description: "Our Privacy Policy explains how La Trattoria collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface pt-32 pb-24 px-6 lg:px-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary">Privacy Policy</span>
        </div>

        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-on-surface-variant mb-16 text-sm">Last updated: March 2025</p>

        <div className="space-y-12 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Introduction</h2>
            <p className="text-on-surface-variant">
              Welcome to La Trattoria. We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy describes how we collect, use, and share information when you use our website or dine with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Information We Collect</h2>
            <p className="text-on-surface-variant mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Full name and contact details (email, phone number)",
                "Reservation details and dining preferences",
                "Feedback and messages submitted via our contact form",
                "Payment information (processed securely; we do not store card data)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">How We Use Your Information</h2>
            <p className="text-on-surface-variant mb-4">We use the information we collect to:</p>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Process and manage your reservations",
                "Send confirmation emails and important updates",
                "Improve our services and dining experience",
                "Comply with legal obligations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Data Sharing</h2>
            <p className="text-on-surface-variant">
              We do not sell, trade, or rent your personal information to third parties. We may share your data with 
              trusted service providers who help us operate our website and business, provided they agree to keep your 
              information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Your Rights</h2>
            <p className="text-on-surface-variant mb-4">You have the right to:</p>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Access the personal data we hold about you",
                "Request correction or deletion of your data",
                "Withdraw consent at any time",
                "Lodge a complaint with a supervisory authority",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Contact Us</h2>
            <p className="text-on-surface-variant">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:ciao@latrattoria.it" className="text-primary hover:underline">ciao@latrattoria.it</a>
              {" "}or visit us at 124 Via della Conciliazione, Rome, RM 00193.
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
