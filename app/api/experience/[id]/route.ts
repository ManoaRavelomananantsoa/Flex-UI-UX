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

// PUT - Mettre à jour une expérience
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await readFile(EXPERIENCE_FILE, 'utf-8');
    const experiences: Experience[] = JSON.parse(data);
    
    const updatedExperience = await request.json();
    const index = experiences.findIndex(e => e.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    experiences[index] = { ...experiences[index], ...updatedExperience, id };
    await writeFile(EXPERIENCE_FILE, JSON.stringify(experiences, null, 2));
    
    return NextResponse.json(experiences[index]);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE - Supprimer une expérience
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await readFile(EXPERIENCE_FILE, 'utf-8');
    const experiences: Experience[] = JSON.parse(data);
    
    const index = experiences.findIndex(e => e.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    experiences.splice(index, 1);
    await writeFile(EXPERIENCE_FILE, JSON.stringify(experiences, null, 2));
    
    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
