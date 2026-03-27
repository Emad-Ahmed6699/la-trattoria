"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: result.message || "Thank you for subscribing!", type: "success" });
        setEmail("");
      } else {
        setMessage({ text: result.error || "Something went wrong. Please try again later.", type: "error" });
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setMessage({ text: "Something went wrong. Please try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-surface"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-6 text-on-surface">Join Our Newsletter</h2>
        <p className="text-on-surface-variant mb-10 text-lg font-body">Stay updated with our latest events and seasonal menus.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input 
            className="flex-1 bg-transparent border-b border-outline-variant focus:border-tertiary focus:ring-0 px-4 py-3 text-on-surface outline-none transition-all placeholder:text-outline-variant/60 font-body" 
            placeholder="Your email address" 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            disabled={loading}
            className="bg-primary text-on-primary px-10 py-3 rounded-sm font-label hover:bg-primary-container transition-colors uppercase tracking-widest text-sm disabled:opacity-50" 
            type="submit"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className={`mt-6 text-sm font-body ${message.type === "success" ? "text-primary" : "text-error"}`}>
            {message.text}
          </p>
        )}
      </div>
    </motion.section>
  );
}
