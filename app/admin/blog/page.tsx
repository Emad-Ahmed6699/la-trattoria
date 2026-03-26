"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase
      .from("blog_posts")
      .update({ is_published: !current })
      .eq("id", id);
    fetchPosts();
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface mb-2">Blog posts</h1>
          <p className="text-on-surface-variant font-body">Share stories, recipes, and news with your guests.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-primary text-on-primary px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container shadow-sm transition-all font-label flex items-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Write New Post
        </Link>
      </header>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low rounded-md border border-dashed border-outline-variant/30">
            <p className="text-on-surface-variant font-body text-sm italic">No blog posts yet. Start writing your first story!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-surface-container-lowest p-6 rounded-md border border-outline-variant/10 flex flex-col md:flex-row gap-6 group transition-all hover:border-primary/20">
              <div className="w-full md:w-48 h-32 bg-surface-container rounded-sm overflow-hidden flex-shrink-0">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline-variant">
                    <span className="material-symbols-outlined">image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-label text-tertiary uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${post.is_published ? 'bg-tertiary/10 text-tertiary' : 'bg-outline-variant/20 text-on-surface-variant'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl text-on-surface mb-2">{post.title}</h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2 font-body">{post.excerpt}</p>
                </div>
                <div className="flex justify-end gap-3 pt-6 md:pt-0">
                  <button 
                    onClick={() => togglePublish(post.id, post.is_published)}
                    className="text-on-surface-variant text-xs hover:text-primary transition-colors flex items-center gap-1 font-label uppercase font-bold tracking-tighter"
                  >
                    <span className="material-symbols-outlined text-[16px]">{post.is_published ? 'drafts' : 'publish'}</span>
                    {post.is_published ? 'Move to Draft' : 'Publish'}
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="text-error text-xs hover:bg-error/5 px-2 py-1 rounded-sm transition-all flex items-center gap-1 font-label uppercase font-bold tracking-tighter"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
