"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
     return (
        <div className="min-h-screen bg-background flex items-center justify-center">
           <div className="animate-pulse text-primary font-label tracking-widest uppercase text-xs">Fetching stories...</div>
        </div>
     );
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts.length > 0 && searchQuery === "" ? filteredPosts[0] : null;
  const otherPosts = searchQuery === "" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-24">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-tertiary font-label tracking-widest uppercase text-xs mb-4 block">Our Journal</span>
            <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-8">Stories from the <span className="italic text-primary">Garden & Kitchen</span></h1>
            <p className="text-on-surface-variant text-lg leading-relaxed font-body">Exploring the heritage of Italian cuisine, the secrets of our seasonal harvests, and the art of modern hospitality.</p>
          </div>
          
          <div className="relative group w-full lg:w-96">
            <input 
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-4 px-12 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body text-sm text-on-surface shadow-sm"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">search</span>
          </div>
        </header>

        {posts.length === 0 ? (
           <div className="text-center py-20 bg-surface-container-low rounded-md border border-dashed border-outline-variant/30">
              <p className="text-on-surface-variant font-body italic">Our writers are busy crafting new stories. Please check back soon.</p>
           </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="relative h-[600px] md:h-[700px] rounded-md overflow-hidden group">
                <img 
                  src={featuredPost.image_url || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2000"} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest mb-6 inline-block">Featured Story</span>
                  <h2 className="font-headline text-4xl md:text-6xl text-white mb-6 leading-tight hover:text-primary transition-colors cursor-pointer">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-surface-variant text-lg mb-8 line-clamp-2 font-body leading-relaxed">{featuredPost.excerpt}</p>
                  <Link href={`/blog/${featuredPost.slug}`} className="flex items-center gap-3 text-primary-fixed hover:gap-5 transition-all font-label uppercase text-xs font-bold tracking-[0.2em]">
                    Read Full Story
                    <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                  </Link>
                </div>
              </section>
            )}

            {/* Post Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {otherPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="aspect-[4/5] bg-surface-container rounded-md overflow-hidden mb-8 shadow-sm">
                    <img 
                      src={post.image_url || "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-label text-tertiary uppercase tracking-widest">
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="font-headline text-2xl text-on-surface leading-tight hover:text-primary transition-colors cursor-pointer">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed line-clamp-3 font-body text-sm font-light">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-block pt-2 text-primary border-b border-primary/20 hover:border-primary transition-all text-xs font-bold uppercase tracking-widest font-label">
                      Read Story
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>

      {/* Newsletter / Call to Action */}
      <section className="mt-32 max-w-7xl mx-auto bg-surface-container-low rounded-md p-12 md:p-24 text-center border border-outline-variant/10">
        <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-6">Stay for the <span className="italic text-primary">Conversation</span></h2>
        <p className="text-on-surface-variant max-w-xl mx-auto mb-12 font-body text-lg">Join our community to receive seasonal recipes, event announcements, and exclusive kitchen insights directly in your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input className="flex-1 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary py-4 px-0 font-body text-sm" placeholder="Email Address" type="email" />
          <button className="bg-primary text-on-primary px-10 py-4 font-bold rounded-sm uppercase tracking-widest text-xs hover:bg-primary-container transition-all font-label">Subscribe</button>
        </div>
      </section>
    </main>
  );
}
