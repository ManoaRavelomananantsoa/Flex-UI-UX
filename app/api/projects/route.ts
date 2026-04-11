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

// Initialiser le fichier projects.json s'il n'existe pas
async function initializeProjectsFile() {
  try {
    await readFile(PROJECTS_FILE);
  } catch {
    const defaultProjects = [
      { 
        id: "1",
        title: "Electro-view", 
        icon: "Globe", 
        image: "images/projects/Electro-view.png", 
        index: "01",
        description: "Graphical simulation application for voltage and current intensity"
      },
      { 
        id: "2",
        title: "Career Management", 
        icon: "Code2", 
        image: "images/projects/gestion-carriere.png", 
        index: "02",
        description: "Career management application with process tracking"
      },
      { 
        id: "3",
        title: "Tri-Fako", 
        icon: "Database", 
        image: "images/projects/logo-trifako.png", 
        index: "03",
        description: "Mobile app for decentralized waste distribution"
      },
      { 
        id: "4",
        title: "Color Detector", 
        icon: "Smartphone", 
        image: "images/projects/color-detector.png", 
        index: "04",
        description: "Real-time color detection via camera"
      },
    ];
    
    await writeFile(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2));
  }
}

// GET - Récupérer tous les projets
export async function GET() {
  try {
    await initializeProjectsFile();
    const data = await readFile(PROJECTS_FILE, 'utf-8');
    const projects = JSON.parse(data);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

// POST - Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    await initializeProjectsFile();
    const data = await readFile(PROJECTS_FILE, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    
    const newProject = await request.json();
    newProject.id = Date.now().toString();
    
    projects.push(newProject);
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
