import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentic Italian Menu",
  description: "Explore our curated selection of handmade pastas, fresh seafood, and premium wagyu beef.",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
