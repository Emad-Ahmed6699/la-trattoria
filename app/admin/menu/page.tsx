"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function MenuItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("menu_items")
      .select(`
        *,
        category:menu_categories(name)
      `)
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dish?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (!error) {
      fetchItems();
    }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await supabase
      .from("menu_items")
      .update({ is_available: !current })
      .eq("id", id);
    fetchItems();
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2">Menu Items</h1>
          <p className="text-on-surface-variant font-body">Add and update your restaurant's dishes.</p>
        </div>
        <Link 
          href="/admin/menu/new" 
          className="bg-primary text-on-primary px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label flex items-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New Dish
        </Link>
      </header>

      <div className="bg-surface-container-low rounded-md border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Dish</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Category</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Price</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary">Status</th>
                <th className="p-6 font-label text-[10px] uppercase tracking-widest text-tertiary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-on-surface-variant font-body text-sm italic">
                    No menu items found. Start by adding your first dish!
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface-container border border-outline-variant/10 rounded-sm overflow-hidden flex-shrink-0">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-outline-variant">
                              <span className="material-symbols-outlined">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-headline text-lg text-on-surface">{item.name}</p>
                          <p className="text-on-surface-variant text-[10px] uppercase tracking-tighter">ID: {item.id.split('-')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-body text-on-surface-variant">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="font-headline text-primary font-bold">${item.price}</span>
                    </td>
                    <td className="p-6">
                       <button 
                        onClick={() => toggleAvailability(item.id, item.is_available)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${item.is_available ? 'bg-tertiary/10 text-tertiary' : 'bg-outline-variant/20 text-on-surface-variant/50'}`}
                      >
                         <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-tertiary animate-pulse' : 'bg-on-surface-variant/30'}`}></span>
                         {item.is_available ? 'Available' : 'Sold Out'}
                       </button>
                    </td>
                    <td className="p-6 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-error hover:bg-error/5 rounded-full transition-all"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                       </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
