# La Trattoria - Modern Italian Cuisine Website

A premium, upscale restaurant website built with **Next.js 14**, **Tailwind CSS**, **Stripe**, and **Supabase**.

## 🌟 Overview
La Trattoria is a state-of-the-art web application for a modern Italian restaurant. It features a sleek, editorial design system, seamless reservation management, and an integrated gift card system powered by Stripe.

## 🎨 Design System: "The Modern Viticulturist"
This project implements a custom editorial design system characterized by:
- **Palette:** Warm, light-mode foundation (Off-white) with Deep Burgundy (#7A1F3F) and Terracotta (#C96E4B) accents.
- **Typography:** Modern Google Fonts (`Montserrat` for headings, `Open Sans` for body text).
- **Feel:** Elegant, clean UI with soft spacing and rounded corners.

## 🚀 Features
- **🏠 Homepage:** Stunning hero section, philosophy overview, and critical CTAs.
- **🍴 Menu Page:** Built-in client-side filtering for robust menu categorization (Appetizers, Mains, Wine List, etc.).
- **📅 Reservations:** Comprehensive booking form with real-time validation via `react-hook-form`.
- **🎁 Gift Cards:** Fully integrated gift card purchase flow with Stripe Checkout and balance verification.
- **💳 Payments:** Secure payment processing using Stripe Webhooks for gift card issuance.
- **🗄️ Database:** Supabase integration for storing reservations and inquiries.
- **📧 Email Notifications:** Automated email system using **Resend** for confirmations and newsletters.
- **📱 Responsive Navigation:** Sticky desktop navbar and a functional mobile drawer menu.
- **🌍 Internationalization:** Multi-language support (English and Arabic) powered by custom locale management.

## 🛠️ Tech Stack
- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Auth & Database:** [Supabase](https://supabase.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Email:** [Resend](https://resend.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Prerequisites
- Node.js 18.17 or later
- A Stripe account (for payments)
- A Supabase project (for database)
- A Resend API key (for emails)

### 2. Installation
```bash
git clone https://github.com/your-username/la-trattoria.git
cd la-trattoria
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

RESEND_API_KEY=re_...
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure
- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components.
- `/lib`: Utility functions and shared configurations.
- `/locales`: Translation files for i18n.
- `/public`: Static assets (images, icons).
- `/supabase`: Database migrations and configuration.

## 📜 License
This project is licensed under the MIT License.

---
*Built with ❤️ for La Trattoria*
