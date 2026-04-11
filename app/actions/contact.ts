"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { getContactEmailTemplate } from "@/utils/template-utils";

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
      html: getContactEmailTemplate({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message
      }),
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
