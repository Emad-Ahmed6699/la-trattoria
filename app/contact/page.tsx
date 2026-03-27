"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useLocalStorage("contactFormData", {
    fullName: "",
    email: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.inquiryType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "Thank you! Your message has been sent successfully.");
        setFormData({
          fullName: "",
          email: "",
          inquiryType: "General Inquiry",
          message: "",
        });
      } else {
        const error = await response.json();
        setError(error.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };



  return (
    <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24 pt-32">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h1 className="font-headline text-5xl lg:text-7xl font-light mb-6 tracking-tight text-on-surface">Get in touch</h1>
        <p className="max-w-2xl text-lg text-on-surface-variant font-light leading-relaxed font-body">Whether you have a question about our menu, wish to book a private event, or simply want to share your experience, we would love to hear from you.</p>
      </motion.header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column: Info & Map */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 space-y-16"
        >
          {/* Contact Details */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary mb-6 font-label">Location</h2>
              <address className="not-italic font-headline text-2xl leading-relaxed text-on-surface">
                124 Via della Conciliazione<br />
                Rome, RM 00193<br />
                Italy
              </address>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary mb-6 font-label">Contact</h2>
              <div className="space-y-2">
                <p className="font-headline text-2xl text-on-surface">+39 06 6988 1234</p>
                <p className="font-headline text-2xl text-on-surface">ciao@latrattoria.it</p>
              </div>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary mb-6 font-label">Hours</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-sm font-label text-on-surface">Mon — Thu</p>
                  <p className="text-on-surface-variant text-sm font-body">12:00 – 22:00</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm font-label text-on-surface">Fri — Sat</p>
                  <p className="text-on-surface-variant text-sm font-body">12:00 – 23:30</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm font-label text-on-surface">Sunday</p>
                  <p className="text-on-surface-variant text-sm font-body">11:30 – 21:00</p>
                </div>
              </div>
            </section>
          </div>

          {/* ActionsBar */}
          <div className="flex flex-start items-center gap-8 pt-8 border-t border-outline-variant/20">
            <Link href="https://instagram.com/latrattoria" target="_blank" className="flex items-center gap-3 group cursor-pointer hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">share</span>
              <span className="text-sm font-semibold tracking-wide uppercase font-label text-on-surface">Follow Us</span>
            </Link>
            <Link href="https://goo.gl/maps/latrattoria" target="_blank" className="flex items-center gap-3 group cursor-pointer hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">public</span>
              <span className="text-sm font-semibold tracking-wide uppercase font-label text-on-surface">Visit</span>
            </Link>
            <a href="mailto:ciao@latrattoria.it" className="flex items-center gap-3 group cursor-pointer hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
              <span className="text-sm font-semibold tracking-wide uppercase font-label text-on-surface">Email</span>
            </a>
          </div>

          {/* Map Section */}
          <div className="relative w-full aspect-square lg:aspect-[4/3] bg-surface-container overflow-hidden rounded-md group shadow-inner">
            <iframe 
              src="https://maps.google.com/maps?q=Via%20della%20Conciliazione%20124,%20Roma&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="La Trattoria Location Map"
              className="hover:brightness-110 transition-all duration-700"
            ></iframe>
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-surface/90 backdrop-blur-sm p-3 rounded-sm shadow-lg border border-outline-variant/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-label mb-1">Visit Us</p>
                <Link 
                  href="https://www.google.com/maps/search/Via+della+Conciliazione+124,+Rome" 
                  target="_blank"
                  className="text-xs font-semibold text-on-surface hover:text-primary transition-colors flex items-center gap-2"
                >
                  Open in Maps <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="bg-surface-container-low p-8 lg:p-16 rounded-md">
            <h3 className="font-headline text-3xl mb-12 text-on-surface">Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative pt-4">
                  <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Full Name</label>
                  <input 
                    id="fullName"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-surface-variant font-body text-on-surface" 
                    placeholder="Giacomo Rossini" 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="relative pt-4">
                  <label htmlFor="contactEmail" className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Email Address</label>
                  <input 
                    id="contactEmail"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-surface-variant font-body text-on-surface" 
                    placeholder="giacomo@example.it" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="relative pt-4">
                <label htmlFor="inquiryType" className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Inquiry Type</label>
                <select 
                  id="inquiryType"
                  title="Inquiry Type" 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors appearance-none font-body text-on-surface cursor-pointer"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                >
                  <option>General Inquiry</option>
                  <option>Private Dining & Events</option>
                  <option>Press & Media</option>
                  <option>Careers</option>
                </select>
              </div>
              <div className="relative pt-4">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Message</label>
                <textarea 
                  id="message"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors resize-none placeholder:text-surface-variant font-body text-on-surface" 
                  placeholder="How can we assist you today?" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {success && <div className="p-4 bg-tertiary/10 text-tertiary text-sm rounded-sm font-body">{success}</div>}
              {error && <div className="p-4 bg-error/10 text-error text-sm rounded-sm font-body">{error}</div>}

              <div className="pt-6">
                <button 
                  disabled={loading}
                  className="w-full lg:w-auto bg-primary text-on-primary px-12 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label disabled:opacity-50" 
                  type="submit"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
          {/* Decorative Image */}
          <div className="mt-16 overflow-hidden rounded-md h-64 lg:h-80 relative group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsnCgev-sa6GHjIAwBbmIxTdTonmcArs6CNXD9an5vIiWZjVSDAFJX_zVqEIb2GLr5oUOH-TAsf8g_uQBLGGqehqmHvA9FGhUcK7Oaz883lUJItBmGM-ABhdIghd19sM7Nt1X5osiYp89Ld0MbwA3GVu1d7ZzaRxHt8toCNTCszBsyiI3DyYNpd2yxI7iOs-NGIVVA2vqGmSGl04m0HgpZ9hbOcjYrlKaJN-B2Mrvw6BXCYtwkwCCpIM3vFjcEuMPFNPvOEOlApzQ" 
              alt="Traditional Italian pasta and wine dining setting" 
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </div>
        </motion.div>
      </div>

      <Newsletter />
    </main>
  );
}
