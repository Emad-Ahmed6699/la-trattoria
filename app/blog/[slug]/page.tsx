"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (!data) {
        router.push("/blog");
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-label tracking-widest uppercase text-xs">Unfolding story...</div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="bg-background">
      {/* Article Hero */}
      <header className="relative h-[70vh] w-full">
        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
           <Link href="/blog" className="text-white/60 hover:text-primary transition-colors mb-8 text-xs font-bold uppercase tracking-[0.3em] font-label">← Back to Journal</Link>
           <h1 className="font-headline text-5xl md:text-7xl text-white max-w-4xl leading-tight mb-8">{post.title}</h1>
           <div className="flex items-center gap-4 text-white/80 font-label uppercase text-[10px] tracking-widest">
              <span>{new Date(post.published_at).toLocaleDateString()}</span>
              <span className="w-1 h-1 bg-primary rounded-full"></span>
              <span>By {post.author}</span>
           </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto py-24 px-6">
         <div className="prose prose-lg prose-on-surface max-w-none font-body leading-relaxed text-on-surface-variant">
            {/* Split content by double newlines for basic paragraph handling */}
            {post.content.split('\n\n').map((para: string, idx: number) => (
              <p key={idx} className="mb-8 whitespace-pre-wrap">{para}</p>
            ))}
         </div>

         {/* Author Bio Simple */}
         <footer className="mt-24 pt-16 border-t border-outline-variant/10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1577214159280-532f35a1510b?q=80&w=200&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h4 className="font-headline text-xl text-on-surface mb-1">{post.author}</h4>
                  <p className="text-on-surface-variant text-sm font-body italic">Culinary Director at Restruent. Passionate about heritage grains and seasonal simplicity.</p>
               </div>
            </div>
         </footer>
      </article>

      {/* More Stories CTA */}
      <section className="bg-surface-container-low py-24 px-6 md:px-12 text-center">
         <h2 className="font-headline text-3xl mb-12">Craving more <span className="italic text-primary">inspiration?</span></h2>
         <Link href="/blog" className="bg-primary text-on-primary px-12 py-5 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary-container transition-all font-label inline-block">
            Explore All Stories
         </Link>
      </section>
    </main>
  );
}
