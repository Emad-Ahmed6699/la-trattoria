"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Newsletter from "@/components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [wines, setWines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [catsRes, itemsRes, winesRes] = await Promise.all([
        supabase.from("menu_categories").select("*").order("order_index"),
        supabase.from("menu_items").select("*").order("name"),
        supabase.from("wine_list").select("*").order("type", { ascending: false }).order("name")
      ]);
      setCategories(catsRes.data || []);
      setItems(itemsRes.data || []);
      setWines(winesRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(cat => 
    filteredItems.some(item => item.category_id === cat.id)
  );

  const filteredWines = wines.filter(wine => 
    wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wine.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wine.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-label tracking-widest uppercase text-xs">Curating Menu...</div>
      </div>
    );
  }

  const wineTypes = ["Red", "White", "Sparkling", "Rosé", "Dessert"];

  return (
    <main className="bg-background overflow-x-hidden">
      {/* Hero / Title Section */}
      <header className="relative py-24 px-6 overflow-hidden pt-32 text-center lg:text-left">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-tertiary font-label tracking-[0.2em] uppercase text-xs mb-4 block">Authentic Italian Cuisine</span>
            <h1 className="font-headline text-6xl lg:text-8xl leading-none text-on-surface mb-8">Our Seasonal <br /><span className="italic text-primary">Menu</span></h1>
            <p className="text-on-surface-variant max-w-md text-lg leading-relaxed mb-10 mx-auto lg:mx-0">
              A curated selection of heritage recipes reimagined for the modern palate, sourcing the finest ingredients from local harvests and Italian purveyors.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start no-print">
               <button 
                onClick={() => window.print()}
                className="flex items-center gap-3 border-b border-primary text-primary pb-2 font-medium hover:gap-5 transition-all"
               >
                  <span className="material-symbols-outlined">download</span>
                  Download PDF Menu
                </button>
                
                <div className="relative group w-full lg:w-72">
                  <input 
                    type="text"
                    placeholder="Find a dish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-full py-2.5 px-10 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-xs text-on-surface shadow-sm"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary text-[18px]">search</span>
                </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] w-full bg-surface-container rounded-md overflow-hidden shadow-2xl print:hidden"
          >
            <img 
              alt="Signature Pasta" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </motion.div>
        </div>
      </header>

      {/* Menu Navigation (Sticky) */}
      <section className="bg-surface-container-low py-4 sticky top-20 z-40 border-b border-outline-variant/5 backdrop-blur-md bg-opacity-90 no-print">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 lg:gap-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {filteredCategories.map((cat: any, idx: number) => (
            <Fragment key={cat.id}>
              <Link className="text-sm font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary transition-colors" href={`#${cat.id}`}>{cat.name}</Link>
              <span className="ml-4 lg:ml-12 h-1 w-1 bg-outline-variant rounded-full opacity-30"></span>
            </Fragment>
          ))}
          <Link className="text-sm font-bold tracking-wider uppercase text-primary hover:text-tertiary transition-colors" href="#wine-cellar">The Wine Cellar</Link>
        </div>
      </section>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        {filteredCategories.length === 0 ? (
           <div className="text-center py-20">
              <p className="text-on-surface-variant font-body italic">
                {searchQuery ? `No items found matching "${searchQuery}"` : "The menu is being updated. Please check back soon."}
              </p>
           </div>
        ) : (
          filteredCategories.map((cat: any) => (
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              key={cat.id} 
              className="scroll-mt-40" 
              id={cat.id}
            >
              <div className="flex items-end justify-between mb-16 border-b border-outline-variant/10 pb-8">
                <h2 className="font-headline text-5xl text-on-surface">{cat.name}</h2>
                <p className="font-label text-tertiary text-sm tracking-widest uppercase hidden md:block">Authentic Selections</p>
              </div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12"
              >
                <AnimatePresence>
                  {filteredItems.filter((item: any) => item.category_id === cat.id && item.is_available).map((item: any) => (
                    <motion.div 
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id} 
                      className="group"
                    >
                    <div className="h-64 bg-surface-container rounded-md overflow-hidden mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                      {item.image_url ? (
                        <img 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          src={item.image_url}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline-variant/20 bg-surface-container-high">
                           <span className="material-symbols-outlined text-4xl">restaurant</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline text-xl font-semibold text-on-surface">{item.name}</h3>
                      <span className="text-primary font-bold">${item.price}</span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.is_chefs_special && (
                        <span className="bg-primary/10 text-primary text-[9px] px-2 py-1 rounded-full uppercase font-bold tracking-widest border border-primary/20">Chef's Special</span>
                      )}
                      {item.dietary_info?.map((info: string) => (
                         <span key={info} className="bg-tertiary/10 text-on-tertiary-fixed-variant text-[9px] px-2 py-1 rounded-full uppercase font-bold tracking-tighter border border-tertiary/20">{info}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              </motion.div>
            </motion.section>
          ))
        )}

        {/* Wine Cellar Section */}
        {filteredWines.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            id="wine-cellar" 
            className="scroll-mt-40 pt-20 border-t border-outline-variant/20"
          >
            <div className="text-center mb-24">
              <span className="text-tertiary font-label tracking-[0.3em] uppercase text-xs mb-4 block">The Sommelier's Selection</span>
              <h2 className="font-headline text-6xl text-on-surface mb-6">The Wine <span className="italic text-primary text-5xl">Cellar</span></h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-px bg-primary mx-auto mb-8"
              ></motion.div>
              <p className="max-w-xl mx-auto text-on-surface-variant font-body">Our cellar houses a meticulous collection of regional gems and iconic Italian vintages, hand-picked to complement our seasonal harvests.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-20">
              {wineTypes.map((type: string) => {
                const winesOfType = filteredWines.filter((w: any) => w.type === type && w.is_available);
                if (winesOfType.length === 0) return null;
                
                return (
                  <div key={type} className="space-y-12">
                    <h3 className="font-headline text-3xl text-primary border-b border-outline-variant/10 pb-4">{type} Wines</h3>
                    <div className="space-y-10">
                      {winesOfType.map((wine: any) => (
                        <div key={wine.id} className="group cursor-default">
                          <div className="flex justify-between items-baseline mb-2 border-b border-dotted border-outline-variant/30 pb-1">
                            <div className="flex items-baseline gap-3">
                              <h4 className="font-headline text-xl text-on-surface group-hover:text-primary transition-colors">{wine.name}</h4>
                              <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">{wine.vintage}</span>
                            </div>
                            <div className="flex gap-6 items-baseline">
                              {wine.price_per_glass && <div className="text-on-surface font-label text-sm font-bold tracking-widest">${wine.price_per_glass}<span className="text-[10px] font-normal opacity-40 ml-1">/ G</span></div>}
                              {wine.price_per_bottle && <div className="text-on-surface font-label text-sm font-bold tracking-widest">${wine.price_per_bottle}<span className="text-[10px] font-normal opacity-40 ml-1">/ B</span></div>}
                            </div>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-sm text-on-surface-variant italic font-body opacity-80">{wine.region}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold max-w-[200px] text-right opacity-60 leading-tight">
                              {wine.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>

      <Newsletter />
    </main>
  );
}
