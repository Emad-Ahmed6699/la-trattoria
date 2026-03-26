"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Clock, Mail, Phone, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
}

export default function ReservationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data: ReservationData) => {
    setIsSubmitting(true);
    setSuccessMsg("");
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMsg("Excellent! Your table at La Trattoria is being prepared. Check your inbox for confirmation details.");
        reset();
      } else {
        throw new Error("Failed to book reservation");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert("There was an issue processing your reservation. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl w-full max-w-2xl mx-auto border border-[#F0EEE8] relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7A1F3F] via-[#C96E4B] to-[#7A1F3F]" />
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-heading font-bold mb-4 text-[#1c1c18]">Secure Your Table</h2>
        <p className="text-[#554246] font-body text-lg italic opacity-80">An Unforgettable Culinary Journey Awaits</p>
      </div>
      
      {successMsg && (
        <div className="bg-[#F9F6F0] text-[#7A1F3F] p-6 rounded-2xl mb-10 text-center font-body border border-[#dac0c5] shadow-inner animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="font-bold text-xl mb-1">Grazie!</p>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-[#554246] ml-1">
              <User size={12} className="text-[#7A1F3F]" /> Full Name
            </label>
            <input 
              {...register("name", { required: "Name is required" })}
              className="w-full px-1 py-4 bg-transparent border-b border-[#dac0c5] outline-none focus:border-[#7A1F3F] font-body text-lg transition-all placeholder:text-[#554246]/30"
              placeholder="Giovanni Rossi"
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-body font-bold uppercase">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-[#554246] ml-1">
              <Mail size={12} className="text-[#7A1F3F]" /> Email Address
            </label>
            <input 
              type="email"
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              className="w-full px-1 py-4 bg-transparent border-b border-[#dac0c5] outline-none focus:border-[#7A1F3F] font-body text-lg transition-all placeholder:text-[#554246]/30"
              placeholder="gio@example.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-body font-bold uppercase">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-[#554246] ml-1">
              <Phone size={12} className="text-[#7A1F3F]" /> Phone Number
            </label>
            <input 
              {...register("phone", { required: "Phone is required" })}
              className="w-full px-1 py-4 bg-transparent border-b border-[#dac0c5] outline-none focus:border-[#7A1F3F] font-body text-lg transition-all placeholder:text-[#554246]/30"
              placeholder="+39 06"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-[#554246] ml-1">
              <Clock size={12} className="text-[#7A1F3F]" /> Arrival Time
            </label>
            <select 
              {...register("time", { required: "Time is required" })}
              className="w-full px-1 py-4 bg-transparent border-b border-[#dac0c5] outline-none focus:border-[#7A1F3F] font-body text-lg transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Time</option>
              {['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-[#554246] ml-1">
            <MessageSquare size={12} className="text-[#7A1F3F]" /> Special Requests
          </label>
          <textarea 
            {...register("requests")}
            rows={2}
            className="w-full px-1 py-4 bg-transparent border-b border-[#dac0c5] outline-none focus:border-[#7A1F3F] font-body text-lg transition-all resize-none placeholder:text-[#554246]/30"
            placeholder="Anniversary, dietary restrictions, preferred seating..."
          />
        </div>

        <div className="pt-6">
           <Button 
            role="submit"
            disabled={isSubmitting}
            className="w-full bg-[#7A1F3F] hover:bg-[#5c0429] text-white font-heading font-bold text-xl py-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] disabled:bg-[#7A1F3F]/50"
          >
            {isSubmitting ? "Prendendo nota..." : "Confirm Reservation"}
          </Button>
          <p className="text-center text-[10px] text-[#554246] mt-6 opacity-60 uppercase tracking-widest leading-loose">
            By confirming, you agree to our <span className="underline cursor-pointer hover:text-[#7A1F3F]">cancellation policy</span>.
          </p>
        </div>
      </form>
    </div>
  );
}
