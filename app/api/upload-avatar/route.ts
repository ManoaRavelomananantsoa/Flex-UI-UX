import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Créer le dossier profile s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'images', 'profile');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const filename = `me-${timestamp}${getFileExtension(file.name)}`;
    const filepath = join(uploadDir, filename);

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Retourner l'URL de l'image
    const imageUrl = `/images/profile/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop();
  return ext ? `.${ext}` : '.jpg';
}
