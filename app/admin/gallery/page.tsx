"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    caption: "",
    category: "Interior"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index", { ascending: true });
    setImages(data || []);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("menu-images") // Reusing the same bucket for simplicity
      .upload(filePath, selectedFile);

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("menu-images")
      .getPublicUrl(filePath);

    const { error } = await supabase.from("gallery_images").insert([{
      ...formData,
      image_url: publicUrl,
      order_index: images.length
    }]);

    if (!error) {
      setFormData({ caption: "", category: "Interior" });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from gallery?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchImages();
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-headline text-4xl text-on-surface mb-2">Gallery Management</h1>
        <p className="text-on-surface-variant font-body">Manage the photos displayed in your restaurant's gallery.</p>
      </header>

      {/* Upload Section */}
      <section className="bg-surface-container-lowest p-8 border border-outline-variant/10 rounded-md">
        <h2 className="font-headline text-xl mb-6">Add New Photo</h2>
        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-8 items-start">
           <div className="space-y-4">
              <div className="aspect-video bg-surface-container rounded-sm border border-outline-variant/10 overflow-hidden flex items-center justify-center">
                 {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                    <span className="material-symbols-outlined text-outline-variant text-4xl">add_a_photo</span>
                 )}
              </div>
              <input 
                title="Select Photo"
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                required={!previewUrl}
                className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
              />
           </div>

           <div className="space-y-6">
              <div className="relative pt-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Caption (Optional)</label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface" 
                  placeholder="e.g., Summer Evening on the Terrace" 
                  type="text" 
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                />
              </div>

              <div className="relative pt-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Category</label>
                <select 
                  title="Category"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="Interior">Interior</option>
                  <option value="Plating">Plating</option>
                  <option value="Events">Events</option>
                  <option value="Garden">Garden</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={uploading || !selectedFile}
                className="w-full bg-primary text-on-primary py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Add to Gallery"}
              </button>
           </div>
        </form>
      </section>

      {/* Gallery Grid */}
      <section className="space-y-6">
        <h2 className="font-headline text-xl">Current Photos ({images.length})</h2>
        {loading ? (
          <div className="p-12 text-center text-on-surface-variant font-label uppercase text-xs tracking-widest animate-pulse">Loading gallery...</div>
        ) : images.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low rounded-md border border-dashed border-outline-variant/30 italic text-on-surface-variant font-body">
            Gallery is empty. Upload some photos to get started!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square bg-surface-container rounded-md overflow-hidden border border-outline-variant/10">
                <img src={img.image_url} alt={img.caption} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-on-surface/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">{img.category}</p>
                   <p className="text-white/80 text-xs font-body line-clamp-2 mb-4 italic">"{img.caption}"</p>
                   <button 
                    onClick={() => handleDelete(img.id)}
                    className="w-full bg-error text-white py-2 rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-error-container transition-colors"
                   >
                    Delete
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
