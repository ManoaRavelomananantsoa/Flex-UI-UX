import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

const EXPERIENCE_FILE = join(process.cwd(), 'data', 'experience.json');

// Initialiser le fichier experience.json s'il n'existe pas
async function initializeExperienceFile() {
  try {
    await readFile(EXPERIENCE_FILE);
  } catch {
    const defaultExperiences: Experience[] = [];
    await writeFile(EXPERIENCE_FILE, JSON.stringify(defaultExperiences, null, 2));
  }
}

// GET - Récupérer toutes les expériences
export async function GET() {
  try {
    await initializeExperienceFile();
    const data = await readFile(EXPERIENCE_FILE, 'utf-8');
    const experiences = JSON.parse(data);
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error reading experiences:', error);
    return NextResponse.json({ error: 'Failed to read experiences' }, { status: 500 });
  }
}

// POST - Créer une nouvelle expérience
export async function POST(request: NextRequest) {
  try {
    await initializeExperienceFile();
    const data = await readFile(EXPERIENCE_FILE, 'utf-8');
    const experiences: Experience[] = JSON.parse(data);
    
    const newExperience = await request.json();
    newExperience.id = Date.now().toString();
    
    experiences.push(newExperience);
    await writeFile(EXPERIENCE_FILE, JSON.stringify(experiences, null, 2));
    
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
