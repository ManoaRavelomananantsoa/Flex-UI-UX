import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface Project {
  id: string;
  title: string;
  icon: string;
  image: string;
  index: string;
  description: string;
}

const PROJECTS_FILE = join(process.cwd(), 'data', 'projects.json');

// PUT - Mettre à jour un projet
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await readFile(PROJECTS_FILE, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    
    const updatedProject = await request.json();
    const index = projects.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = { ...projects[index], ...updatedProject, id: params.id };
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE - Supprimer un projet
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await readFile(PROJECTS_FILE, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    
    const index = projects.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects.splice(index, 1);
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
