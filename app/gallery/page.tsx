"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Newsletter from "@/components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const [selectedImage, setSelectedImage] = useState<any>(null);

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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedImage(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
       <div className="min-h-screen bg-background flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-label tracking-[0.3em] uppercase text-xs flex flex-col items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-primary animate-pulse"></div>
            Illuminating gallery...
          </motion.div>
       </div>
    );
  }

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <div className="py-20 md:py-32 px-6 pt-16 md:pt-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="text-tertiary font-label tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Visual Journey</span>
              <h1 className="text-6xl md:text-8xl font-headline leading-[0.9] text-on-surface">Capturing the <br/><span className="italic text-primary">Essence of Italy</span></h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <span className="bg-primary text-on-primary px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase font-label shadow-lg">Est. 1984</span>
              <div className="w-32 h-[1px] bg-outline-variant/30"></div>
            </motion.div>
          </div>

          {/* Filter / Category Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {categories.map((cat, idx) => (
              <motion.button 
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-sm text-[10px] font-bold tracking-widest uppercase font-label transition-all relative overflow-hidden group z-0 ${
                  activeCategory === cat 
                    ? "text-on-primary" 
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Grid Gallery */}
          {images.length === 0 ? (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-surface-container-low rounded-sm border border-dashed border-outline-variant/30 italic text-on-surface-variant font-body"
             >
                Our photographers are capturing new moments. Please check back soon.
             </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer bg-surface-container rounded-sm aspect-[4/5] overflow-hidden shadow-sm hover:shadow-2xl"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image 
                      alt={item.caption || "Gallery Image"} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      src={item.image_url} 
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-8 group-hover:translate-y-0">
                      <span className="text-tertiary-fixed text-[10px] font-bold font-label mb-3 uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">{item.category}</span>
                      <h3 className="text-on-primary text-3xl font-headline leading-tight italic translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200">{item.caption || "Restruent Moments"}</h3>
                      <div className="w-12 h-[2px] bg-tertiary-fixed mt-4 scale-0 group-hover:scale-100 transition-transform duration-700 delay-300 origin-left"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
              whileHover={{ rotate: 90 }}
              onClick={() => setSelectedImage(null)}
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full aspect-[4/3] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.image_url} 
                alt={selectedImage.caption} 
                fill
                className="object-contain"
              />
              <div className="absolute -bottom-20 left-0 right-0 text-center">
                <span className="text-tertiary-fixed text-[10px] font-bold uppercase tracking-[0.5em]">{selectedImage.category}</span>
                <h2 className="text-white text-3xl font-headline mt-2">{selectedImage.caption}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions Bar (Social Sharing) */}
      <section className="bg-surface-container-low py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-8 max-w-xl">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
                <span className="text-on-surface-variant text-[10px] font-bold font-label uppercase tracking-[0.3em] mb-4 block">Share the Experience</span>
                <h2 className="text-4xl font-headline text-on-surface leading-tight">Bring a piece of <br/>La Trattoria home.</h2>
             </motion.div>
              <div className="flex items-center gap-12">
                <motion.div 
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">share</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest font-label text-on-surface">Follow Us</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">public</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest font-label text-on-surface">Visit</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-tertiary transition-colors">mail</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest font-label text-on-surface">Email</span>
                </motion.div>
              </div>
          </div>
          <div className="hidden lg:block w-[1px] h-32 bg-outline-variant/30"></div>
          <motion.div 
            initial={{ opacity: 0, rotate: -3 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end gap-4 italic text-on-surface-variant font-headline text-3xl md:text-5xl text-right"
          >
            &quot;A picture is worth <br/>a thousand <span className="text-primary">flavors</span>.&quot;
            <div className="w-24 h-[1px] bg-primary/20"></div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
