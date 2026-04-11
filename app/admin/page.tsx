"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Github, ExternalLink, Code2, Database, Globe, Smartphone, Lock, LogOut } from "lucide-react";

interface Project {
  id: string;
  title: string;
  icon: string;
  image: string;
  index: string;
  description: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Charger les projets depuis l'API
  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple pour l'admin (à améliorer avec NextAuth)
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Erreur lors de la suppression du projet');
      }
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get("title") as string,
      icon: formData.get("icon") as string,
      image: formData.get("image") as string,
      index: formData.get("index") as string,
      description: formData.get("description") as string,
    };

    try {
      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        });
      }
      
      await loadProjects();
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Erreur lors de la sauvegarde du projet');
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Globe,
      Code2,
      Database,
      Smartphone,
      Github,
      ExternalLink,
    };
    const Icon = icons[iconName] || Globe;
    return <Icon size={24} />;
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Lock size={48} className="mx-auto mb-4 text-cyan-400" />
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-zinc-400">Enter password to manage projects</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Access Admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Project Management</h1>
              <p className="text-zinc-400">Manage your portfolio projects</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddProject}
                className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add Project
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-600 transition-colors flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl w-full"
              >
                <h2 className="text-2xl font-bold mb-6">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        name="title"
                        defaultValue={editingProject?.title}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Index</label>
                      <input
                        name="index"
                        defaultValue={editingProject?.index}
                        placeholder="01"
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingProject?.description}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon</label>
                      <select
                        name="icon"
                        defaultValue={editingProject?.icon}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Globe">Globe</option>
                        <option value="Code2">Code2</option>
                        <option value="Database">Database</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Github">Github</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Image Path</label>
                      <input
                        name="image"
                        defaultValue={editingProject?.image}
                        placeholder="images/projects/project.png"
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
                      }}
                      className="px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      {editingProject ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Projects List */}
          <div className="grid gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-cyan-400">
                  {getIconComponent(project.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 text-sm font-mono">{project.index}</span>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">{project.description}</p>
                  <p className="text-zinc-500 text-xs mt-1">{project.image}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-3 bg-zinc-800 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
