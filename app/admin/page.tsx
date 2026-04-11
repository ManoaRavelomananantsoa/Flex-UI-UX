"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Github, ExternalLink, Code2, Database, Globe, Smartphone, Lock, LogOut, User, Image, FolderKanban, ArrowRight } from "lucide-react";

type AdminSection = 'dashboard' | 'profile' | 'projects' | 'avatar';

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
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
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
    if (isAuthenticated && currentSection === 'projects') {
      loadProjects();
    }
  }, [isAuthenticated, currentSection]);

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
            <p className="text-zinc-400">Enter password to manage your portfolio</p>
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

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-zinc-400">Manage your portfolio content</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('profile')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <User size={24} />
            </div>
            <ArrowRight size={20} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2">Profile Info</h3>
          <p className="text-zinc-400 text-sm">Update your personal information, bio, and contact details</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('avatar')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <Image size={24} />
            </div>
            <ArrowRight size={20} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2">Profile Picture</h3>
          <p className="text-zinc-400 text-sm">Change your profile picture and avatar</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('projects')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
              <FolderKanban size={24} />
            </div>
            <ArrowRight size={20} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2">Projects</h3>
          <p className="text-zinc-400 text-sm">Add, edit, or remove portfolio projects</p>
        </motion.button>
      </div>
    </motion.div>
  );

  const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            defaultValue="Manoa Ravelomanantsoa"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue="ravelomanantsoamanoa89@gmail.com"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+261 34 35 894 73"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="Full-stack developer specializing in modern web technologies and clean architecture."
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );

  const renderAvatarSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Profile Picture</h2>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center">
            <User size={48} className="text-zinc-600" />
          </div>
          <div>
            <p className="text-zinc-400 mb-4">Current profile picture</p>
            <button className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
              Upload New Picture
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Or paste image URL</label>
          <input
            type="url"
            placeholder="https://example.com/profile.jpg"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderProjectsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {loading ? (
        <div className="text-center py-12">
          <div className="text-cyan-400">Loading projects...</div>
        </div>
      ) : (
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
      )}
    </motion.div>
  );

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              {currentSection === 'dashboard' ? (
                <>
                  <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                  <p className="text-zinc-400">Manage your portfolio content</p>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentSection('dashboard')}
                    className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2 mb-2"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    Back to Dashboard
                  </button>
                  <h1 className="text-4xl font-bold mb-2 capitalize">{currentSection}</h1>
                  <p className="text-zinc-400">
                    {currentSection === 'profile' && 'Update your personal information'}
                    {currentSection === 'avatar' && 'Change your profile picture'}
                    {currentSection === 'projects' && 'Manage your portfolio projects'}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-4">
              {currentSection === 'projects' && (
                <button
                  onClick={handleAddProject}
                  className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              )}
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
          {showForm && currentSection === 'projects' && (
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

          {/* Section Content */}
          {currentSection === 'dashboard' && renderDashboard()}
          {currentSection === 'profile' && renderProfileSection()}
          {currentSection === 'avatar' && renderAvatarSection()}
          {currentSection === 'projects' && renderProjectsSection()}

        </div>
      </section>
    </main>
  );
}
