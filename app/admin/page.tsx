"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Github, ExternalLink, Code2, Database, Globe, Smartphone, Lock, LogOut, User, Image, FolderKanban, ArrowRight, CheckCircle, XCircle, AlertCircle, Briefcase } from "lucide-react";

type AdminSection = 'dashboard' | 'profile' | 'projects' | 'avatar' | 'experience';

interface Project {
  id: string;
  title: string;
  icon: string;
  image: string;
  index: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  title: string;
  location: string;
}

const defaultProfile: Profile = {
  fullName: "Manoa Ravelomanantsoa",
  email: "ravelomanantsoamanoa89@gmail.com",
  phone: "+261 34 00 000 00",
  bio: "Passionate Full-Stack Developer specializing in modern web technologies. I create elegant, performant, and user-centric digital experiences.",
  title: "Full-Stack Developer",
  location: "Madagascar"
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [formProfile, setFormProfile] = useState<Profile>(defaultProfile);

  // Synchroniser le formulaire quand le profil est chargé
  useEffect(() => {
    setFormProfile(profile);
  }, [profile]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

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

  // Charger le profil depuis l'API
  const loadProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Sauvegarder le profil via l'API
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formProfile),
      });
      setProfile(formProfile);
      showToast('success', 'Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      showToast('error', 'Failed to save profile');
    }
  };

  // Mettre à jour un champ du formulaire
  const updateFormField = (field: keyof Profile, value: string) => {
    setFormProfile(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isAuthenticated && currentSection === 'projects') {
      loadProjects();
    }
    if (isAuthenticated && currentSection === 'experience') {
      loadExperiences();
    }
    if (isAuthenticated && currentSection === 'profile') {
      loadProfile();
    }
  }, [isAuthenticated, currentSection]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple pour l'admin (à améliorer avec NextAuth)
    if (!password.trim()) {
      showToast('error', 'Password is required');
      return;
    }
    if (password === "admin123") {
      setIsAuthenticated(true);
      showToast('success', 'Welcome back, Admin!');
    } else {
      showToast('error', 'Incorrect password');
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowExperienceForm(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setShowExperienceForm(true);
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      try {
        await fetch(`/api/experience/${id}`, { method: 'DELETE' });
        await loadExperiences();
        showToast('success', 'Experience deleted successfully');
      } catch (error) {
        console.error('Error deleting experience:', error);
        showToast('error', 'Failed to delete experience');
      }
    }
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newExperience: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
      current: formData.get("current") === 'true',
    };

    try {
      if (editingExperience) {
        await fetch(`/api/experience/${editingExperience.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newExperience),
        });
      } else {
        await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newExperience),
        });
      }
      
      await loadExperiences();
      setShowExperienceForm(false);
      setEditingExperience(null);
      showToast('success', 'Experience saved successfully');
    } catch (error) {
      console.error('Error saving experience:', error);
      showToast('error', 'Failed to save experience');
    }
  };

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        await loadProjects();
        showToast('success', 'Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        showToast('error', 'Failed to delete project');
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
      setShowProjectForm(false);
      setEditingProject(null);
      showToast('success', 'Project saved successfully');
    } catch (error) {
      console.error('Error saving project:', error);
      showToast('error', 'Failed to save project');
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

        {/* Toast Container */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden
                  backdrop-blur-xl font-['Rajdhani',sans-serif] tracking-wide
                  ${toast.type === 'success'
                    ? 'bg-emerald-400/[0.07] shadow-[0_0_0_1px_rgba(0,255,180,0.25),0_0_20px_rgba(0,255,180,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] text-emerald-200'
                    : toast.type === 'error'
                    ? 'bg-rose-400/[0.07] shadow-[0_0_0_1px_rgba(255,50,120,0.25),0_0_20px_rgba(255,50,120,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] text-rose-200'
                    : 'bg-sky-400/[0.07] shadow-[0_0_0_1px_rgba(80,180,255,0.25),0_0_20px_rgba(80,180,255,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] text-sky-200'
                  }`}
              >
                {/* Ligne lumineuse en haut */}
                <span className={`absolute top-0 left-4 right-4 h-px rounded-full opacity-60
                  ${toast.type === 'success' ? 'bg-linear-to-r from-transparent via-emerald-400 to-transparent'
                  : toast.type === 'error'   ? 'bg-linear-to-r from-transparent via-rose-400 to-transparent'
                  :                            'bg-linear-to-r from-transparent via-sky-400 to-transparent'}`}
                />

                {/* Icône */}
                <div className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0
                  ${toast.type === 'success' ? 'bg-emerald-400/10 shadow-[0_0_10px_rgba(0,255,180,0.3)]'
                  : toast.type === 'error'   ? 'bg-rose-400/10 shadow-[0_0_10px_rgba(255,50,120,0.3)]'
                  :                            'bg-sky-400/10 shadow-[0_0_10px_rgba(80,180,255,0.3)]'}`}>
                  {toast.type === 'success' && <CheckCircle size={14} />}
                  {toast.type === 'error'   && <XCircle size={14} />}
                  {toast.type === 'info'    && <AlertCircle size={14} />}
                </div>

                {/* Texte */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-widest opacity-50">
                    {toast.type === 'success' ? 'System OK' : toast.type === 'error' ? 'Alert' : 'Notice'}
                  </span>
                  <span className="text-[13px] font-semibold leading-tight">{toast.message}</span>
                </div>

                {/* Barre de progression */}
                <motion.span
                  className={`absolute bottom-0 left-4 right-4 h-px rounded-full
                    ${toast.type === 'success' ? 'bg-emerald-400/50'
                    : toast.type === 'error'   ? 'bg-rose-400/50'
                    :                            'bg-sky-400/50'}`}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 4, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('experience')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-colors">
              <Briefcase size={24} />
            </div>
            <ArrowRight size={20} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2">Experience</h3>
          <p className="text-zinc-400 text-sm">Add, edit, or remove work experience</p>
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
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Profile Information</h2>
      </div>
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formProfile.fullName}
              onChange={(e) => updateFormField('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title / Role</label>
            <input
              type="text"
              value={formProfile.title}
              onChange={(e) => updateFormField('title', e.target.value)}
              placeholder="e.g. Full-Stack Developer"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formProfile.email}
              onChange={(e) => updateFormField('email', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formProfile.phone}
              onChange={(e) => updateFormField('phone', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formProfile.location}
            onChange={(e) => updateFormField('location', e.target.value)}
            placeholder="e.g. Madagascar"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            value={formProfile.bio}
            onChange={(e) => updateFormField('bio', e.target.value)}
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
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Profile Picture</h2>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/images/profile/me.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-zinc-400 mb-4">Current profile picture</p>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);
                  
                  try {
                    const response = await fetch('/api/upload-avatar', {
                      method: 'POST',
                      body: formData,
                    });
                    const result = await response.json();
                    
                    if (result.success) {
                      showToast('success', 'Image uploaded successfully!');
                      // Recharger l'image
                      window.location.reload();
                    } else {
                      showToast('error', 'Failed to upload image');
                    }
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    showToast('error', 'Error uploading image');
                  }
                }
              }}
            />
            <button
              onClick={() => document.getElementById('avatar-upload')?.click()}
              className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
            >
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
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Projects Management</h2>
      </div>
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

  const renderExperienceSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Work Experience</h2>
      </div>
      <div className="grid gap-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                <p className="text-cyan-400 font-medium">{experience.company}</p>
                <p className="text-zinc-400 text-sm mt-1">
                  {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                </p>
                <p className="text-zinc-300 text-sm mt-3">{experience.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingExperience(experience);
                    setShowExperienceForm(true);
                  }}
                  className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-cyan-400"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience.id)}
                  className="p-3 bg-zinc-800 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            No experience added yet. Click "Add Experience" to add your work history.
          </div>
        )}
      </div>
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
                    {currentSection === 'experience' && 'Manage your work experience'}
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
              {currentSection === 'experience' && (
                <button
                  onClick={handleAddExperience}
                  className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Experience
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
          {showProjectForm && currentSection === 'projects' && (
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
                        setShowProjectForm(false);
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

          {/* Experience Form Modal */}
          {showExperienceForm && currentSection === 'experience' && (
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
                  {editingExperience ? "Edit Experience" : "Add New Experience"}
                </h2>
                <form onSubmit={handleSaveExperience} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      name="company"
                      defaultValue={editingExperience?.company}
                      placeholder="Company Name"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <input
                      name="position"
                      defaultValue={editingExperience?.position}
                      placeholder="Job Title"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input
                        name="startDate"
                        type="month"
                        defaultValue={editingExperience?.startDate}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input
                        name="endDate"
                        type="month"
                        defaultValue={editingExperience?.endDate}
                        disabled={editingExperience?.current}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="current"
                      id="current"
                      defaultChecked={editingExperience?.current}
                      className="w-4 h-4 bg-zinc-800 border-zinc-700 rounded text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="current" className="text-sm">Currently working here</label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingExperience?.description}
                      rows={3}
                      placeholder="Describe your role and achievements"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4 justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowExperienceForm(false);
                        setEditingExperience(null);
                      }}
                      className="px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      {editingExperience ? "Update" : "Create"}
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
          {currentSection === 'experience' && renderExperienceSection()}

          {/* Toast Container */}
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
                    toast.type === 'success' 
                      ? 'bg-green-500/90 text-white' 
                      : toast.type === 'error' 
                      ? 'bg-red-500/90 text-white' 
                      : 'bg-blue-500/90 text-white'
                  }`}
                >
                  {toast.type === 'success' && <CheckCircle size={20} />}
                  {toast.type === 'error' && <XCircle size={20} />}
                  {toast.type === 'info' && <AlertCircle size={20} />}
                  <span className="text-sm font-medium">{toast.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </main>
  );
}
