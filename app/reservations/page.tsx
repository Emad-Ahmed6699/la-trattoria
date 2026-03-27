"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { supabase } from "@/lib/supabase";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";

function ReservationForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    partySize: "2 Guests",
    date: "",
    time: "19:00",
    guestName: "",
    email: "",
    phone: "",
    occasion: "",
    specialRequests: "",
    appliedPromo: "",
  });

  useEffect(() => {
    const promo = searchParams.get('promo');
    if (promo) {
      setFormData(prev => ({ ...prev, appliedPromo: promo }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.date) {
      setError("Please select a valid date for your reservation.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.guestName,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          guests: formData.partySize,
          occasion: formData.occasion,
          requests: formData.specialRequests,
          appliedPromo: formData.appliedPromo,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Your reservation has been received! Check your email for confirmation.");
        setFormData({
          partySize: "2 Guests",
          date: "",
          time: "19:00",
          guestName: "",
          email: "",
          phone: "",
          occasion: "",
          specialRequests: "",
          appliedPromo: "",
        });
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-16">
      <form onSubmit={handleSubmit} className="space-y-12">
        {formData.appliedPromo && (
          <div className="bg-tertiary/10 border-l-4 border-tertiary p-4 rounded-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-tertiary font-bold mb-1">Applied Offer</p>
              <p className="text-sm font-headline text-on-surface">{formData.appliedPromo}</p>
            </div>
            <span className="material-symbols-outlined text-tertiary">card_giftcard</span>
          </div>
        )}

        {/* Step 1: Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Party Size</label>
            <select 
              title="Party Size" 
              className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium focus:ring-0 cursor-pointer font-body"
              value={formData.partySize}
              onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
            >
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6+ Guests</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 font-body">
            <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Date</label>
            <input 
              title="Date" 
              className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium focus:ring-0 cursor-pointer" 
              type="date" 
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Time</label>
              <select 
                title="Time" 
                className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium focus:ring-0 cursor-pointer font-body"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
              <option>20:30</option>
              <option>21:00</option>
            </select>
          </div>
        </div>

        {/* Step 2: Contact Info */}
        <div className="space-y-8">
          <h3 className="text-xl font-headline border-b border-surface-container-highest pb-4 text-on-surface">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Full Name</label>
              <input 
                className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium placeholder:text-outline-variant focus:ring-0 font-body" 
                placeholder="Giacomo Rossi" 
                type="text" 
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Email Address</label>
              <input 
                className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium placeholder:text-outline-variant focus:ring-0 font-body" 
                placeholder="giacomo@example.it" 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Phone Number</label>
              <input 
                className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium placeholder:text-outline-variant focus:ring-0 font-body" 
                placeholder="+39 055 123 4567" 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Occasion (Optional)</label>
              <select 
                title="Occasion" 
                className="bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-surface font-medium focus:ring-0 cursor-pointer font-body"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              >
                <option value="">None</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Business Dinner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: Requests */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold font-label">Special Requests or Dietary Requirements</label>
          <textarea 
            className="w-full bg-surface-container-low border-0 p-4 text-on-surface font-medium placeholder:text-outline-variant focus:ring-0 rounded-sm font-body" 
            placeholder="Please let us know about any allergies or seating preferences..." 
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          ></textarea>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-4">
          <input className="mt-1 rounded-sm border-outline-variant text-primary focus:ring-primary h-4 w-4" id="terms" type="checkbox" required />
          <label className="text-xs text-outline leading-relaxed font-body" htmlFor="terms">
            I confirm the reservation details and agree to the <a className="underline text-primary" href="#">cancellation policy</a>. Tables are held for 15 minutes past the reservation time.
          </label>
        </div>

        {success && <div className="p-4 bg-tertiary/10 text-tertiary text-sm rounded-sm font-body">{success}</div>}
        {error && <div className="p-4 bg-error/10 text-error text-sm rounded-sm font-body">{error}</div>}

        <button 
          disabled={loading}
          className="w-full bg-primary text-on-primary py-5 text-sm font-bold tracking-[0.3em] uppercase hover:bg-primary-container transition-all flex items-center justify-center gap-3 font-label disabled:opacity-50" 
          type="submit"
        >
          {loading ? "Processing..." : "Confirm Reservation"}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </form>
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          alt="Restaurant Interior" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.1]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTaW5JkElCOH5rESgrbWzYxI6MYSZr-uLwrQVFVGp1iYkKhcPcQ92-WY9Rvx3MakHIh1pPo6LbXvPvfHVN9Dzx9G1bYqvnTy-7oGXzmx3JzUPYaHAqXC5EvdicUTBmDwV1uXe-SR-wqePP-jdMHAVwHgnsIytPTUbLbfbIBm92SyMbGYDhUUOjhM_fzvMx1CQqlNAGriF2fxsxY2InV3rQrqxor5F7t6xwUB0yjZzZRWDdvBOkx5j87Iq_-l0KFQlbZRLjMKDUEQ" 
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl text-surface font-headline mb-4 drop-shadow-lg">Secure Your Table</h1>
          <p className="text-surface-container-lowest text-lg max-w-2xl mx-auto font-light tracking-widest uppercase font-label">An Unforgettable Culinary Journey Awaits</p>
        </motion.div>
      </section>

      {/* Reservation Container */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl overflow-hidden rounded-sm">
          {/* Left Column: Image/Atmosphere */}
          <div className="lg:col-span-4 bg-primary text-on-primary p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-tertiary-fixed text-xs tracking-[0.2em] uppercase mb-6 block font-label">The Experience</span>
              <h2 className="text-4xl font-headline leading-tight mb-8">Taste the heart of Tuscany</h2>
              <p className="text-on-primary/80 font-light leading-relaxed mb-8 font-body">
                Join us for an evening defined by traditional flavors, seasonal ingredients, and our hand-selected wine cellar.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed">star_rate</span>
                  <span className="text-sm font-label">Michelin Recommended 2024</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed">wine_bar</span>
                  <span className="text-sm font-label">Over 400 Vintage Labels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed">local_fire_department</span>
                  <span className="text-sm font-label">Wood-fired Tradition</span>
                </li>
              </ul>
            </div>
            <div className="mt-12 pt-12 border-t border-on-primary/10 relative z-10">
              <p className="text-xs uppercase tracking-widest text-on-primary/60 mb-2 font-label">Location</p>
              <p className="text-sm italic font-body">Via della Vigna Nuova, 14R<br />Firenze, Italy</p>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <span className="material-symbols-outlined text-[200px] material-fill">restaurant</span>
            </div>
          </div>

            <Suspense fallback={<div className="lg:col-span-8 bg-surface-container-lowest p-16 text-center">Loading Reservation Form...</div>}>
              <ReservationForm />
            </Suspense>
        </div>
      </motion.section>

      <Newsletter />

      {/* Footer Map / ActionsBar Area */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
        <div className="bg-surface-container-high p-12 flex flex-col justify-center items-start gap-8">
          <h3 className="text-2xl font-headline text-on-surface">Contact & Location</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </div>
              <span className="text-sm font-medium tracking-wide font-label text-on-surface">Follow Us</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">public</span>
              </div>
              <span className="text-sm font-medium tracking-wide font-label text-on-surface">Visit</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <span className="text-sm font-medium tracking-wide font-label text-on-surface">Email</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden grayscale contrast-[0.8] opacity-80">
          <img 
            alt="Map location" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFEnOSpE8t3yXYBNfWQD1OGAuubeX50NehzlZBrgOSKTNGOMyKhx75L08rF85UFyVyfZfvshqKxVg66KAfxxPb4A-VqU_daTnGdtmDiMlKcAC_2vKMwlWLY4C3ThNPxhrPCr_OdvzxKjrJj2cZ9dkHg2TO9WzXYbL8pYTG00WM368wo-IZ6Gxj5LRKhELpb_q5_l-kNd8zYCfMWi35ACPSD47fIQBK-M5z_XaeuVHI0e40bC1NvyseNkA6_qoqkYNZadzeQwcN9i4" 
          />
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-primary text-5xl material-fill">location_on</span>
          </div>
        </div>
      </section>
    </main>
  );
}
