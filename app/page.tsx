"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import TestimonialsSection from "@/components/TestimonialsSection";
import Newsletter from "@/components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
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

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center px-6 lg:px-20 py-20 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 -z-10"
        >
          <Image 
            className="w-full h-full object-cover" 
            alt="Signature Italian pasta dish with fresh herbs" 
            src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2000"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </motion.div>
        
        <div className="max-w-3xl relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-tertiary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Est. 1984 — Tuscany Heritage
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-headline text-primary mb-8 leading-tight md:leading-[0.85] tracking-tight break-words"
          >
            Authenticity <br />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="italic text-tertiary ml-2 md:ml-8 lg:ml-20 block md:inline"
            >
              in Every Harvest.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-base md:text-xl text-on-surface-variant mb-8 md:mb-12 leading-relaxed font-body max-w-xl border-l-2 border-primary/20 pl-4 md:pl-8"
          >
            Experience a journey through the rolling hills of Italy. Where traditional techniques meet modern viticulture in the heart of the city.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-wrap items-center gap-10"
          >
            <Link 
              href="/reservations" 
              className="bg-primary text-on-primary px-10 py-5 rounded-sm font-bold text-sm tracking-widest uppercase hover:bg-tertiary transition-all shadow-xl hover:-translate-y-1"
            >
              Reserve a Table
            </Link>
            <Link 
              href="/menu" 
              className="text-primary font-bold flex items-center gap-3 group tracking-widest uppercase text-xs"
            >
              Explore Our Menu 
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="material-symbols-outlined font-bold"
              >
                arrow_forward
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Accent */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute right-20 bottom-20 hidden lg:block w-32 h-32 border border-primary/10 rounded-full flex items-center justify-center p-4 backdrop-blur-sm"
        >
           <div className="text-[10px] font-bold text-primary/40 uppercase tracking-tighter text-center">Harvested With <br />Love</div>
        </motion.div>
      </section>

      {/* Dynamic Promotion Banner */}
      <AnimatePresence>
        {promo && (
          <motion.section 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-on-primary py-6 px-6 overflow-hidden relative"
          >
            <motion.div 
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center"
            >
              <div className="flex items-center gap-4">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="material-symbols-outlined text-tertiary-fixed text-3xl"
                >
                  campaign
                </motion.span>
                <div className="text-left">
                  <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold block leading-none mb-1">{promo.discount_tag || "SPECIAL OFFER"}</span>
                  <h2 className="text-2xl font-headline italic leading-none">&quot;{promo.title}&quot;</h2>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-10 w-[1px] bg-white/20 hidden md:block"></div>
                <p className="text-sm font-body italic opacity-80">{promo.description}</p>
              </div>
              <Link href={`/reservations?promo=${encodeURIComponent(promo.title)}`} className="bg-tertiary text-on-tertiary px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-tertiary-container transition-all shadow-lg active:scale-95 ml-0 md:ml-4">
                Claim Offer
              </Link>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* About Us Teaser */}
      <section className="py-40 px-6 lg:px-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low/50 -skew-x-12 translate-x-1/2 -z-10"></div>
        
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="bg-surface-container-highest w-full aspect-[4/5] rounded-sm overflow-hidden shadow-2xl skew-y-1">
              <Image 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" 
                alt="Chef preparing fresh handmade pasta dough" 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200"
                fill
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-12 -right-12 hidden lg:block bg-surface p-12 shadow-2xl max-w-sm border border-primary/5 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-primary mb-4 block">format_quote</span>
              <p className="font-headline italic text-2xl text-primary leading-tight">"The secret is the silence between the ingredients."</p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-8 h-[1px] bg-primary/30"></div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase">— Chef Marco Rossi</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-tertiary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block font-bold">The Heritage</span>
            <h2 className="text-5xl lg:text-7xl font-headline text-on-surface mb-10 leading-[1.1]">Crafting Heritage <br/><span className="italic text-primary">On Your Plate</span></h2>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-8 font-body">
              At La Trattoria, we believe that fine dining is an act of preservation. Every ingredient is sourced from artisanal producers who respect the rhythm of the seasons. 
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12 font-body opacity-80">
              Our cellar houses over 400 labels, curated by our master sommelier to ensure every pairing is an editorial experience that tells a story of the soil.
            </p>
            <Link 
              href="/about-us" 
              className="inline-flex items-center gap-4 text-primary font-bold tracking-widest uppercase text-xs border-b-2 border-primary/20 pb-2 hover:border-primary transition-all group"
            >
              Learn Our History
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chef's Specials Premium Bento Grid */}
      <section className="py-40 px-6 lg:px-20 bg-surface-container-lowest overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-tertiary font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Seasonal Selection</span>
          <h2 className="text-5xl lg:text-7xl font-headline text-on-surface">Chef's Signature Specials</h2>
          <div className="w-20 h-[2px] bg-primary/20 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Large Feature Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="md:col-span-8 group relative overflow-hidden bg-background rounded-sm shadow-xl"
          >
            <div className="relative aspect-[21/9] lg:aspect-[16/7] overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000"
                alt="Wild Mushroom & Truffle Risotto" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 -mt-20">
              <div className="bg-white/95 backdrop-blur-md p-8 shadow-2xl border-t-4 border-primary max-w-lg">
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">Award Winning</span>
                <h3 className="text-4xl font-headline text-on-surface mb-3 italic">Wild Mushroom & Truffle Risotto</h3>
                <p className="text-on-surface-variant font-body">Arborio rice slow-cooked with foraged Umbrian truffles and aged Parmigiano Reggiano.</p>
              </div>
              <div className="bg-primary text-on-primary p-6 shadow-2xl flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">Price</span>
                <span className="text-3xl font-headline">$34</span>
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="md:col-span-4 group bg-background p-8 rounded-sm shadow-lg flex flex-col border border-primary/5"
          >
            <div className="relative aspect-square mb-10 overflow-hidden shadow-2xl group-hover:shadow-primary/10 transition-shadow">
              <Image 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200"
                alt="Deconstructed Tiramisu" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary text-[8px] font-bold uppercase tracking-[0.4em] px-3 py-1">Limited</div>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-headline text-on-surface mb-3 italic">Deconstructed Tiramisu</h3>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">Mascarpone foam, espresso-soaked savoiardi, finish with 24k gold leaf and artisan cocoa.</p>
              <div className="w-12 h-[1px] bg-primary/20 my-6"></div>
              <p className="text-xl font-headline text-primary">$18</p>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="md:col-span-4 group bg-background p-8 rounded-sm shadow-lg flex flex-col border border-primary/5"
          >
             <div className="relative aspect-square mb-10 overflow-hidden shadow-2xl group-hover:shadow-primary/10 transition-shadow">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1HJ6vRZPg3G6Ebjo7b5Ct_cTpW3De-oeDYb7o0npW1HrFlEP2lrWFljb398t7RNzyIYII1PYVyzmrqLp_BeR4nZThGc9WfAX4s42CIpM6Ta-Rcq-q6kynERJaqEJfXZdScR1i632bzRN8fXcsmCuTS0F6m-dCb6wmQZIwpE8UVfhlYAzJJzL2HnKAeYHuMfu5arOmvM1BRFBu-PFIo6ayLp4agnopVbZz4y93OKT9AgvpmfbZoljY4YdxYTFiwdHVl41fl7odEck"
                  alt="Wine Selection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
            </div>
            <div className="mt-auto">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3 block">Sommelier's Choice</span>
              <h3 className="text-2xl font-headline text-on-surface mb-3 italic">2016 Brunello di Montalcino</h3>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">A powerful and elegant red, perfect for aged steaks and truffle-based dishes.</p>
              <div className="w-12 h-[1px] bg-primary/20 my-6"></div>
              <p className="text-xl font-headline text-primary">$22 <span className="text-xs uppercase tracking-widest opacity-50 ml-2">/ glass</span></p>
            </div>
          </motion.div>

          {/* Long Feature Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="md:col-span-8 group relative overflow-hidden bg-primary/5 rounded-sm flex flex-col md:flex-row border border-primary/10"
          >
            <div className="md:w-1/2 relative aspect-square md:aspect-auto overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200"
                alt="Oven Roasted Branzino"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white/40 backdrop-blur-xl">
              <span className="bg-primary text-on-primary self-start px-4 py-1 text-[8px] font-bold uppercase tracking-[0.3em] mb-6">New Season</span>
              <h3 className="text-4xl font-headline text-primary mb-6 italic">Oven Roasted Branzino</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed font-body">Whole Mediterranean seabass infused with Amalfi lemon, fresh rosemary, and cold-pressed extra virgin olive oil from our estate.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-3xl font-headline text-tertiary">$42</span>
                <button className="text-primary font-bold tracking-widest uppercase text-[10px] border-b border-primary/30 hover:border-primary transition-all">Details</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Recent Awards */}
      <section className="py-32 px-6 lg:px-20 bg-surface-container-highest/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Recognition</span>
            <h2 className="text-4xl font-headline text-on-surface mb-6 italic leading-tight">Accolades & <br />Distinctions</h2>
            <p className="text-on-surface-variant font-body">A testament to our unwavering commitment to the culinary arts and hospitality excellence since our founding.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          >
            {[
              { icon: "stars", title: "Michelin Guide", subtitle: "2021-2023" },
              { icon: "restaurant", title: "James Beard", subtitle: "Finalist 2022" },
              { icon: "wine_bar", title: "Wine Spectator", subtitle: "Grand Award" },
              { icon: "public", title: "CN Traveler", subtitle: "Top 10 Global" }
            ].map((award, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0%)" }}
                className="text-center"
              >
                <span className="material-symbols-outlined text-5xl text-primary block mb-4 material-fill">{award.icon}</span>
                <p className="font-bold text-[10px] tracking-[0.1em] uppercase font-label mb-1 text-on-surface">{award.title}</p>
                <p className="text-[10px] uppercase font-label text-primary/60">{award.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Newsletter />

      {/* Gift Cards Promotion Section */}
      <section className="py-40 px-6 lg:px-20 bg-background border-t border-outline-variant/10 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, rotate: 2 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group"
          >
            <Image 
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200" 
              alt="Gift Cards from La Trattoria"
              fill
              className="object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/40 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="border border-white/30 p-12 backdrop-blur-md bg-black/30 relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-white/50"></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-white/50"></div>
                  <h3 className="font-headline text-4xl text-white uppercase tracking-[0.4em] mb-4">La Trattoria</h3>
                  <div className="w-16 h-[1px] bg-white/40 mx-auto mb-4"></div>
                  <p className="text-white text-[10px] tracking-[0.4em] uppercase font-bold">Regalo Della Casa</p>
                </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-tertiary font-bold tracking-[0.4em] uppercase text-[10px] block mb-6 px-1 border-l-2 border-tertiary ml-1">The Perfect Gift</span>
            <h2 className="text-5xl lg:text-7xl font-headline text-primary mb-10 leading-[1.1]">Share the Experience</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12 font-body italic opacity-80">
              Treat your loved ones to an unforgettable evening of authentic Italian cuisine, exceptional wines, and warm hospitality. 
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-12 font-body max-w-lg">
              Available as classic physical cards with gold-leaf embossing or instant digital vouchers for last-minute celebrations.
            </p>
            <div className="flex gap-10">
              <Link 
                href="/gift-cards" 
                className="bg-primary text-on-primary px-12 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-tertiary transition-all shadow-2xl group flex items-center gap-4 active:scale-95"
              >
                Purchase Gift Card 
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
