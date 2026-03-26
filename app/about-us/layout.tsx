import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Heritage",
  description: "Learn about the history, philosophy, and culinary journey of La Trattoria.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
