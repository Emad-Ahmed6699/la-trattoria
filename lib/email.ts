// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://latrattoria.com';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@latrattoria.com';

// Helper function for optional admin notification section
const getSpecialRequestsHtml = (requests: string | null | undefined): string => {
  return requests ? `<p><strong>ملاحظات خاصة:</strong> ${requests}</p>` : '';
};

// Email templates
const emailTemplates = {
  reservationConfirmation: (data: {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
  }) => ({
    subject: 'حجزك في لاتراتوريا - Reservation Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F9F6F0;">
        <div style="background: #7A1F3F; color: white; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">La Trattoria</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.8;">Modern Italian Cuisine</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <h2 style="color: #7A1F3F; margin-top: 0;">حجزك تم تأكيده! 🎉</h2>
          <p style="color: #554246; line-height: 1.6;">
            شكراً لاختيارك لاتراتوريا، ${data.name}!
          </p>
          
          <div style="background: #F9F6F0; padding: 20px; border-left: 4px solid #C96E4B; margin: 20px 0;">
            <h3 style="color: #7A1F3F; margin-top: 0;">تفاصيل الحجز</h3>
            <p style="margin: 8px 0;"><strong>التاريخ:</strong> ${data.date}</p>
            <p style="margin: 8px 0;"><strong>الوقت:</strong> ${data.time}</p>
            <p style="margin: 8px 0;"><strong>عدد الأشخاص:</strong> ${data.guests}</p>
          </div>
          
          <p style="color: #554246; line-height: 1.6;">
            تطلعنا لرؤيتك! إذا كنت بحاجة إلى تعديل حجزك، يرجى الاتصال بنا على الرقم أعلاه.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dac0c5; text-align: center; color: #554246; font-size: 12px;">
            <p style="margin: 5px 0;">
              <strong>La Trattoria</strong><br>
              124 Via della Conciliazione<br>
              Rome, RM 00193, Italy<br>
              <a href="tel:+390612345678" style="color: #7A1F3F; text-decoration: none;">+39 06 1234 5678</a>
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  contactAcknowledgement: (data: {
    name: string;
    email: string;
    subject: string;
  }) => ({
    subject: 'شكراً لتواصلك معنا - We Received Your Message',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F9F6F0;">
        <div style="background: #7A1F3F; color: white; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">La Trattoria</h1>
        </div>
        
        <div style="padding: 40px; background: white;">
          <h2 style="color: #7A1F3F; margin-top: 0;">شكراً لرسالتك!</h2>
          <p style="color: #554246; line-height: 1.6;">
            مرحباً ${data.name}،<br><br>
            استلمنا رسالتك بخصوص: <strong>${data.subject}</strong><br>
            سنرد عليك في أقرب وقت ممكن.
          </p>
          
          <div style="background: #F9F6F0; padding: 20px; border-left: 4px solid #C96E4B; margin: 20px 0;">
            <p style="margin: 0; color: #554246;">
              وقت الاستجابة عادة: 24 ساعة
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dac0c5; text-align: center; color: #554246; font-size: 12px;">
            <a href="${siteUrl}" style="color: #7A1F3F; text-decoration: none;">العودة للموقع</a>
          </div>
        </div>
      </div>
    `,
  }),

  newsletterWelcome: (email: string) => ({
    subject: 'أهلاً بك في نشرتنا الإخبارية - Welcome to La Trattoria Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F9F6F0;">
        <div style="background: #7A1F3F; color: white; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">La Trattoria</h1>
        </div>
        
        <div style="padding: 40px; background: white;">
          <h2 style="color: #7A1F3F; margin-top: 0;">مرحباً بك في نشرتنا الإخبارية! 🎊</h2>
          
          <div style="background: linear-gradient(135deg, #7A1F3F 0%, #C96E4B 100%); color: white; padding: 30px; border-radius: 15px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 18px;">ستتلقى:</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li style="margin: 8px 0;">🍋 عروض وترويجات حصرية</li>
              <li style="margin: 8px 0;">📰 أخبار مطبخنا والمكونات الجديدة</li>
              <li style="margin: 8px 0;">🗓️ الأحداث والعروض الخاصة</li>
              <li style="margin: 8px 0;">👨‍🍳 نصائح الشيف والوصفات</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dac0c5; text-align: center; color: #554246; font-size: 12px;">
            <p style="margin: 5px 0;">
              يمكنك الاتغاء الاشتراك في أي وقت
            </p>
          </div>
        </div>
      </div>
    `,
  }),

  adminNotification: (type: 'reservation' | 'inquiry', data: any) => ({
    subject: `[لاتراتوريا] ${type === 'reservation' ? 'حجز جديد' : 'استفسار جديد'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #7A1F3F; border-bottom: 2px solid #C96E4B; padding-bottom: 10px;">
          ${type === 'reservation' ? '🎫 حجز جديد' : '📧 استفسار جديد'}
        </h2>
        
        ${type === 'reservation' ? `
          <div style="background: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 8px;">
            <p><strong>الاسم:</strong> ${data.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${data.email}</p>
            <p><strong>رقم الهاتف:</strong> ${data.phone}</p>
            <p><strong>التاريخ:</strong> ${data.date}</p>
            <p><strong>الوقت:</strong> ${data.time}</p>
            <p><strong>عدد الأشخاص:</strong> ${data.guests}</p>
            ${data.appliedPromo ? `<p style="color: #C96E4B;"><strong>🎁 العرض المطبق:</strong> ${data.appliedPromo}</p>` : ''}
            ${getSpecialRequestsHtml(data.requests)}
          </div>
          <p style="text-align: center;">
            <a href="${siteUrl}/admin/reservations" style="background: #7A1F3F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              اعرض الحجز في لوحة التحكم
            </a>
          </p>
        ` : `
          <div style="background: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 8px;">
            <p><strong>الاسم:</strong> ${data.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${data.email}</p>
            <p><strong>الموضوع:</strong> ${data.subject}</p>
            <p><strong>الرسالة:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 5px;">${data.message}</p>
          </div>
          <p style="text-align: center;">
            <a href="${siteUrl}/admin/inquiries" style="background: #7A1F3F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              الرد على الاستفسار
            </a>
          </p>
        `}
      </div>
    `,
  }),
};

export async function sendReservationConfirmation(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  appliedPromo?: string;
}) {
  try {
    const template = emailTemplates.reservationConfirmation(data);
    
    // Send to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: data.email,
      ...template,
    });

    // Notify admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: adminEmail,
      ...emailTemplates.adminNotification('reservation', data),
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendContactAcknowledgement(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // Send confirmation to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: data.email,
      ...emailTemplates.contactAcknowledgement({
        name: data.name,
        email: data.email,
        subject: data.subject,
      }),
    });

    // Notify admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: adminEmail,
      ...emailTemplates.adminNotification('inquiry', data),
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export async function sendNewsletterWelcome(email: string) {
  try {
    const template = emailTemplates.newsletterWelcome(email);
    
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      ...template,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
