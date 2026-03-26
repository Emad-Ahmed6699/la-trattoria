import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery & Atmosphere",
  description: "A visual journey through our dining room, garden terrace, and exquisite culinary creations.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
