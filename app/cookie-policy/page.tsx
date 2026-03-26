import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | La Trattoria",
  description: "Learn how La Trattoria uses cookies and how you can control them.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface pt-32 pb-24 px-6 lg:px-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary">Cookie Policy</span>
        </div>

        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Cookie Policy</h1>
        <p className="text-on-surface-variant mb-16 text-sm">Last updated: March 2025</p>

        <div className="space-y-12 text-on-surface leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">What Are Cookies?</h2>
            <p className="text-on-surface-variant">
              Cookies are small text files placed on your device when you visit a website. They help websites 
              remember your preferences, improve performance, and provide a better user experience. Cookies 
              cannot run programs or deliver viruses to your computer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Types of Cookies We Use</h2>
            <div className="space-y-6">
              {[
                {
                  type: "Essential Cookies",
                  desc: "Required for the website to function. They enable features like reservation forms and navigation. These cannot be disabled.",
                },
                {
                  type: "Preference Cookies",
                  desc: "Remember your settings and preferences (such as dark mode or language preference) to personalise your experience.",
                },
                {
                  type: "Analytics Cookies",
                  desc: "Help us understand how visitors interact with our website, allowing us to improve content and performance. Data is collected anonymously.",
                },
                {
                  type: "Marketing Cookies",
                  desc: "Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. You can opt out at any time.",
                },
              ].map(({ type, desc }) => (
                <div key={type} className="bg-surface-container rounded-sm p-5 border border-outline-variant/10">
                  <p className="font-bold text-sm text-primary mb-2">{type}</p>
                  <p className="text-on-surface-variant text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Managing Cookies</h2>
            <p className="text-on-surface-variant mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="space-y-2 text-on-surface-variant list-none">
              {[
                "Browser settings — most browsers allow you to block or delete cookies",
                "Our cookie banner — manage your preferences when you first visit",
                "Third-party opt-out tools — use industry opt-out mechanisms for advertising cookies",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-on-surface-variant mt-4 text-sm">
              Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Third-Party Cookies</h2>
            <p className="text-on-surface-variant">
              Some cookies are placed by third-party services that appear on our pages, such as embedded maps 
              or social media buttons. We do not control these cookies. Please refer to the privacy policies 
              of the respective third parties for more information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Updates to This Policy</h2>
            <p className="text-on-surface-variant">
              We may update this Cookie Policy periodically. We encourage you to review this page when you 
              visit our website to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-widest text-xs border-b border-outline-variant/20 pb-3">Contact</h2>
            <p className="text-on-surface-variant">
              Questions about our Cookie Policy? Email us at{" "}
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
