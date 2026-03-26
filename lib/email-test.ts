// lib/email-test.ts
// ملف اختبار مؤقت - استخدمه في البيئة المحلية فقط

/**
 * ملف اختبار البريد
 * 
 * الاستخدام:
 * 1. انسخ هذا الملف في lib/
 * 2. استورده في أي صفحة
 * 3. اتصل بالدوال للاختبار
 * 
 * ✅ آمن للاستخدام المحلي فقط
 * ❌ أزله من الإنتاج
 */

interface TestEmailData {
  email: string;
  name?: string;
  [key: string]: any;
}

/**
 * اختبر بريد الحجز
 */
export async function testReservationEmail(data: Partial<TestEmailData> = {}) {
  const testData = {
    name: data.name || "Test User",
    email: data.email || "test@example.com",
    phone: "+39 06 1234 5678",
    date: "2026-03-25",
    time: "19:00",
    guests: 2,
    requests: "Window seating preferred",
    ...data,
  };

  console.log("🧪 اختبار بريد الحجز:", testData);

  try {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log("✅ النتيجة:", result);
    return result;
  } catch (error) {
    console.error("❌ الخطأ:", error);
    throw error;
  }
}

/**
 * اختبر بريد الاستفسار
 */
export async function testContactEmail(data: Partial<TestEmailData> = {}) {
  const testData = {
    name: data.name || "Test Inquiry",
    email: data.email || "inquiry@example.com",
    subject: "General Inquiry",
    message: "This is a test message for the email system.",
    ...data,
  };

  console.log("🧪 اختبار بريد الاستفسار:", testData);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log("✅ النتيجة:", result);
    return result;
  } catch (error) {
    console.error("❌ الخطأ:", error);
    throw error;
  }
}

/**
 * اختبر بريد النيوزلتر
 */
export async function testNewsletterEmail(email: string = "newsletter@example.com") {
  console.log("🧪 اختبار بريد النيوزلتر:", email);

  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    console.log("✅ النتيجة:", result);
    return result;
  } catch (error) {
    console.error("❌ الخطأ:", error);
    throw error;
  }
}

/**
 * اختبر كل شيء مرة واحدة
 */
export async function testAllEmails() {
  console.log("🚀 بدء اختبار كل الرسائل...\n");

  try {
    console.log("1️⃣ اختبار الحجز...");
    await testReservationEmail({
      email: "reservation-test@example.com",
      name: "Test Reservation User",
    });
    console.log("");

    console.log("2️⃣ اختبار الاستفسار...");
    await testContactEmail({
      email: "contact-test@example.com",
      name: "Test Contact User",
    });
    console.log("");

    console.log("3️⃣ اختبار النيوزلتر...");
    await testNewsletterEmail("newsletter-test@example.com");
    console.log("");

    console.log("✅ انتهى الاختبار! تفقد Resend Dashboard للنتائج");
  } catch (error) {
    console.error("❌ حدث خطأ أثناء الاختبار:", error);
  }
}

/**
 * List all test functions
 */
export const emailTests = {
  testReservationEmail,
  testContactEmail,
  testNewsletterEmail,
  testAllEmails,
};

console.log("📧 Email test utilities loaded. Use in console:");
console.log("- emailTests.testReservationEmail()");
console.log("- emailTests.testContactEmail()");
console.log("- emailTests.testNewsletterEmail()");
console.log("- emailTests.testAllEmails()");
