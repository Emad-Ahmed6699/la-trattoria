"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = [
  "All Moments",
  "Interior",
  "Plating",
  "Events",
  "Garden"
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Moments");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("*")
        .order("order_index", { ascending: true });
      setImages(data || []);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const filteredItems = activeCategory === "All Moments" 
    ? images 
    : images.filter(item => item.category === activeCategory);

  if (loading) {
    return (
       <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-primary font-label tracking-widest uppercase text-xs">Illuminating gallery...</div>
       </div>
    );
  }

  return (
    <main className="bg-background">
      <div className="py-20 md:py-32 px-6 pt-16 md:pt-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-tertiary font-label tracking-widest uppercase text-xs mb-4 block">Visual Journey</span>
              <h1 className="text-5xl md:text-7xl font-headline leading-tight text-on-surface">Capturing the Essence of Italy</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1 rounded-full text-xs font-bold tracking-tighter uppercase font-label">Est. 1984</span>
              <div className="w-24 h-[1px] bg-outline-variant/30"></div>
            </div>
          </div>

          {/* Filter / Category Selection */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-label transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-on-primary shadow-md" 
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Gallery */}
          {images.length === 0 ? (
             <div className="text-center py-20 bg-surface-container-low rounded-md border border-dashed border-outline-variant/30 italic text-on-surface-variant font-body">
                Our photographers are capturing new moments. Please check back soon.
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative group overflow-hidden bg-surface-container rounded-md aspect-[4/5]"
                >
                  <img 
                    alt={item.caption || "Gallery Image"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={item.image_url} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                    <span className="text-tertiary-fixed text-[10px] font-bold font-label mb-2 uppercase tracking-[0.3em]">{item.category}</span>
                    <h3 className="text-on-primary text-2xl font-headline leading-tight italic">{item.caption || "Restruent Moments"}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions Bar (Social Sharing) */}
      <section className="bg-surface-container-low py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-xs font-label uppercase tracking-widest">Share the Experience</span>
              <div className="flex items-center gap-8 mt-4">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">share</span>
                  <span className="text-sm font-label text-on-surface">Follow Us</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">public</span>
                  <span className="text-sm font-label text-on-surface">Visit</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">mail</span>
                  <span className="text-sm font-label text-on-surface">Email</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-highest h-[1px] md:h-12 md:w-[1px] w-full"></div>
          <div className="flex items-center gap-4 italic text-on-surface-variant font-headline">
            &quot;A picture is worth a thousand flavors.&quot;
          </div>
        </div>
      </section>

      {/* Newsletter / CTASection */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-headline mb-6 text-on-surface">Join Our Newsletter</h2>
          <p className="text-on-surface-variant mb-10 text-lg font-body">Stay updated with our latest events and seasonal menus.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              className="flex-1 bg-transparent border-b border-outline-variant focus:border-tertiary focus:ring-0 px-4 py-3 text-on-surface outline-none transition-all placeholder:text-outline-variant/60 font-body" 
              placeholder="Your email address" 
              type="email" 
            />
            <button className="bg-primary text-on-primary px-10 py-3 rounded-sm font-label hover:bg-primary-container transition-colors uppercase tracking-widest text-sm" type="submit">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
