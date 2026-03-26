import Link from "next/link";

const Footer = () => {
  return (
    <>
      {/* ActionsBar */}
      <section className="border-t border-outline-variant/10 py-10 px-6 lg:px-20 bg-background text-on-surface">
        <div className="flex flex-wrap items-center justify-start gap-12">
          <Link href="https://instagram.com/latrattoria" target="_blank" className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform font-icon">share</span>
            <span className="font-bold text-sm uppercase tracking-widest text-on-surface">Follow Us</span>
          </Link>
          <Link href="https://maps.app.goo.gl/uXpL6jYyD6oN9v8Y9" target="_blank" className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform font-icon">public</span>
            <span className="font-bold text-sm uppercase tracking-widest text-on-surface">Visit</span>
          </Link>
          <a href="mailto:ciao@latrattoria.it" className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform font-icon">mail</span>
            <span className="font-bold text-sm uppercase tracking-widest text-on-surface">Email</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low py-20 px-6 lg:px-20 text-on-surface">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-xs">
            <span className="text-3xl font-headline font-bold text-primary block mb-6">La Trattoria</span>
            <p className="text-on-surface-variant leading-relaxed">
              124 Via della Conciliazione, Rome, RM 00193 <br />
              Experience the heritage of Italian cuisine.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <p className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Explore</p>
              <ul className="space-y-4 text-on-surface-variant">
                <li><Link className="hover:text-primary transition-colors" href="/events">Private Dining</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/menu">Our Cellar</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/about-us">Our Story</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/gift-cards">Gift Cards</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Hours</p>
              <ul className="space-y-2 text-on-surface-variant text-sm">
                <li>Mon-Thu: 12pm - 10pm</li>
                <li>Fri-Sat: 12pm - 11:30pm</li>
                <li>Sun: 11:30am - 9pm</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-outline-variant/20 pt-10">
          <p className="text-on-surface-variant text-sm">© {new Date().getFullYear()} La Trattoria. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/terms-of-service">Terms of Service</Link>
            <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
