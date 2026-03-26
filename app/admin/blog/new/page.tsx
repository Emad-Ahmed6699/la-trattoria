"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Restruent Chef",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("menu-images") // Reusing the same bucket for simplicity
        .upload(filePath, imageFile);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from("menu-images")
          .getPublicUrl(filePath);
        image_url = publicUrl;
      }
    }

    const { error } = await supabase.from("blog_posts").insert([{
      ...formData,
      slug: generateSlug(formData.title) + '-' + Math.random().toString(36).substring(2, 7),
      image_url,
      is_published: true
    }]);

    if (!error) {
      router.push("/admin/blog");
    } else {
      alert("Error saving post: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header>
        <button onClick={() => router.back()} className="text-on-surface-variant text-xs mb-4 hover:text-primary transition-colors flex items-center gap-1">
           <span className="material-symbols-outlined text-[16px]">arrow_back</span>
           Back to Posts
        </button>
        <h1 className="font-headline text-4xl text-on-surface mb-2">Write New Post</h1>
        <p className="text-on-surface-variant font-body">Capture the essence of your restaurant in words.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 lg:p-12 border border-outline-variant/10 rounded-md space-y-10">
        <div className="relative pt-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Post Title</label>
          <input 
            className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-2xl md:text-3xl text-on-surface font-headline h-auto" 
            placeholder="e.g., The Secret to Our 8-Hour Ragù" 
            type="text" 
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div className="relative pt-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Excerpt / Summary</label>
          <textarea 
            title="Summary"
            className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors font-body text-on-surface resize-none" 
            placeholder="A brief introduction to the post..." 
            rows={2}
            required
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          ></textarea>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary font-label block">Cover Image</label>
           <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-64 h-40 bg-surface-container rounded-sm border border-outline-variant/10 overflow-hidden flex items-center justify-center">
                 {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                    <span className="material-symbols-outlined text-outline-variant text-4xl">add_a_photo</span>
                 )}
              </div>
              <div className="flex-1 space-y-4 pt-2">
                 <p className="text-on-surface-variant text-xs font-body leading-relaxed">Choose a visually striking image for your story. formats: JPG, PNG, WEBP.</p>
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

        <div className="relative pt-4">
          <label className="text-[10px] uppercase tracking-widest font-bold text-tertiary absolute top-0 font-label">Story Content</label>
          <textarea 
            title="Content"
            className="w-full bg-transparent border-0 border-outline-variant/10 p-6 focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all font-body text-on-surface resize-none min-h-[400px] leading-relaxed" 
            placeholder="Start writing your story here..." 
            required
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          ></textarea>
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
            {loading ? "SAVING POST..." : "PUBLISH STORY"}
          </button>
        </div>
      </form>
    </div>
  );
}
