"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function WineAdminPage() {
  const [wines, setWines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newWine, setNewWine] = useState({
    name: "",
    vintage: "",
    region: "",
    type: "Red",
    price_per_glass: "",
    price_per_bottle: "",
    description: "",
    is_available: true
  });

  const fetchWines = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("wine_list")
      .select("*")
      .order("type", { ascending: false })
      .order("name");
    setWines(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWines();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("wine_list").insert([newWine]);
    setShowAdd(false);
    setNewWine({
      name: "",
      vintage: "",
      region: "",
      type: "Red",
      price_per_glass: "",
      price_per_bottle: "",
      description: "",
      is_available: true
    });
    fetchWines();
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await supabase.from("wine_list").update({ is_available: !current }).eq("id", id);
    fetchWines();
  };

  const deleteWine = async (id: string) => {
    if (confirm("Are you sure you want to remove this wine from the cellar?")) {
      await supabase.from("wine_list").delete().eq("id", id);
      fetchWines();
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl text-on-surface mb-2">The Wine Cellar</h1>
          <p className="text-on-surface-variant font-body">Manage your premium wine selection and inventory.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-tertiary transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> Add New Wine
        </button>
      </header>

      {showAdd && (
        <div className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-lg shadow-xl">
          <h2 className="font-headline text-2xl mb-6">Register New Vintage</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Wine Name</label>
              <input 
                required
                title="Wine Name"
                placeholder="e.g. Brunello di Montalcino"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.name}
                onChange={e => setNewWine({...newWine, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Type</label>
              <select 
                title="Wine Type"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.type}
                onChange={e => setNewWine({...newWine, type: e.target.value})}
              >
                <option>Red</option>
                <option>White</option>
                <option>Rosé</option>
                <option>Sparkling</option>
                <option>Dessert</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Vintage (Year)</label>
              <input 
                title="Vintage Year"
                placeholder="e.g. 2018"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.vintage}
                onChange={e => setNewWine({...newWine, vintage: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Region</label>
              <input 
                title="Region"
                placeholder="e.g. Tuscany, Italy"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.region}
                onChange={e => setNewWine({...newWine, region: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Price per Glass ($)</label>
              <input 
                type="number"
                step="0.01"
                title="Price per Glass"
                placeholder="0.00"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.price_per_glass}
                onChange={e => setNewWine({...newWine, price_per_glass: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Price per Bottle ($)</label>
              <input 
                type="number"
                step="0.01"
                title="Price per Bottle"
                placeholder="0.00"
                className="w-full bg-surface-container border-none p-4 rounded-sm"
                value={newWine.price_per_bottle}
                onChange={e => setNewWine({...newWine, price_per_bottle: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Sommelier's Description</label>
              <textarea 
                title="Sommelier's Description"
                placeholder="Describe the wine's profile..."
                className="w-full bg-surface-container border-none p-4 rounded-sm min-h-[100px]"
                value={newWine.description}
                onChange={e => setNewWine({...newWine, description: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button 
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-primary text-on-primary px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-tertiary transition-colors"
              >
                Save to Cellar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-widest font-label">
              <tr>
                <th className="px-8 py-4">Wine & Vintage</th>
                <th className="px-8 py-4">Type & Region</th>
                <th className="px-8 py-4">Pricing</th>
                <th className="px-8 py-4">Availability</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {wines.map((wine) => (
                <tr key={wine.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-headline text-lg text-on-surface">{wine.name}</div>
                    <div className="text-xs text-tertiary font-bold uppercase tracking-tighter mt-1">{wine.vintage || 'N/V'}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1 ${
                      wine.type === 'Red' ? 'bg-error-container/20 text-error' : 
                      wine.type === 'White' ? 'bg-success-container/20 text-success' : 
                      'bg-secondary-container/20 text-secondary'
                    }`}>
                      {wine.type}
                    </span>
                    <div className="text-sm text-on-surface-variant">{wine.region}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-primary">${wine.price_per_glass} <span className="text-[10px] text-on-surface-variant font-normal">/ Glass</span></div>
                    <div className="text-sm font-bold text-primary">${wine.price_per_bottle} <span className="text-[10px] text-on-surface-variant font-normal">/ Bottle</span></div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleAvailability(wine.id, wine.is_available)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                        wine.is_available ? 'bg-success-container text-on-success-container' : 'bg-surface-container-high text-on-surface-variant opacity-50'
                      }`}
                    >
                      {wine.is_available ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => deleteWine(wine.id)}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {wines.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-on-surface-variant opacity-50 italic">
                    The cellar is empty. Add your first wine to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
