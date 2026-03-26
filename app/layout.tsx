import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-noto-serif" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: {
    default: "La Trattoria | Modern Italian Cuisine",
    template: "%s | La Trattoria"
  },
  description: "Experience authentic Italian heritage with a modern twist at La Trattoria. From handmade pasta to fine wines, indulge in a sophisticated culinary journey.",
  keywords: ["Italian Restaurant", "Modern Cuisine", "Wine Bar", "Fine Dining", "Pasta", "Gourmet Italian"],
  authors: [{ name: "La Trattoria Culinary Team" }],
  openGraph: {
    title: "La Trattoria | Modern Italian Cuisine",
    description: "Authentic Italian heritage with a modern twist.",
    url: "https://la-trattoria.vercel.app",
    siteName: "La Trattoria",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/components/LanguageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${notoSerif.variable} ${manrope.variable} font-body antialiased selection:bg-secondary-container selection:text-on-secondary-container bg-background text-on-surface`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
