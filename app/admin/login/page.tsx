"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-surface-container-low p-8 lg:p-12 rounded-md shadow-sm border border-outline-variant/10">
        <div className="text-center mb-10">
          <h1 className="font-headline text-3xl mb-2 text-on-surface">Admin Access</h1>
          <p className="text-on-surface-variant font-body text-sm">Sign in to manage your restaurant</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="relative pt-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Email Address</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-surface-variant font-body text-on-surface" 
              placeholder="admin@restruent.com" 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative pt-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Password</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-surface-variant font-body text-on-surface" 
              placeholder="••••••••" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-error/10 text-error text-xs rounded-sm font-body">
              {error}
            </div>
          )}

          <div className="pt-6">
            <button 
              disabled={loading}
              className="w-full bg-primary text-on-primary px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label disabled:opacity-50" 
              type="submit"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-on-surface-variant text-xs hover:text-primary transition-colors font-body"
          >
            ← Back to Public Site
          </button>
        </div>
      </div>
    </main>
  );
}
