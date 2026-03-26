#!/bin/bash
# Email System Setup & Testing Script
# قم بتشغيل هذا الملف لإعداد واختبار نظام البريد

echo "🚀 بدء إعداد نظام البريد"
echo "================================"

# 1. إضافة الحزم المطلوبة
echo ""
echo "📦 بتثبيت الحزم المطلوبة..."
npm install resend

# 2. إنشاء .env.local إذا لم يكن موجوداً
echo ""
echo "⚙️ إعداد متغيرات البيئة..."
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "✅ تم إنشاء ملف .env.local"
  echo "📝 الرجاء تعديل .env.local بـ:"
  echo "   - RESEND_API_KEY: احصل عليها من https://resend.com"
  echo "   - ADMIN_EMAIL: بريد المسؤول"
  echo "   - NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY"
else
  echo "✅ ملف .env.local موجود بالفعل"
fi

echo ""
echo "✨ الإعداد اكتمل!"
echo ""
echo "الخطوات التالية:"
echo "1️⃣ عدّل .env.local بمفاتيح الـ API"
echo "2️⃣ شغّل: npm run dev"
echo "3️⃣ اختبر الحجز: http://localhost:3000/reservations"
echo "4️⃣ اختبر الاستفسار: http://localhost:3000/contact"
echo "5️⃣ اختبر النيوزلتر: في الصفحة الرئيسية"
echo ""
