"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [promo, setPromo] = useState<any>(null);

  useEffect(() => {
    const fetchPromo = async () => {
      const { data } = await supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1);
      setPromo(data?.[0]);
    };

    fetchPromo();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ text: result.message || "Thank you for subscribing!", type: "success" });
        setEmail("");
      } else {
        const error = await response.json();
        setMessage({ text: error.error || "Something went wrong. Please try again later.", type: "error" });
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setMessage({ text: "Something went wrong. Please try again later.", type: "error" });
    }
    setLoading(false);
  };
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 py-20 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 -z-10">
          <img 
            className="w-full h-full object-cover opacity-90" 
            alt="Signature Italian pasta dish with fresh herbs" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKKQLakESqPJIjH3zSGmUPXx68rdvtHK3wr6q_mZrnQQ2mjRSw_1OL4cTO2vsnv3_SYJ9o8PuHlsSOuy3TquO9tFeuDfqoKKpPL4B4wMMWg4Ix9ZAlfYyaXbbdaD3-nZcyr81t5AsTADvC5L4efmN642gdSksVgO0896w5iMUiiiLHlK51KkyqT0j2WO0gbBRCs65ZY9n-qsJ5xWBaOrLmfKlHqa8wP2_Ynnsrh-EkYlRK99vVckM3JiCGlMbLBW8kr240DMI3D4c"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
        </div>
        <div className="max-w-2xl animate-slide-up delay-200">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Est. 1984 — Tuscany</span>
          <h1 className="text-6xl lg:text-8xl font-headline text-primary mb-6 leading-tight">Authenticity in <br/>Every Harvest.</h1>
          <p className="text-xl text-on-surface-variant mb-10 leading-relaxed font-body max-w-lg">
            Experience a journey through the rolling hills of Italy. Where traditional techniques meet modern viticulture in the heart of the city.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="/reservations" 
              className="bg-primary text-on-primary px-8 py-4 rounded-sm font-bold text-lg hover:shadow-xl transition-all"
            >
              Reserve a Table
            </Link>
            <Link 
              href="/menu" 
              className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
            >
              Explore Our Menu <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Promotion Banner */}
      {promo && (
        <section className="bg-primary text-on-primary py-4 px-6 overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary-fixed animate-pulse">campaign</span>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold">{promo.discount_tag || "SPECIAL OFFER"}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-headline italic">&quot;{promo.title}: {promo.description}&quot;</h2>
            {promo.valid_until && (
              <span className="text-[10px] font-label uppercase tracking-widest bg-on-primary/10 px-3 py-1 rounded-full">
                Valid until {new Date(promo.valid_until).toLocaleDateString()}
              </span>
            )}
            <Link href="/reservations" className="bg-tertiary text-on-tertiary px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-tertiary-container transition-all ml-0 md:ml-4">
              Claim Offer
            </Link>
          </div>
        </section>
      )}

      {/* About Us Teaser */}
      <section className="py-32 px-6 lg:px-20 bg-surface-container-low overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center animate-slide-up">
          <div className="relative">
            <div className="bg-surface-container-highest w-full aspect-[4/5] rounded-md overflow-hidden">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Chef preparing fresh handmade pasta dough" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-2cMbgc25XE30GU2VCiS83KVulQqcP9PGwfbnb-pPdhqauC9IqWccx1FLEL2iufeoDK4aQWrtYFZS7FCOhShlbQuEbChomS0GeC612DtLV19Gd09gjROhklDjtdn9ffBnWOs5VS9F82QujLyu6e5yoA_FP3N8i7__dLohQDUqzMtKETfNha6pH4Huoe6U9qau_a2-V7mKjQo_U3OClpNP7giCh_jZ56jQoEd6DwAy3Z1npicu0pO6FSG8iCIe9kHHZttvd_QRXrk"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden lg:block bg-surface p-8 shadow-sm max-w-xs border border-outline-variant/10">
              <p className="font-headline italic text-lg text-primary">"The secret is the silence between the ingredients."</p>
              <p className="mt-4 text-sm font-bold tracking-widest text-on-surface-variant uppercase">— Chef Marco Rossi</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-headline text-on-surface mb-8">Crafting Heritage <br/>On Your Plate</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              At La Trattoria, we believe that fine dining is an act of preservation. Every ingredient is sourced from artisanal producers who respect the rhythm of the seasons. 
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
              Our cellar houses over 400 labels, curated by our master sommelier to ensure every pairing is an editorial experience.
            </p>
            <Link 
              href="/about-us" 
              className="border-b-2 border-primary text-primary font-bold pb-1 hover:border-tertiary transition-colors"
            >
              Learn Our History
            </Link>
          </div>
        </div>
      </section>

      {/* Chef's Specials Bento Grid */}
      <section className="py-32 px-6 lg:px-20 bg-background overflow-hidden">
        <div className="mb-20 animate-fade-in">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm block mb-2">Seasonal Selection</span>
          <h2 className="text-4xl lg:text-5xl font-headline text-on-surface">Chef's Signature Specials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-slide-up delay-300">
          {/* Large Feature Card */}
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000"
                alt="Wild Mushroom & Truffle Risotto" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 flex justify-between items-end">
              <div>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">Chef's Special</span>
                <h3 className="text-3xl font-headline text-primary mb-2">Wild Mushroom & Truffle Risotto</h3>
                <p className="text-on-surface-variant">Arborio rice slow-cooked with foraged Umbrian truffles and aged Parmigiano.</p>
              </div>
              <span className="text-2xl font-headline text-tertiary">$34</span>
            </div>
          </div>
          {/* Small Card 1 */}
          <div className="md:col-span-4 group bg-surface-container-low p-6 rounded-lg flex flex-col justify-between">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-md">
              <Image 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
                alt="Deconstructed Tiramisu" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div>
              <h3 className="text-xl font-headline text-on-surface mb-2">Deconstructed Tiramisu</h3>
              <p className="text-sm text-on-surface-variant">Mascarpone foam, espresso-soaked savoiardi, 24k gold leaf.</p>
              <p className="mt-4 font-bold text-primary">$18</p>
            </div>
          </div>
          {/* Small Card 2 */}
          <div className="md:col-span-4 group bg-surface-container-low p-6 rounded-lg flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200"
                alt="Wine Selection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-headline text-on-surface mb-2">2016 Brunello di Montalcino</h3>
              <p className="text-sm text-on-surface-variant">Our sommelier's choice pairing for red meats and aged cheeses.</p>
              <p className="mt-4 font-bold text-primary">$22 / glass</p>
            </div>
          </div>
          {/* Long Feature Card */}
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-lg flex flex-col md:flex-row">
            <div className="md:w-1/2 relative aspect-square md:aspect-auto overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
                alt="Oven Roasted Branzino"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-headline text-primary mb-4">Oven Roasted Branzino</h3>
              <p className="text-on-surface-variant mb-6">Whole Mediterranean seabass infused with lemon, rosemary, and cold-pressed olive oil.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-headline text-tertiary">$42</span>
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-sm text-sm font-bold">New Arrival</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Recent Awards */}
      <section className="py-24 px-6 lg:px-20 bg-surface-container-highest">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-headline text-on-surface mb-4">Accolades & Distinctions</h2>
            <p className="text-on-surface-variant">A testament to our commitment to the culinary arts and hospitality excellence.</p>
          </div>
          <div className="lg:w-2/3 flex flex-wrap justify-center lg:justify-end gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary block mb-2 material-fill">stars</span>
              <p className="font-bold text-xs tracking-tighter uppercase font-label">Michelin Guide</p>
              <p className="text-[10px] uppercase font-label">2021-2023</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary block mb-2 material-fill">restaurant</span>
              <p className="font-bold text-xs tracking-tighter uppercase font-label">James Beard Finalist</p>
              <p className="text-[10px] uppercase font-label">2022</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary block mb-2 material-fill">wine_bar</span>
              <p className="font-bold text-xs tracking-tighter uppercase font-label">Wine Spectator</p>
              <p className="text-[10px] uppercase font-label">Grand Award</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary block mb-2 material-fill">public</span>
              <p className="font-bold text-xs tracking-tighter uppercase font-label">Condé Nast Traveler</p>
              <p className="text-[10px] uppercase font-label">Top 10 Global</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTASection */}
      <section className="py-32 px-6 lg:px-20 text-center">
        <div className="max-w-3xl mx-auto bg-primary px-8 lg:px-20 py-24 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-surface rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary-container rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-headline text-on-primary mb-6">Join Our Newsletter</h2>
          <p className="text-primary-fixed/80 text-lg mb-12">Stay updated with our latest events and seasonal menus.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              className="flex-1 bg-surface-container-lowest border-none py-4 px-6 rounded-sm focus:ring-2 focus:ring-tertiary text-on-surface" 
              placeholder="Your email address" 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              disabled={loading}
              className="bg-tertiary text-on-tertiary px-8 py-4 rounded-sm font-bold hover:bg-tertiary-container transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${message.type === "success" ? "text-on-primary" : "text-error-container"}`}>
              {message.text}
            </p>
          )}
        </div>
      </section>

      {/* Gift Cards Promotion Section */}
      <section className="py-32 px-6 lg:px-20 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200" 
              alt="Gift Cards from La Trattoria"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center p-8 text-center">
                <div className="border-2 border-white/50 p-8 backdrop-blur-sm bg-black/20">
                  <h3 className="font-headline text-3xl text-white uppercase tracking-[0.3em] mb-2">La Trattoria</h3>
                  <p className="text-white text-xs tracking-widest uppercase font-bold">Regalo Della Casa</p>
                </div>
            </div>
          </div>
          <div>
            <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm block mb-4">The Perfect Gift</span>
            <h2 className="text-4xl lg:text-5xl font-headline text-primary mb-6">Share the Experience</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-10">
              Treat your loved ones to an unforgettable evening of authentic Italian cuisine, exceptional wines, and warm hospitality. Available as physical gold-foil cards or instant digital E-Gifts.
            </p>
            <div className="flex gap-6">
              <Link 
                href="/gift-cards" 
                className="bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-tertiary-fixed transition-all shadow-md group flex items-center gap-2"
              >
                Purchase Gift Card <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
