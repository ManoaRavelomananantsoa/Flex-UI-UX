import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configuration Nodemailer (utiliser un service d'email comme Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'ravelomanantsoamanoa89@gmail.com',
        pass: process.env.SMTP_PASS, // Mot de passe d'application Gmail
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'ravelomanantsoamanoa89@gmail.com',
      subject: `Contact from Portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 10px;">
            Nouveau message du portfolio
          </h2>
          <div style="background: rgba(0, 0, 0, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; color: #333;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Envoyé depuis le formulaire de contact du portfolio
          </p>
        </div>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
