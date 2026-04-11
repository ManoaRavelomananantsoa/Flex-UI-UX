import { readFileSync } from 'fs';
import { join } from 'path';

export function renderTemplate(templatePath: string, data: Record<string, string>): string {
  try {
    const template = readFileSync(templatePath, 'utf-8');
    let rendered = template;
  
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, value);
    });
    
    return rendered;
  } catch (error) {
    console.error('Error rendering template:', error);
    throw new Error(`Failed to render template: ${templatePath}`);
  }
}

export function getContactEmailTemplate(data: { name: string; email: string; message: string }): string {
  const templatePath = join(process.cwd(), 'templates', 'contact-email.html');
  return renderTemplate(templatePath, {
    name: data.name,
    email: data.email,
    message: data.message.replace(/\n/g, '<br>')
  });
}
