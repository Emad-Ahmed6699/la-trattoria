"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewMenuItemPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    is_chefs_special: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("menu_categories").select("*").order("order_index");
      setCategories(data || []);
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from("menu-images")
          .getPublicUrl(filePath);
        image_url = publicUrl;
      }
    }

    const { error } = await supabase.from("menu_items").insert([{
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category_id: formData.category_id,
      is_chefs_special: formData.is_chefs_special,
      image_url
    }]);

    if (!error) {
      router.push("/admin/menu");
    } else {
      alert("Error saving dish: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header>
        <button onClick={() => router.back()} className="text-on-surface-variant text-xs mb-4 hover:text-primary transition-colors flex items-center gap-1">
           <span className="material-symbols-outlined text-[16px]">arrow_back</span>
           Back to Items
        </button>
        <h1 className="font-headline text-4xl text-on-surface mb-2">Add New Dish</h1>
        <p className="text-on-surface-variant font-body">Create a new entry for your seasonal menu.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 lg:p-12 border border-outline-variant/10 rounded-md space-y-10">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative pt-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Dish Name</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
              placeholder="e.g., Lobster Ravioli" 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="relative pt-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Price ($)</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
              placeholder="24.00" 
              type="number" 
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            />
          </div>
        </div>

        <div className="relative pt-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Category</label>
          <select 
            title="Category"
            className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface cursor-pointer"
            required
            value={formData.category_id}
            onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="relative pt-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Description</label>
          <textarea 
            title="Description"
            className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface resize-none" 
            placeholder="Describe the ingredients and flavors..." 
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          ></textarea>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary font-label block">Dish Photo</label>
           <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-48 h-48 bg-surface-container rounded-sm border border-outline-variant/10 overflow-hidden flex items-center justify-center">
                 {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                    <span className="material-symbols-outlined text-outline-variant text-4xl">add_a_photo</span>
                 )}
              </div>
              <div className="flex-1 space-y-4">
                 <p className="text-on-surface-variant text-xs font-body leading-relaxed">Upload a high-quality photo of your dish. Recommended size: 1200x800px. formats: JPG, PNG, WEBP.</p>
                 <input 
                  title="Upload Image"
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                 />
              </div>
           </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
           <input 
            type="checkbox" 
            id="chefs_special"
            className="w-4 h-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
            checked={formData.is_chefs_special}
            onChange={(e) => setFormData(prev => ({ ...prev, is_chefs_special: e.target.checked }))}
           />
           <label htmlFor="chefs_special" className="text-sm font-body text-on-surface select-none cursor-pointer">Mark as Chef's Special</label>
        </div>

        <div className="pt-8 border-t border-outline-variant/10 flex justify-end gap-6">
           <button 
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all font-label"
           >
            Cancel
           </button>
           <button 
            disabled={loading}
            className="bg-primary text-on-primary px-12 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label disabled:opacity-50" 
            type="submit"
          >
            {loading ? "SAVING DISH..." : "PUBLISH DISH"}
          </button>
        </div>
      </form>
    </div>
  );
}
