"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("menu_categories")
      .select("*")
      .order("order_index", { ascending: true });
    setCategories(data || []);
    setLoading(false);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSaving(true);
    const { error } = await supabase
      .from("menu_categories")
      .insert([{ name: newName, order_index: categories.length }]);

    if (!error) {
      setNewName("");
      fetchCategories();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will delete all items in this category.")) return;

    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchCategories();
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2">Menu Categories</h1>
          <p className="text-on-surface-variant font-body">Manage the sections of your menu.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Add Category Form */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-md border border-outline-variant/10 h-fit">
          <h3 className="font-headline text-xl mb-8">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="space-y-6">
            <div className="relative pt-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Category Name</label>
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-surface-variant font-body text-on-surface" 
                placeholder="e.g., Pasta, Wine, Starters" 
                type="text" 
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <button 
              disabled={saving}
              className="w-full bg-primary text-on-primary px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-primary-container transition-all font-label disabled:opacity-50" 
              type="submit"
            >
              {saving ? "Saving..." : "Create Category"}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-8 space-y-4">
          {categories.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-md border border-dashed border-outline-variant/30">
              <p className="text-on-surface-variant font-body text-sm italic">No categories created yet.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="bg-surface-container-lowest p-6 rounded-md border border-outline-variant/10 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline-variant">drag_indicator</span>
                  <div>
                    <h4 className="font-headline text-xl text-on-surface">{cat.name}</h4>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-error hover:bg-error/5 rounded-full transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
