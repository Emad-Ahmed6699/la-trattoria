"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    menuItems: 0,
    categories: 0,
    reservations: 0,
    blogPosts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: menuCount },
        { count: catCount },
        { count: resCount },
        { count: blogCount },
        { count: subCount }
      ] = await Promise.all([
        supabase.from("menu_items").select("*", { count: 'exact', head: true }),
        supabase.from("menu_categories").select("*", { count: 'exact', head: true }),
        supabase.from("reservations").select("*", { count: 'exact', head: true }),
        supabase.from("blog_posts").select("*", { count: 'exact', head: true }),
        supabase.from("newsletter_subscriptions").select("*", { count: 'exact', head: true })
      ]);

      setStats({
        menuItems: menuCount || 0,
        categories: catCount || 0,
        reservations: resCount || 0,
        blogPosts: blogCount || 0,
        subscribers: subCount || 0
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-headline text-4xl text-on-surface mb-2">Dashboard Overview</h1>
        <p className="text-on-surface-variant font-body">Welcome back. Here is what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
          <span className="text-tertiary font-label tracking-widest uppercase text-[10px] mb-4 block">Total Dishes</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-headline text-on-surface">{stats.menuItems}</span>
            <span className="material-symbols-outlined text-primary">restaurant_menu</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
          <span className="text-tertiary font-label tracking-widest uppercase text-[10px] mb-4 block">Reservations</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-headline text-on-surface">{stats.reservations}</span>
            <span className="material-symbols-outlined text-primary">book_online</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
          <span className="text-tertiary font-label tracking-widest uppercase text-[10px] mb-4 block">Recent Stories</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-headline text-on-surface">{stats.blogPosts}</span>
            <span className="material-symbols-outlined text-primary">article</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
          <span className="text-tertiary font-label tracking-widest uppercase text-[10px] mb-4 block">Newsletter Subs</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-headline text-on-surface">{stats.subscribers}</span>
            <span className="material-symbols-outlined text-primary">group</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-10 border border-outline-variant/10 rounded-md">
        <h2 className="font-headline text-2xl mb-8">Admin Instructions</h2>
        <div className="prose prose-on-surface max-w-none space-y-4 text-on-surface-variant font-body text-sm leading-relaxed">
           <p>1. <strong>Manage Categories</strong>: Define the sections of your menu (e.g., Pasta, Wine, Starters).</p>
           <p>2. <strong>Menu Items</strong>: Add your dishes, set descriptions, prices, and upload images. Images are automatically hosted on Supabase Storage.</p>
           <p>3. <strong>Instant Updates</strong>: Any change you make here is reflected on the public <Link href="/menu" className="text-primary underline">/menu</Link> page immediately.</p>
        </div>
      </div>
    </div>
  );
}
