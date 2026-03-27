"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-tertiary font-label tracking-widest uppercase text-xs">Loading Dashboard...</div>
      </div>
    );
  }

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-surface-container-low border-r border-outline-variant/10 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex shadow-2xl lg:shadow-none`}
      >
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="font-headline text-2xl text-on-surface">Restruent <span className="text-primary text-xs ml-1 italic">Admin</span></h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-on-surface-variant flex items-center justify-center">
             <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Overview
          </Link>
          <Link 
            href="/admin/categories" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/categories" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">category</span>
            Categories
          </Link>
          <Link 
            href="/admin/menu" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/menu" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Menu Items
          </Link>
          <Link 
            href="/admin/reservations" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/reservations" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">book_online</span>
            Reservations
          </Link>
          <Link 
            href="/admin/inquiries" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/inquiries" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Inquiries
          </Link>
          <Link 
            href="/admin/blog" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/blog" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">article</span>
            Blog
          </Link>
          <Link 
            href="/admin/gallery" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/gallery" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">imagesmode</span>
            Gallery
          </Link>
          <Link 
            href="/admin/promotions" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/promotions" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">sell</span>
            Promotions
          </Link>
          <Link 
            href="/admin/newsletter" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/newsletter" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            Newsletter
          </Link>
          <Link 
            href="/admin/wines" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/wines" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">wine_bar</span>
            Wine List
          </Link>
          <Link 
            href="/admin/testimonials" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-sm text-sm font-medium transition-all ${pathname === "/admin/testimonials" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">reviews</span>
            Testimonials
          </Link>
        </nav>
        <div className="p-6 border-t border-outline-variant/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-left text-error text-sm font-medium hover:bg-error/5 rounded-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-surface-container-low border-b border-outline-variant/10 p-6 flex justify-between items-center sticky top-0 z-40 shadow-sm">
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="text-on-surface flex items-center justify-center relative w-10 h-10 border border-outline-variant/30 rounded-sm hover:bg-surface-container-high transition-colors"
             >
               <span className="material-symbols-outlined">menu</span>
             </button>
             <h2 className="font-headline text-xl text-on-surface">Restruent <span className="text-primary text-xs italic">Admin</span></h2>
           </div>
           <button onClick={handleLogout} className="text-error flex items-center justify-center p-2 rounded-sm hover:bg-error/10 transition-colors">
             <span className="material-symbols-outlined">logout</span>
           </button>
        </header>
        
        <div className="p-6 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
