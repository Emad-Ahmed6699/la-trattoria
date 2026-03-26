"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_tag: "",
    valid_until: "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    const { data } = await supabase
      .from("promotions")
      .select("*")
      .order("created_at", { ascending: false });
    setPromos(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let image_url = null;
    if (imageFile) {
       const fileExt = imageFile.name.split('.').pop();
       const fileName = `${Math.random()}.${fileExt}`;
       const filePath = `promos/${fileName}`;
       const { error: uploadError } = await supabase.storage.from("menu-images").upload(filePath, imageFile);
       if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from("menu-images").getPublicUrl(filePath);
          image_url = publicUrl;
       }
    }

    const { error } = await supabase.from("promotions").insert([{
      ...formData,
      image_url,
      is_active: true
    }]);

    if (!error) {
      setFormData({ title: "", description: "", discount_tag: "", valid_until: "" });
      setImageFile(null);
      fetchPromos();
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("promotions").update({ is_active: !current }).eq("id", id);
    fetchPromos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this promotion?")) return;
    await supabase.from("promotions").delete().eq("id", id);
    fetchPromos();
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-headline text-4xl text-on-surface mb-2">Promotions & Offers</h1>
        <p className="text-on-surface-variant font-body">Manage special deals, seasonal menus, and temporary discounts.</p>
      </header>

      {/* Add Form */}
      <section className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
         <h2 className="font-headline text-xl mb-8">Create New Offer</h2>
         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div className="relative pt-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Promo Title</label>
                  <input 
                    title="Promo Title"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
                    placeholder="e.g., Summer Aperitivo Hour" 
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  />
               </div>
               <div className="relative pt-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Short Description</label>
                  <textarea 
                    title="Promo Description"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface resize-none" 
                    placeholder="Tell guests about the offer..." 
                    rows={2} required
                    value={formData.description}
                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  />
               </div>
            </div>

            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="relative pt-4">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Discount Tag</label>
                     <input 
                       title="Discount Tag"
                       className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
                       placeholder="e.g., 20% OFF" 
                       type="text"
                       value={formData.discount_tag}
                       onChange={(e) => setFormData(p => ({ ...p, discount_tag: e.target.value }))}
                     />
                  </div>
                  <div className="relative pt-4">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Valid Until</label>
                     <input 
                       title="Expiration Date"
                       className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
                       type="date"
                       value={formData.valid_until}
                       onChange={(e) => setFormData(p => ({ ...p, valid_until: e.target.value }))}
                     />
                  </div>
               </div>
               <div className="pt-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary font-label block mb-3">Promo Banner (Optional)</label>
                  <input 
                    title="Promo Image"
                    type="file" accept="image/*" 
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary cursor-pointer"
                  />
               </div>
               <button 
                type="submit" disabled={saving}
                className="w-full bg-primary text-on-primary py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label disabled:opacity-50"
               >
                 {saving ? "SAVING..." : "ACTIVATE PROMOTION"}
               </button>
            </div>
         </form>
      </section>

      {/* List */}
      <section className="space-y-6">
         <h2 className="font-headline text-xl">Active & Past Offers</h2>
         {loading ? (
            <div className="p-12 text-center animate-pulse text-xs font-label uppercase tracking-widest text-tertiary">Loading promos...</div>
         ) : promos.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-md border border-dashed border-outline-variant/30 italic text-on-surface-variant font-body">No promotions created yet.</div>
         ) : (
            <div className="grid gap-6">
               {promos.map((promo) => (
                  <div key={promo.id} className="bg-surface-container-lowest p-6 rounded-md border border-outline-variant/10 flex items-center justify-between group transition-all hover:border-primary/20">
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-surface-container rounded-sm overflow-hidden flex-shrink-0">
                           {promo.image_url && <img src={promo.image_url} className="w-full h-full object-cover" alt="" />}
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-headline text-xl text-on-surface">{promo.title}</h3>
                              {promo.discount_tag && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{promo.discount_tag}</span>}
                           </div>
                           <p className="text-on-surface-variant text-sm font-body line-clamp-1 italic">"{promo.description}"</p>
                           {promo.valid_until && <p className="text-[10px] font-label text-tertiary uppercase tracking-widest mt-2">Valid until: {promo.valid_until}</p>}
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleActive(promo.id, promo.is_active)}
                          className={`text-xs font-bold tracking-widest uppercase font-label px-4 py-2 rounded-full transition-all ${promo.is_active ? 'bg-tertiary text-on-tertiary' : 'bg-outline-variant/20 text-on-surface-variant'}`}
                        >
                           {promo.is_active ? 'Active' : 'Paused'}
                        </button>
                        <button 
                          onClick={() => handleDelete(promo.id)}
                          className="p-2 text-error opacity-0 group-hover:opacity-100 transition-all hover:bg-error/5 rounded-full"
                        >
                           <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </section>
    </div>
  );
}
