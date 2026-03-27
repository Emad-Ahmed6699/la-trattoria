"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LiveStatus from "./LiveStatus";
import ThemeToggle from "./ThemeToggle";

import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.menu"), href: "/menu" },
    { name: t("nav.about"), href: "/about-us" },
    { name: t("nav.reservations"), href: "/reservations" },
    { name: t("nav.events"), href: "/events" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
    { name: t("nav.gift_cards"), href: "/gift-cards" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-outline-variant/10">
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="text-2xl font-headline font-bold text-primary tracking-tight shrink-0">
          La Trattoria
        </Link>

        <div className="hidden lg:block">
          <LiveStatus />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-label text-on-surface hover:text-primary transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/reservations"
          className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-sm font-medium hover:bg-primary-container transition-all text-sm"
        >
          {t("nav.book_table")}
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-outline-variant/20 p-6 lg:hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300 max-h-[calc(100vh-70px)] overflow-y-auto shadow-2xl">
          <div className="mb-6 flex justify-center">
             <LiveStatus />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-label text-on-surface hover:text-primary transition-colors text-lg py-3 border-b border-outline-variant/5"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/reservations"
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-primary text-on-primary px-6 py-4 rounded-sm font-medium text-center shadow-lg"
          >
            {t("nav.book_table")}
          </Link>
        </div>
      )}
    </nav>
  );
}
