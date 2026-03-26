import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://latrattoria.com'; // Replace with actual production URL if available

  // Get dynamic blog posts
  const { data: posts } = await supabase.from('blog_posts').select('slug, updated_at');
  
  const blogUrls = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static routes
  const staticRoutes = [
    '',
    '/menu',
    '/about-us',
    '/gallery',
    '/blog',
    '/contact',
    '/reservations',
    '/events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...blogUrls];
}
