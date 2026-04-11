"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Schéma de validation
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendContactEmail(formData: FormData) {
  try {
    // Extraire et valider les données
    const rawName = formData.get('name') as string;
    const rawEmail = formData.get('email') as string;
    const rawMessage = formData.get('message') as string;

    const validatedData = ContactSchema.parse({
      name: rawName,
      email: rawEmail,
      message: rawMessage,
    });

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'ravelomanantsoamanoa89@gmail.com',
        pass: process.env.SMTP_PASS,
      },
    });

    // Options de l'email
    const mailOptions = {
      from: `"${validatedData.name}" <${validatedData.email}>`,
      to: 'ravelomanantsoamanoa89@gmail.com',
      subject: `Portfolio Contact - ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff;">
          <div style="background: linear-gradient(135deg, #00e5ff, #0088ff); padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold;">
              Portfolio Contact
            </h1>
          </div>
          
          <div style="padding: 30px; background: rgba(0, 0, 0, 0.8);">
            <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 10px;">
              Nouveau message
            </h2>
            
            <div style="background: rgba(0, 229, 255, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid rgba(0, 229, 255, 0.3);">
              <p style="margin: 10px 0;"><strong style="color: #00e5ff;">Nom:</strong> ${validatedData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #00e5ff;">Email:</strong> ${validatedData.email}</p>
              <p style="margin: 10px 0;"><strong style="color: #00e5ff;">Message:</strong></p>
              <div style="background: rgba(0, 0, 0, 0.5); padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${validatedData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Envoyé depuis le formulaire de contact du portfolio
            </p>
          </div>
        </div>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully!",
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error: " + error.issues[0]?.message,
      };
    }

    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}
