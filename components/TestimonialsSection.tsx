"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });
      setTestimonials(data || []);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 px-6 lg:px-20 bg-surface-container relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-full text-primary mb-12">
          <Quote size={32} />
        </div>
        
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="flex justify-center gap-1 mb-8 text-tertiary">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="font-headline text-3xl md:text-5xl text-on-surface leading-tight mb-12 italic">
                  "{testimonials[activeIndex].content}"
                </p>
                <div>
                  <h4 className="font-headline text-2xl text-primary">{testimonials[activeIndex].author_name}</h4>
                  <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant/60">{testimonials[activeIndex].author_role}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${idx === activeIndex ? 'w-12 bg-primary' : 'w-4 bg-outline-variant/30 hover:bg-outline-variant/60'}`}
              title={`View testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
