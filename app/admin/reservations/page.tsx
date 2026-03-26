"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminCalendar from "@/components/AdminCalendar";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"table" | "calendar">("table");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });
    setReservations(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    fetchReservations();
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2">Reservations</h1>
          <p className="text-on-surface-variant font-body">Manage upcoming table bookings.</p>
        </div>
        
        <div className="flex bg-surface-container p-1 rounded-full border border-outline-variant/10 shadow-inner">
          <button 
            onClick={() => setView("table")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${view === "table" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:text-on-surface"}`}
          >
            Table
          </button>
          <button 
            onClick={() => setView("calendar")}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${view === "calendar" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:text-on-surface"}`}
          >
            Calendar
          </button>
        </div>
      </header>

      {view === "calendar" ? (
        <AdminCalendar reservations={reservations} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Guest</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Date & Time</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary text-center">Party</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Special Requests</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-on-surface-variant font-body text-sm italic">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-6">
                      <p className="font-headline text-lg text-on-surface">{res.customer_name}</p>
                      <p className="text-on-surface-variant text-xs">{res.email}</p>
                      <p className="text-on-surface-variant text-xs">{res.phone}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-body text-sm font-bold text-primary">{res.reservation_date}</p>
                      <p className="font-body text-xs text-on-surface-variant">{res.reservation_time}</p>
                    </td>
                    <td className="p-6 text-center">
                      <span className="bg-surface-container px-3 py-1 rounded-sm font-headline text-lg border border-outline-variant/5">
                        {res.guests}
                      </span>
                    </td>
                    <td className="p-6 max-w-xs">
                      <p className="text-xs text-on-surface-variant line-clamp-3 italic">
                        {res.special_requests || "None"}
                      </p>
                      {res.occasion && (
                        <span className="mt-2 inline-block bg-tertiary/10 text-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                          {res.occasion}
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                       <button 
                        onClick={() => handleDelete(res.id)}
                        className="p-2 text-error hover:bg-error/5 rounded-full transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
