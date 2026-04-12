import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  title: string;
  location: string;
}

const PROFILE_FILE = join(process.cwd(), 'data', 'profile.json');

// Default profile data
const defaultProfile: Profile = {
  fullName: "Manoa Ravelomanantsoa",
  email: "ravelomanantsoamanoa89@gmail.com",
  phone: "+261 34 00 000 00",
  bio: "Passionate Full-Stack Developer specializing in modern web technologies. I create elegant, performant, and user-centric digital experiences.",
  title: "Full-Stack Developer",
  location: "Madagascar"
};

// Initialiser le fichier profile.json s'il n'existe pas
async function initializeProfileFile() {
  try {
    await readFile(PROFILE_FILE);
  } catch {
    await writeFile(PROFILE_FILE, JSON.stringify(defaultProfile, null, 2));
  }
}

// GET - Récupérer le profil
export async function GET() {
  try {
    await initializeProfileFile();
    const data = await readFile(PROFILE_FILE, 'utf-8');
    const profile = JSON.parse(data);
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error reading profile:', error);
    return NextResponse.json(defaultProfile);
  }
}

// PUT - Mettre à jour le profil
export async function PUT(request: NextRequest) {
  try {
    await initializeProfileFile();
    const updatedProfile = await request.json();
    
    await writeFile(PROFILE_FILE, JSON.stringify(updatedProfile, null, 2));
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
