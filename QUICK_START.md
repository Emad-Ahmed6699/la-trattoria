# 🚀 البدء السريع - Email System Quick Start

> اقرأ هذا أولاً إذا أردت البدء فوراً!

---

## ⚡ في 5 دقائق فقط

### 1️⃣ **احصل على API Key** (2 دقيقة)
```bash
# اذهب إلى: https://resend.com
# 1. اتسجل أو ادخل
# 2. اذهب إلى Settings > API Keys
# 3. نسخ المفتاح (يبدأ بـ re_)
```

### 2️⃣ **أضف المفتاح** (1 دقيقة)
```bash
# افتح: .env.local
# أضف:
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=admin@latrattoria.com
```

### 3️⃣ **شغّل الخادم** (1 دقيقة)
```bash
npm install resend
npm run dev
```

### 4️⃣ **جرّب** (1 دقيقة)
```
اذهب إلى: http://localhost:3000/reservations
ملأ النموذج واضغط Submit
تفقد بريدك!
```

---

## 📧 الرسائل التي سيتلقاها العميل

### عند الحجز:
```
✅ بريد تأكيد فوري بالتفاصيل
✅ يتضمن التاريخ والوقت وعدد الأشخاص
✅ به محتوى عربي واحترافي
```

### عند الاستفسار:
```
✅ رسالة شكر وتأكيد الاستقبال
✅ وعد بالرد خلال 24 ساعة
✅ روابط سهلة للعودة للموقع
```

### عند الاشتراك بالنيوزلتر:
```
✅ رسالة ترحيب حارة
✅ قائمة بالمزايا التي سيتلقاها
✅ تأكيد الاشتراك
```

---

## 📊 الرسائل التي سيتلقاها المسؤول

```
✅ إشعار فوري عند كل حجز جديد
✅ إشعار عند كل استفسار جديد
✅ روابط مباشرة لوحة التحكم
✅ كل التفاصيل في البريد مباشرة
```

---

## 🧪 الاختبار المحلي

### الطريقة 1: عبر الواجهة
```
1. اذهب إلى http://localhost:3000/reservations
2. أملأ النموذج بأي بيانات
3. اضغط "Secure Your Table"
4. تفقد بريدك (قد يستغرق 30 ثانية)
```

### الطريقة 2: عبر Console
```javascript
// في Browser Console (F12)
import { emailTests } from './lib/email-test.ts'
emailTests.testAllEmails()
```

### الطريقة 3: عبر cURL
```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test","email":"test@example.com",
    "phone":"+39","date":"2026-03-25",
    "time":"19:00","guests":2
  }'
```

---

## 🔧 حل المشاكل الشائعة

### ❌ "RESEND_API_KEY is undefined"
```bash
✅ الحل:
1. تأكد من وجود .env.local
2. تأكد من وجود RESEND_API_KEY
3. أعد تشغيل: npm run dev
```

### ❌ "Email failed"
```bash
✅ الحل:
البيانات محفوظة! البريد فقط فشل
- تفقد RESEND_API_KEY صحيح
- تفقد https://resend.com/logs
```

### ❌ "Database error"
```bash
✅ الحل:
1. تأكد من اتصال Supabase
2. تأكد من وجود الجداول:
   - reservations
   - contact_inquiries
   - newsletter_subscriptions
```

---

## 📚 الملفات المهمة

| الملف | الغرض |
|------|-------|
| `lib/email.ts` | 👈 كل منطق البريد |
| `app/api/reservations/route.ts` | حفظ الحجز + بريد |
| `app/api/contact/route.ts` | حفظ الاستفسار + بريد |
| `app/api/newsletter/route.ts` | اشتراك + بريد |
| `EMAIL_SYSTEM_GUIDE.md` | شرح شامل |
| `ADMIN_EMAIL_CHECKLIST.md` | قائمة مراجعة |

---

## 💡 نصائح مهمة

### ✅ افعل:
```
✅ اختبر محلياً أولاً
✅ استخدم Resend Dashboard للمراقبة
✅ احفظ API key في مكان آمن
✅ أعد تشغيل الخادم بعد تعديل .env
```

### ❌ لا تفعل:
```
❌ لا تضع API key في الكود
❌ لا تعدّل القوالب في التطبيق الحي
❌ لا تحذف .env.local
❌ لا تشارك API key مع أحد
```

---

## 🎯 الخطوات التالية

بعد التشغيل الناجح:

1. **📱 أخبر العملاء** عن النظام الجديد
2. **📊 راقب الأداء** عبر Resend Dashboard
3. **🎨 خصّص النماذج** حسب احتياجاتك
4. **📈 أضف تقارير** أسبوعية

---

## 📞 المساعدة

- 📖 اقرأ: `DEVELOPER_GUIDE.md`
- 📋 اتبع: `ADMIN_EMAIL_CHECKLIST.md`
- 🔗 اطلع: `EMAIL_SYSTEM_GUIDE.md`

---

## ✨ معلومات إضافية

### السعر:
```
✅ Resend: مجاني لـ 100 رسالة/يوم
✅ بعدها: $0.5 لـ 1000 رسالة
```

### الأداء:
```
✅ وقت التسليم: < 1 ثانية
✅ معدل النجاح: 99%+
✅ الدعم: 24/7
```

### الميزات:
```
✅ البريد صالح للإنتاج
✅ آمن وموثوق
✅ دعم عربي كامل
```

---

**أنت الآن جاهز! 🎉**

ابدأ الآن:
1. احصل على API Key
2. أضفه في .env.local
3. شغّل `npm run dev`
4. اختبر من الواجهة

وكل شيء سيعمل! ✅

---

*احفظ هذا الملف كـ Quick Reference*  
*آخر تحديث: 2026-03-17*
