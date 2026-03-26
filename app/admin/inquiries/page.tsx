"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type InquiryType = "contact" | "event";

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<InquiryType>("contact");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, [activeTab]);

  const fetchInquiries = async () => {
    setLoading(true);
    const table = activeTab === "contact" ? "contact_inquiries" : "event_inquiries";
    const { data } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    const table = activeTab === "contact" ? "contact_inquiries" : "event_inquiries";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) fetchInquiries();
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2">Inquiries</h1>
          <p className="text-on-surface-variant font-body">Manage guest messages and event requests.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/10 gap-8">
        <button 
          onClick={() => setActiveTab("contact")}
          className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === "contact" ? "border-primary text-primary" : "border-transparent text-on-surface-variant"}`}
        >
          General Contact
        </button>
        <button 
          onClick={() => setActiveTab("event")}
          className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === "event" ? "border-primary text-primary" : "border-transparent text-on-surface-variant"}`}
        >
          Events Inquiries
        </button>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse text-tertiary font-label tracking-widest uppercase text-xs">Loading Inquiries...</div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-surface-container-low p-12 text-center rounded-md border border-dashed border-outline-variant/30">
            <p className="text-on-surface-variant font-body text-sm italic">No inquiries found in this category.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="bg-surface-container-lowest p-8 rounded-md border border-outline-variant/10 space-y-4 group transition-all hover:border-primary/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-xl text-on-surface mb-1">{inq.name}</h3>
                  <div className="flex gap-4 text-xs font-body text-on-surface-variant">
                    <span>{inq.email}</span>
                    <span className="text-outline-variant">•</span>
                    <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(inq.id)}
                  className="p-2 text-error opacity-0 group-hover:opacity-100 transition-all hover:bg-error/5 rounded-full"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>

              {activeTab === "contact" ? (
                <div className="space-y-4 pt-4 border-t border-outline-variant/5">
                   {inq.subject && <p className="font-label text-[10px] uppercase tracking-widest text-tertiary">Subject: {inq.subject}</p>}
                   <p className="font-body text-sm text-on-surface leading-relaxed italic">"{inq.message}"</p>
                </div>
              ) : (
                <div className="space-y-6 pt-4 border-t border-outline-variant/5">
                   <div className="grid md:grid-cols-3 gap-6">
                      <div>
                         <span className="block text-tertiary font-label text-[8px] uppercase tracking-[0.2em] mb-1">Event Date</span>
                         <span className="text-sm font-body text-on-surface">{inq.event_date || "Not set"}</span>
                      </div>
                      <div>
                         <span className="block text-tertiary font-label text-[8px] uppercase tracking-[0.2em] mb-1">Guests</span>
                         <span className="text-sm font-body text-on-surface">{inq.guest_count || "0"}</span>
                      </div>
                      <div>
                         <span className="block text-tertiary font-label text-[8px] uppercase tracking-[0.2em] mb-1">Nature of Event</span>
                         <span className="text-sm font-body text-on-surface">{inq.event_nature || "General"}</span>
                      </div>
                   </div>
                   {inq.special_requests && (
                      <div className="bg-surface-container/30 p-4 rounded-sm">
                         <span className="block text-tertiary font-label text-[8px] uppercase tracking-[0.2em] mb-2">Special Requests</span>
                         <p className="text-sm font-body text-on-surface italic leading-relaxed">"{inq.special_requests}"</p>
                      </div>
                   )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
