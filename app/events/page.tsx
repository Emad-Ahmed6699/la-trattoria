"use client";

import { useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";

export default function EventsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useLocalStorage("eventFormData", {
    name: "",
    email: "",
    eventDate: "",
    guestCount: "",
    eventNature: "Private Dining",
    specialRequests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { error: submitError } = await supabase
      .from("event_inquiries")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          event_date: formData.eventDate || null,
          guest_count: parseInt(formData.guestCount) || null,
          event_nature: formData.eventNature,
          special_requests: formData.specialRequests || null,
        },
      ]);

    if (submitError) {
      console.error("Submission error:", submitError);
      setError(`Failed to submit: ${submitError.message}`);
    } else {
      setSuccess("Thank you! Your event inquiry has been received.");
      setFormData({
        name: "",
        email: "",
        eventDate: "",
        guestCount: "",
        eventNature: "Private Dining",
        specialRequests: "",
      });
    }
    setLoading(false);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Private event at La Trattoria" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgr6Th4YZ7EGMbOMY6eTzlUZKnR4f5CGUFoXuLErLKFDhaNoJnpGkyVZZ8BetvQdD-DHaqj52r9syfJ3NumwyoIQ_5EqNXho2gQTCycyjZWe3_UE9JBqMHLWIGGqATvIG-9Dy5ReE9au0DBuEL_Bui-oO4HZY9C7adWLN8ahQUYgxzEziK8GcI896T4GlX2iEGXCu5jRZU_Nt4FudfLlyBGz5w8nnKe3krFr6aksiV8DQRupQCi_bmBmAH_cjugu2ua8DBa5Oud78" 
          />
          <div className="absolute inset-0 bg-on-surface/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-tertiary-fixed font-label tracking-[0.3em] uppercase text-xs mb-4 block">Celebrations & Gatherings</span>
            <h1 className="text-6xl md:text-8xl text-surface font-headline leading-[1.1] mb-8">Unforgettable Events</h1>
            <p className="text-lg text-surface/90 font-body max-w-lg mb-10 leading-relaxed">From intimate rehearsal dinners in our wine cellar to grand celebrations under the stars, La Trattoria provides the perfect backdrop for your most cherished moments.</p>
            <a className="inline-block bg-tertiary text-on-tertiary px-10 py-4 text-sm font-label tracking-widest hover:bg-tertiary-container transition-colors" href="#inquiry">INQUIRE NOW</a>
          </motion.div>
        </div>
      </section>

      {/* Private Spaces - Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-headline mb-4">Our Private Spaces</h2>
          <div className="w-24 h-px bg-primary"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[900px]">
          {/* Wine Cellar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-md"
          >
            <img 
              alt="The Wine Cellar" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcq79xpYtwYmqMfPYer_yDZzFqXfyk5hgOGAih2oZ9wn6rk6ngqeQQsh033r6_vRXfgjPaGckAd_DQ7ifSMNyrP5cVDwt-6bhr2OmJNlYlQ80H21Kt5sri2wJbudahdh7jmImNftLIdKvIkAAy5jfq1mzF2FJcf4Z_Bg49mgvraU4wuGf9ukvMAJA8ufLzJ3ax_uwvhLE99VGrRzO-atuPVvAo7nC9luU9Iz9hUTsh3Gbz0tDrAHQeXm_D5Lm9hoxLqbWvossfn1k" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-3xl text-surface font-headline mb-2">The Heritage Cellar</h3>
              <p className="text-surface/80 max-w-md mb-4">An intimate setting surrounded by our finest vintages. Perfect for groups of up to 14 guests.</p>
              <span className="text-tertiary-fixed text-xs font-label tracking-widest uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">group</span> Capacity: 14 Guests
              </span>
            </div>
          </motion.div>
          {/* Terrace */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-4 group relative overflow-hidden bg-surface-container rounded-md"
          >
            <img 
              alt="The Terrace" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuG02g3d55vRgbV9e0fbapaN-ng_D-KJBHTFm8T4TPdOgOjMgBB81Ex67D7fHWrub_5V7JQtzXCSWl4OkWBQrRY2ACQQY1bOLI51CLpn1fo2cnQyYDCjmu8T2HLkr47vLi_-zps4MR3823ObDXWm4eFpE0wW_B6PG2KJVHNOa16v1qOGiDzbQmWIz4mhio030hd2tpwT9yAL85G_KO7ze6NX3GWaGqlX6GjGT5iskCLHgGRf0YCxXHCMlWzL-KTWuT6uaxtnlUxCg" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-2xl text-surface font-headline mb-2">The Garden Terrace</h3>
              <p className="text-surface/80 text-sm mb-4">Al fresco dining among lemon trees and jasmine. Ideal for cocktail receptions.</p>
              <span className="text-tertiary-fixed text-xs font-label tracking-widest uppercase">Capacity: 40 Guests</span>
            </div>
          </motion.div>
          {/* Main Hall */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-5 group relative overflow-hidden bg-surface-container rounded-md"
          >
            <img 
              alt="The Main Hall" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_kEBwQ2XNZrfd3kBSepClTdcLPa6OUAsTscq0FmOzrfbRfse7cyb8XUVHgurDSK8NnCWZcfh7x0pX_gKIXcySsQQhGQClo9Zon9JG83mUNMes9k9LAmymZQ23Td4iIoIoSY2eMBCYIQohpyj3m-4nA0MKy0zvOR5KmDdFUfAi8fxA87ZW6vf-Q64m-rqBfTNc4QYyydEkdjRCKgV2ROaObHgyz22l-TXC-USTvIJBK-r9zVwzdqEb69m9M1ZScLDqjaVXj8kthhU" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-2xl text-surface font-headline mb-2">The Sala Grande</h3>
              <p className="text-surface/80 text-sm mb-4">Our grand dining room with soaring ceilings and artisanal chandeliers.</p>
              <span className="text-tertiary-fixed text-xs font-label tracking-widest uppercase">Capacity: 80 Guests</span>
            </div>
          </motion.div>
          {/* Catering */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-7 bg-surface-container-low p-12 flex flex-col justify-center border-l-4 border-primary"
          >
            <h3 className="text-3xl font-headline mb-6">Exquisite Catering</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">Bring the authentic taste of La Trattoria to your home or office. Our bespoke catering packages include curated multi-course menus, professional service staff, and wine pairings selected by our lead sommelier.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                <div>
                  <span className="block font-bold text-sm">Curated Menus</span>
                  <span className="text-xs text-on-surface-variant">Seasonal & Artisanal</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">wine_bar</span>
                <div>
                  <span className="block font-bold text-sm">Sommelier Service</span>
                  <span className="text-xs text-on-surface-variant">Expert Wine Pairings</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-surface-container py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-headline mb-6">Special Event Packages</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Thoughtfully designed experiences to simplify your planning while maximizing elegance.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Package 1 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="bg-surface p-10 flex flex-col items-center text-center shadow-sm"
            >
              <span className="material-symbols-outlined text-4xl text-tertiary mb-6">celebration</span>
              <h4 className="text-xl font-headline mb-4">The Tuscan Soirée</h4>
              <p className="text-sm text-on-surface-variant mb-8">4-course tasting menu, welcome prosecco, and artisanal bread service.</p>
              <div className="mt-auto pt-8 border-t border-outline-variant/30 w-full text-on-surface">
                <span className="text-xs font-label tracking-widest text-primary uppercase">Starting at $95/Guest</span>
              </div>
            </motion.div>
            {/* Package 2 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              className="bg-primary text-on-primary p-10 flex flex-col items-center text-center transform scale-105 shadow-xl relative z-10"
            >
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed mb-6 material-fill">star</span>
              <h4 className="text-xl font-headline mb-4 text-surface">The Grand Gala</h4>
              <p className="text-sm text-surface/80 mb-8">Full venue buyout, 6-course wine pairing dinner, and personalized floral arrangements.</p>
              <div className="mt-auto pt-8 border-t border-on-primary/20 w-full">
                <span className="text-xs font-label tracking-widest text-tertiary-fixed uppercase">Contact for Custom Pricing</span>
              </div>
            </motion.div>
            {/* Package 3 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-surface p-10 flex flex-col items-center text-center shadow-sm"
            >
              <span className="material-symbols-outlined text-4xl text-tertiary mb-6">groups</span>
              <h4 className="text-xl font-headline mb-4">Corporate Retreat</h4>
              <p className="text-sm text-on-surface-variant mb-8">Private morning use of the Terrace, light lunch, and afternoon espresso service.</p>
              <div className="mt-auto pt-8 border-t border-outline-variant/30 w-full text-on-surface">
                <span className="text-xs font-label tracking-widest text-primary uppercase">Starting at $65/Guest</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-headline mb-2">Event Gallery</h2>
              <p className="text-on-surface-variant font-body">Peek into the celebrations we've hosted.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-4 text-on-surface">
                <span 
                  className="material-symbols-outlined cursor-pointer hover:text-primary p-2" 
                  onClick={() => scroll("left")}
                  role="button"
                  aria-label="Scroll left"
                >
                  arrow_back
                </span>
                <span 
                  className="material-symbols-outlined cursor-pointer hover:text-primary p-2" 
                  onClick={() => scroll("right")}
                  role="button"
                  aria-label="Scroll right"
                >
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar scroll-smooth"
          >
            <div className="snap-start shrink-0 w-80 md:w-96">
              <img className="aspect-[4/5] object-cover rounded-md mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIoFl9CTUHsoIMqA9rm3WmqtOiP93BJssLB3K_9WVYxow-RyRLpab-o8U-bXYxcnV1hglGdSa8M2bviHjdmIheYi6RuNcK37pO0ot5xzhqxNOzGmdONfbTkQos0Y8s32g22588p7MccM__sIjM2JIfcr37uXkggVEeTH6lg_lYluZsSAhgUnWwoPhiKnIJsd3MYEQUpo03bX3GkVvgr68FjhwqFFiYfA0v4osBfelvB-sGeWWfbNDrDA58EFNBsjrGejjmWboIXmI" alt="Wedding reception" />
              <span className="text-xs font-label tracking-widest uppercase text-on-surface">Wedding Reception</span>
            </div>
            <div className="snap-start shrink-0 w-80 md:w-96">
              <img className="aspect-[4/5] object-cover rounded-md mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKvGrKg3h-u0QGL2MmdahTSJW2RaGjljqFtcMjcfbZH37Ua7Y57V-BbHSxwSgJ1XGOS_ha7iynop6eo6ZmviIQBnh8hX54TszQu5gxEvx3hnxzmaWtbEo39avQZhTlNjy_TcYBFeLjVui4I6_YsiGD1eLTG7nTjr12T_RdOzviM4mzMTs8_sFxHSP4d1ggI78N0r9jEAJZ0p62NpsAZbZ_UX25Gc0TiV9bPoI95yEHeMPFuT4WvdTVgnAm61rIjjk9_lky4Ak3guk" alt="Anniversary celebration" />
              <span className="text-xs font-label tracking-widest uppercase text-on-surface">Anniversary Celebration</span>
            </div>
            <div className="snap-start shrink-0 w-80 md:w-96">
              <img className="aspect-[4/5] object-cover rounded-md mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe8gB3WXMhuiXT4L8UHBaM0SB-WH_g5axbzRWSO-eR7_yvTEJFWo7J258sQC3HF9Mr3zhHIFjInHXiGV2BM1q4bDOH9nkoT-yIodTqT1Zrya-zXX4Yjv-YPPrh8zx5IL3XG4pmuqbJh1rfmE6wv7gRnLF-FjuLplgVLhG-JO0_2KmAUliipBvopcu1VyRBsqcJW-ONYB-XEECPp1Yk48teuYCS-X5ulk0D_Isu4Hiv869mR-gBzZiQI0SePDDiwQpLVpxF2qqk39U" alt="Chef's table" />
              <span className="text-xs font-label tracking-widest uppercase text-on-surface">Chef's Table Event</span>
            </div>
            <div className="snap-start shrink-0 w-80 md:w-96">
              <img className="aspect-[4/5] object-cover rounded-md mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYpSDaRX9eYC20lflH4Q53BvyWRvZOxnTctasf-kD_Ygf1tGeo9MoCCdxkbvKYEX-TCBwUebupcWcO81mW72ES2liJ1sKZZ9XDfktDN4CVoK78fHabCs5YEFVoxMTa2sTfrKOkbwWsGcA8WQRRfr3JSdR-FV5Pzs4w9c6vccbE3goW5ab10TaTy0MaaMuGFE7YGfaArDFRzsWxm2YjO-AbzCGyLOezkVFk7qK8eWTt_7-_vngCvDxIl4ZpHgP9XtkE83RtI1IKpY" alt="Corporate gala" />
              <span className="text-xs font-label tracking-widest uppercase text-on-surface">Corporate Gala</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-32 bg-surface-container-high" id="inquiry">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-surface p-12 md:p-20 shadow-sm border border-outline-variant/10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline mb-4 text-on-surface">Plan Your Event</h2>
              <p className="text-on-surface-variant font-body">Our events team will respond within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="relative pt-4">
                  <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Name</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface" 
                    placeholder="Full name" 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative pt-4">
                  <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Email</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface" 
                    placeholder="Email address" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative pt-4">
                  <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Event Date</label>
                  <input 
                    title="Event Date" 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface" 
                    type="date" 
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                </div>
                <div className="relative pt-4">
                  <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Guest Count</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface" 
                    placeholder="Approx. number" 
                    type="number" 
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  />
                </div>
              </div>
              <div className="relative pt-4">
                <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Nature of Event</label>
                <select 
                  title="Nature of Event" 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface cursor-pointer"
                  value={formData.eventNature}
                  onChange={(e) => setFormData({ ...formData, eventNature: e.target.value })}
                >
                  <option>Private Dining</option>
                  <option>Corporate Event</option>
                  <option>Wedding/Engagement</option>
                  <option>Off-site Catering</option>
                  <option>Other Celebration</option>
                </select>
              </div>
              <div className="relative pt-4">
                <label className="text-[10px] font-label tracking-widest uppercase text-tertiary block mb-2 absolute top-0">Special Requests</label>
                <textarea 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-tertiary transition-colors py-2 text-sm text-on-surface" 
                  placeholder="Tell us more about your vision..." 
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                ></textarea>
              </div>

              {success && <div className="p-4 bg-tertiary/10 text-tertiary text-sm rounded-sm font-body text-center">{success}</div>}
              {error && <div className="p-4 bg-error/10 text-error text-sm rounded-sm font-body text-center">{error}</div>}

              <div className="flex justify-center pt-8">
                <button 
                  disabled={loading}
                  className="bg-primary text-on-primary px-16 py-4 text-xs font-label tracking-[0.2em] hover:bg-primary-container transition-all disabled:opacity-50" 
                  type="submit"
                >
                  {loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
