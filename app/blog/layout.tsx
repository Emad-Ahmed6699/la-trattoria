import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culinary Stories & News",
  description: "Stay updated with the latest from our kitchen, winery tours, and seasonal harvest stories.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
