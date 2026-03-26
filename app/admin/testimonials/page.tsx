"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Star, CheckCircle, Circle } from "lucide-react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTestimonial, setNewTestimonial] = useState({
    author_name: "",
    author_role: "",
    content: "",
    rating: 5,
    is_featured: false
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert([newTestimonial]);
    if (!error) {
      setNewTestimonial({ author_name: "", author_role: "", content: "", rating: 5, is_featured: false });
      fetchTestimonials();
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_featured: !current }).eq("id", id);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await supabase.from("testimonials").delete().eq("id", id);
      fetchTestimonials();
    }
  };

  if (loading) return <div className="p-8 animate-pulse text-on-surface-variant font-label uppercase tracking-widest text-xs">Loading Testimonials...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="font-headline text-4xl text-on-surface mb-2">Testimonials Management</h1>
        <p className="text-on-surface-variant font-body">Curate the best reviews to showcase on your homepage.</p>
      </header>

      {/* Create Form */}
      <section className="bg-surface-container rounded-md p-8 mb-12 shadow-sm border border-outline-variant/10">
        <h2 className="font-headline text-xl mb-6">Add New Testimonial</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            className="bg-surface border-outline-variant/30 rounded-sm p-3 font-body text-on-surface focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Author Name" 
            value={newTestimonial.author_name}
            onChange={(e) => setNewTestimonial({...newTestimonial, author_name: e.target.value})}
            required
          />
          <input 
            className="bg-surface border-outline-variant/30 rounded-sm p-3 font-body text-on-surface focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Author Role (e.g. Food Critic)" 
            value={newTestimonial.author_role}
            onChange={(e) => setNewTestimonial({...newTestimonial, author_role: e.target.value})}
          />
          <textarea 
            className="md:col-span-2 bg-surface border-outline-variant/30 rounded-sm p-3 font-body text-on-surface focus:ring-1 focus:ring-primary outline-none min-h-[100px]" 
            placeholder="Testimonial Content" 
            value={newTestimonial.content}
            onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
            required
          />
          <div className="flex items-center gap-4">
            <label id="rating-label" className="text-sm font-label text-on-surface-variant uppercase tracking-widest">Rating</label>
            <select 
              title="Rating"
              aria-labelledby="rating-label"
              className="bg-surface border-outline-variant/30 rounded-sm p-2 text-on-surface"
              value={newTestimonial.rating}
              onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
            >
              {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
            </select>
          </div>
          <button className="bg-primary text-on-primary font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-sm hover:bg-primary-container transition-colors">
            Save Testimonial
          </button>
        </form>
      </section>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-surface-container-low border border-outline-variant/10 p-6 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex text-tertiary">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <button 
                  onClick={() => toggleFeatured(t.id, t.is_featured)}
                  className={`text-xs font-bold uppercase tracking-tighter flex items-center gap-1 ${t.is_featured ? 'text-primary' : 'text-on-surface-variant/40'}`}
                >
                  {t.is_featured ? <CheckCircle size={14} /> : <Circle size={14} />}
                  Featured
                </button>
              </div>
              <p className="text-on-surface font-body italic text-sm mb-6 leading-relaxed">"{t.content}"</p>
            </div>
            <div className="flex justify-between items-end border-t border-outline-variant/5 pt-4 mt-auto">
              <div>
                <h4 className="font-headline text-lg text-on-surface">{t.author_name}</h4>
                <p className="text-[10px] text-tertiary font-label uppercase tracking-widest">{t.author_role}</p>
              </div>
              <button 
                title="Delete Testimonial"
                onClick={() => handleDelete(t.id)} 
                className="text-error hover:scale-110 transition-transform p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
