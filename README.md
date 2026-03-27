# 🇮🇹 La Trattoria - Modern Italian Cuisine

[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://la-trattoria-xwwa.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

A premium, high-performance web application for **La Trattoria**, an upscale Italian restaurant. This project combines state-of-the-art web technologies with a sophisticated editorial design system to provide a seamless user experience.

🔗 **Live Demo:** [la-trattoria-xwwa.vercel.app](https://la-trattoria-xwwa.vercel.app/)

---

## ✨ Key Features

- **🎨 Premium Design System**: A custom "Modern Viticulturist" aesthetic featuring glassmorphism, smooth gradients, and a curated color palette (Burgundy & Terracotta).
- **🎭 Smooth Animations**: Powered by `framer-motion` for elegant entry transitions and interactive UI elements.
- **📅 Smart Reservations**: Real-time booking system with form persistence (`localStorage`) to ensure no data is lost during refreshes.
- **🎁 Gift Card Boutique**: Secure gift card purchasing flow integrated with **Stripe Checkout** and balance verification.
- **📧 Automated Notifications**: Instant email confirmations for bookings, inquiries, and news subscriptions using **Resend**.
- **📱 Responsive Excellence**: Fully optimized for mobile, tablet, and desktop with a specialized mobile drawer and scrollable navigation.
- **🖼️ Interactive Gallery**: Filterable photo gallery to showcase the restaurant's atmosphere and dishes.
- **📊 Admin Dashboard**: A responsive management interface for tracking house operations and reservations.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Custom Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React & Material Symbols

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (Checkout & Webhooks)
- **Email**: Resend API
- **Caching**: LocalStorage Persistence Hooks

---

## 📂 Project Structure

- `/app`: Next.js pages, layouts, and API route handlers.
- `/components`: Reusable UI building blocks (Navbar, Hero, Forms).
- `/lib`: Core logic for database, email templates, and Stripe integration.
- `/hooks`: Custom React hooks for state and persistence.
- `/public`: Static assets including high-resolution imagery and icons.

---

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/your-username/la-trattoria.git
   npm install
   ```

2. **Environment Setup**:
   Copy `.env.example` to `.env.local` and fill in your Supabase and Stripe credentials.

3. **Development**:
   ```bash
   npm run dev
   ```

---

## 📜 Documentation
For a deeper dive into the project's technical architecture, refer to:
- [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) - A comprehensive guide in Arabic.
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Technical details for the email system.

---
*Created with passion for authentic Italian hospitality.*
