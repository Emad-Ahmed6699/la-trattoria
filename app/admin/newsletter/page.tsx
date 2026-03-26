"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("newsletter_subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubscribers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await supabase
      .from("newsletter_subscriptions")
      .update({ is_active: !currentStatus })
      .eq("id", id);
    fetchSubscribers();
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl text-on-surface mb-2">Newsletter Subscribers</h1>
          <p className="text-on-surface-variant font-body">Manage your audience and marketing outreach.</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-md border border-primary/20">
          <span className="text-primary font-bold">{subscribers.length}</span>
          <span className="ml-2 text-xs uppercase tracking-widest font-label opacity-70">Total Subs</span>
        </div>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-lg overflow-hidden">
        <table className="w-full text-left font-body">
          <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-widest font-label">
            <tr>
              <th className="px-8 py-4">Email Address</th>
              <th className="px-8 py-4">Subscribed At</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-8 py-6 font-medium text-on-surface">{sub.email}</td>
                <td className="px-8 py-6 text-on-surface-variant text-sm">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-sm">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    sub.is_active ? 'bg-success-container/30 text-success' : 'bg-error-container/30 text-error'
                  }`}>
                    {sub.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => toggleStatus(sub.id, sub.is_active)}
                    className="text-primary hover:text-tertiary text-xs font-bold uppercase transition-colors"
                  >
                    {sub.is_active ? 'Unsubscribe' : 'Re-activate'}
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-on-surface-variant opacity-50 italic">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
