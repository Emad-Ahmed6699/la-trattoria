// DEVELOPER_GUIDE.md
# 👨‍💻 دليل المطورين - Email System

## 🎯 نظرة سريعة

نظام البريد بسيط وموثق بالكامل. إليك ما تحتاج معرفته:

### المسارات الرئيسية:
```
lib/email.ts              ← كل دوال البريد
app/api/reservations/*    ← حجز + بريد
app/api/contact/*         ← استفسار + بريد
app/api/newsletter/*      ← نيوزلتر + بريد
```

---

## 💻 كيفية الإضافة

### إضافة بريد جديد؟

1. **أنشئ template في `lib/email.ts`:**
```typescript
export const emailTemplates = {
  newEmail: (data: any) => ({
    subject: 'Your Subject',
    html: `<h1>Your content</h1>`
  }),
};
```

2. **أنشئ دالة إرسال:**
```typescript
export async function sendNewEmail(data: any) {
  try {
    await resend.emails.send({
      from: 'La Trattoria <notifications@latrattoria.com>',
      to: data.email,
      ...emailTemplates.newEmail(data),
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}
```

3. **استخدم في API route:**
```typescript
import { sendNewEmail } from '@/lib/email';

export async function POST(request: Request) {
  const data = await request.json();
  await sendNewEmail(data);
  return NextResponse.json({ success: true });
}
```

---

## 🔧 تعديل النماذج الموجودة

### مثال: تغيير لون بريد الحجز

في `lib/email.ts`، عدّل التالي:

```typescript
// قبل
<div style="background: #7A1F3F; color: white;">

// بعد  
<div style="background: #C96E4B; color: white;">
```

### مثال: إضافة معلومة جديدة

```typescript
const reservationConfirmation = (data) => ({
  // ... الكود الموجود
  html: `
    ...
    <p><strong>رقم الحجز:</strong> ${data.reservationId}</p>
    ...
  `
});
```

---

## 🧪 الاختبار المحلي

### اختبار بريد الحجز:
```bash
# 1. ابدأ الخادم
npm run dev

# 2. افتح الصفحة
# http://localhost:3000/reservations

# 3. ملأ النموذج واضغط Submit

# 4. تحقق من Resend logs أو بريدك
```

### اختبار API مباشرة:
```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+39 06 1234 5678",
    "date": "2026-03-25",
    "time": "19:00",
    "guests": 2
  }'
```

---

## 🔐 أفضل الممارسات

### ✅ افعل:
```typescript
// تحقق من البيانات دائماً
if (!data.email) {
  return NextResponse.json({ error: 'Email required' }, { status: 400 });
}

// لا توقف العملية على فشل البريد
try {
  await sendEmail(data);
} catch (error) {
  console.error('Email failed but data saved');
}

// استخدم متغيرات البيئة
const adminEmail = process.env.ADMIN_EMAIL;
```

### ❌ لا تفعل:
```typescript
// لا تضع API keys في الأكواد
const RESEND_KEY = 're_xxxxx'; // ❌ خطير!

// لا تكسر العملية على فشل البريد
throw new Error('Email failed'); // قد يفقد العميل حجزه

// لا تغير القوالب مباشرة في الـ Database
```

---

## 📊 قائمة Variables المتاحة

### في Reservation:
```typescript
data.name      // اسم العميل
data.email     // بريد العميل
data.phone     // هاتف العميل
data.date      // تاريخ الحجز
data.time      // وقت الحجز
data.guests    // عدد الأشخاص
data.requests  // ملاحظات خاصة
```

### في Contact:
```typescript
data.name      // اسم المرسل
data.email     // بريد المرسل
data.subject   // موضوع الاستفسار
data.message   // نص الرسالة
```

### في Newsletter:
```typescript
email          // بريد المشترك
```

---

## 🐛 استكشاف الأخطاء

### الخطأ: "RESEND_API_KEY is undefined"
```typescript
// الحل: تحقق من .env.local
// النمط: re_xxxxxxxxxxxxx مع ra_
```

### الخطأ: "Email failed but the save worked"
✅ هذا طبيعي! البيانات محفوظة، البريد فقط فشل.

### الخطأ: "400 Bad Request"
```typescript
// تحقق من البيانات المرسلة
console.log('Received data:', data);
// تحقق من الـ validation
```

---

## 📚 الموارد

- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/)

---

## 🎓 أمثلة إضافية

### إرسال بريد إلى أشخاص متعددين:
```typescript
await Promise.all([
  resend.emails.send({ to: 'user1@example.com', ... }),
  resend.emails.send({ to: 'user2@example.com', ... }),
  resend.emails.send({ to: 'admin@latrattoria.com', ... }),
]);
```

### إضافة HTML معقد:
```typescript
html: `
  <table width="100%" cellpadding="10">
    <tr>
      <td>الاسم</td>
      <td>${data.name}</td>
    </tr>
    <tr>
      <td>البريد</td>
      <td>${data.email}</td>
    </tr>
  </table>
`
```

---

*في حالة الأسئلة، راجع EMAIL_SYSTEM_GUIDE.md*
