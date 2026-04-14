"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Github, ExternalLink, Code2, Database, Globe, Smartphone, Lock, LogOut, User, Image, FolderKanban, ArrowRight, CheckCircle, XCircle, AlertCircle, Briefcase, Eye, EyeOff, Upload, Save } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

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
  const [showPassword, setShowPassword] = useState(false);
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
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'project' as 'project' | 'experience',
    id: '',
    title: '',
    message: ''
  });

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
    // if (password === "Manoaman6061#") {
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

  const handleDeleteExperience = (id: string) => {
    const experience = experiences.find(e => e.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'experience',
      id,
      title: 'Supprimer l\'expérience',
      message: `Êtes-vous sûr de vouloir supprimer l'expérience "${experience?.company}" ? Cette action est irréversible.`
    });
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

  const handleDeleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'project',
      id,
      title: 'Supprimer le projet',
      message: `Êtes-vous sûr de vouloir supprimer le projet "${project?.title}" ? Cette action est irréversible.`
    });
  };

  const handleConfirmDelete = async () => {
    const { type, id } = confirmModal;
    try {
      if (type === 'project') {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        await loadProjects();
        showToast('success', 'Project deleted successfully');
      } else if (type === 'experience') {
        await fetch(`/api/experience/${id}`, { method: 'DELETE' });
        await loadExperiences();
        showToast('success', 'Experience deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      showToast('error', 'Failed to delete');
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Profile Info */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('profile')}
          className="relative rounded-xl overflow-hidden text-left
            bg-black/50 backdrop-blur-md
            border border-cyan-400/25
            hover:border-cyan-400/70
            hover:shadow-[0_0_24px_rgba(0,255,255,0.12),inset_0_0_24px_rgba(0,255,255,0.03)]
            transition-all duration-300 group p-6"
        >
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/50 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center
              bg-black/50 border border-cyan-400/30 text-cyan-400
              group-hover:border-cyan-400/60
              group-hover:shadow-[0_0_14px_rgba(0,255,255,0.2)]
              transition-all duration-300">
              <User size={22} />
            </div>
            <ArrowRight size={18} className="text-zinc-600 group-hover:text-cyan-400
              group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Profile Info</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Update your personal information, bio, and contact details
          </p>
        </motion.button>

        {/* Profile Picture */}
        {/* Profile Picture */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('avatar')}
          className="relative rounded-xl overflow-hidden text-left
            bg-black/50 backdrop-blur-md
            border border-cyan-400/25
            hover:border-cyan-400/70
            hover:shadow-[0_0_24px_rgba(0,255,255,0.12),inset_0_0_24px_rgba(0,255,255,0.03)]
            transition-all duration-300 group p-6"
        >
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/50 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center
              bg-black/50 border border-purple-400/30 text-purple-400
              group-hover:border-purple-400/60
              group-hover:shadow-[0_0_14px_rgba(168,85,247,0.2)]
              transition-all duration-300">
              <Image size={22} />
            </div>
            <ArrowRight size={18} className="text-zinc-600 group-hover:text-cyan-400
              group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Profile Picture</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Change your profile picture and avatar
          </p>
        </motion.button>

        {/* Projects */}
        {/* Projects */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('projects')}
          className="relative rounded-xl overflow-hidden text-left
            bg-black/50 backdrop-blur-md
            border border-cyan-400/25
            hover:border-cyan-400/70
            hover:shadow-[0_0_24px_rgba(0,255,255,0.12),inset_0_0_24px_rgba(0,255,255,0.03)]
            transition-all duration-300 group p-6"
        >
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/50 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center
              bg-black/50 border border-emerald-400/30 text-emerald-400
              group-hover:border-emerald-400/60
              group-hover:shadow-[0_0_14px_rgba(52,211,153,0.2)]
              transition-all duration-300">
              <FolderKanban size={22} />
            </div>
            <ArrowRight size={18} className="text-zinc-600 group-hover:text-cyan-400
              group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Projects</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Add, edit, or remove portfolio projects
          </p>
        </motion.button>

        {/* Experience */}
        {/* Experience */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentSection('experience')}
          className="relative rounded-xl overflow-hidden text-left
            bg-black/50 backdrop-blur-md
            border border-cyan-400/25
            hover:border-cyan-400/70
            hover:shadow-[0_0_24px_rgba(0,255,255,0.12),inset_0_0_24px_rgba(0,255,255,0.03)]
            transition-all duration-300 group p-6"
        >
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/50 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center
              bg-black/50 border border-orange-400/30 text-orange-400
              group-hover:border-orange-400/60
              group-hover:shadow-[0_0_14px_rgba(251,146,60,0.2)]
              transition-all duration-300">
              <Briefcase size={22} />
            </div>
            <ArrowRight size={18} className="text-zinc-600 group-hover:text-cyan-400
              group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Experience</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Add, edit, or remove work experience
          </p>
        </motion.button>


      </div>
    </motion.div>
  ); 

    const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden
        bg-black/50 backdrop-blur-md
        border border-cyan-400/30
        p-8"
    >
      {/* Neon top line */}
      <span className="absolute top-0 inset-x-0 h-px
        bg-linear-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Corner glow */}
      <span className="absolute top-0 right-0 w-48 h-48
        bg-cyan-400/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="w-9 h-9 flex items-center justify-center rounded-lg
            bg-black/50 border border-cyan-400/40 text-cyan-400
            backdrop-blur-md
            hover:border-cyan-400/80 hover:shadow-[0_0_16px_rgba(0,255,255,0.3)]
            transition-all duration-200"
        >
          <ArrowRight size={16} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-white">Profile Information</h2>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-5 relative">

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formProfile.fullName}
                onChange={(e) => updateFormField('fullName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white
                  bg-black/50 backdrop-blur-sm
                  border border-cyan-400/20
                  placeholder:text-zinc-600
                  focus:border-cyan-400/70
                  focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                  focus:outline-none transition-all duration-200"
              />
              <span className="absolute bottom-0 left-3 right-3 h-px
                bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
              Title / Role
            </label>
            <div className="relative">
              <input
                type="text"
                value={formProfile.title}
                onChange={(e) => updateFormField('title', e.target.value)}
                placeholder="e.g. Full-Stack Developer"
                className="w-full px-4 py-3 rounded-lg text-sm text-white
                  bg-black/50 backdrop-blur-sm
                  border border-cyan-400/20
                  placeholder:text-zinc-600
                  focus:border-cyan-400/70
                  focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                  focus:outline-none transition-all duration-200"
              />
              <span className="absolute bottom-0 left-3 right-3 h-px
                bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={formProfile.email}
                onChange={(e) => updateFormField('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white
                  bg-black/50 backdrop-blur-sm
                  border border-cyan-400/20
                  placeholder:text-zinc-600
                  focus:border-cyan-400/70
                  focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                  focus:outline-none transition-all duration-200"
              />
              <span className="absolute bottom-0 left-3 right-3 h-px
                bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
              Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formProfile.phone}
                onChange={(e) => updateFormField('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white
                  bg-black/50 backdrop-blur-sm
                  border border-cyan-400/20
                  placeholder:text-zinc-600
                  focus:border-cyan-400/70
                  focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                  focus:outline-none transition-all duration-200"
              />
              <span className="absolute bottom-0 left-3 right-3 h-px
                bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={formProfile.location}
              onChange={(e) => updateFormField('location', e.target.value)}
              placeholder="e.g. Madagascar"
              className="w-full px-4 py-3 rounded-lg text-sm text-white
                bg-black/50 backdrop-blur-sm
                border border-cyan-400/20
                placeholder:text-zinc-600
                focus:border-cyan-400/70
                focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                focus:outline-none transition-all duration-200"
            />
            <span className="absolute bottom-0 left-3 right-3 h-px
              bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
            Bio
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={formProfile.bio}
              onChange={(e) => updateFormField('bio', e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm text-white
                bg-black/50 backdrop-blur-sm
                border border-cyan-400/20
                placeholder:text-zinc-600
                focus:border-cyan-400/70
                focus:shadow-[0_0_16px_rgba(0,255,255,0.12)]
                focus:outline-none transition-all duration-200
                resize-none"
            />
            <span className="absolute bottom-0 left-3 right-3 h-px
              bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-cyan-400/20 via-cyan-400/10 to-transparent" />

        {/* Submit */}
        <button
          type="submit"
          className="relative flex items-center gap-2 px-6 py-3 rounded-lg
            bg-cyan-400/10 border border-cyan-400/50 text-cyan-400
            font-bold text-sm tracking-widest uppercase
            hover:bg-cyan-400/20 hover:border-cyan-400
            hover:shadow-[0_0_24px_rgba(0,255,255,0.3)]
            active:scale-[0.98]
            transition-all duration-200 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-700" />
          <Save size={15} />
          Save Changes
        </button>

      </form>
    </motion.div>
  );

  const renderAvatarSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden
        bg-black/50 backdrop-blur-md
        border border-cyan-400/30
        p-8"
    >
      {/* Neon top line */}
      <span className="absolute top-0 inset-x-0 h-px
        bg-linear-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Corner glow */}
      <span className="absolute top-0 left-0 w-32 h-32
        bg-cyan-400/5 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="w-9 h-9 flex items-center justify-center rounded-lg
            bg-black/50 border border-cyan-400/40 text-cyan-400
            backdrop-blur-md
            hover:border-cyan-400/80 hover:shadow-[0_0_16px_rgba(0,255,255,0.3)]
            transition-all duration-200"
        >
          <ArrowRight size={16} className="rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-white">Profile Picture</h2>
      </div>

      <div className="space-y-8 relative">

        {/* Avatar row */}
        <div className="flex items-center gap-8">

          {/* Avatar ring */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full
              shadow-[0_0_24px_rgba(0,255,255,0.25)]
              border border-cyan-400/40 rounded-full" />
            <div className="w-32 h-32 rounded-full overflow-hidden
              bg-black/60 border-2 border-cyan-400/30
              ring-4 ring-cyan-400/10">
              <img
                src="/images/profile/me.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full
              bg-cyan-400 border-2 border-black
              shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
              Current avatar
            </p>

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
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                bg-black/50 border border-cyan-400/40 text-cyan-400
                backdrop-blur-md font-medium text-sm tracking-wide
                hover:border-cyan-400/80 hover:shadow-[0_0_18px_rgba(0,255,255,0.25)]
                hover:bg-cyan-400/5
                transition-all duration-200"
            >
              <Upload size={15} />
              Upload New Picture
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-linear-to-r from-cyan-400/20 to-transparent" />
          <span className="font-mono text-xs text-cyan-400/30 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-linear-to-l from-cyan-400/20 to-transparent" />
        </div>

        {/* URL input */}
        <div className="space-y-2">
          <label className="font-mono text-xs text-cyan-400/50 tracking-widest uppercase">
            Paste image URL
          </label>
          <div className="relative">
            <input
              type="url"
              placeholder="https://example.com/profile.jpg"
              className="w-full px-4 py-3 rounded-lg text-sm text-white
                bg-black/50 backdrop-blur-md
                border border-cyan-400/25
                placeholder:text-zinc-600 placeholder:font-mono placeholder:text-xs
                focus:border-cyan-400/70 focus:shadow-[0_0_16px_rgba(0,255,255,0.15)]
                focus:outline-none
                transition-all duration-200"
            />
            {/* Input bottom neon line */}
            <span className="absolute bottom-0 left-4 right-4 h-px
              bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProjectsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="w-9 h-9 flex items-center justify-center rounded-lg
            bg-black/50 border border-cyan-400/40 text-cyan-400
            backdrop-blur-md
            hover:border-cyan-400/80 hover:shadow-[0_0_16px_rgba(0,255,255,0.3)]
            transition-all duration-200"
        >
          <ArrowRight size={16} className="rotate-180" />
        </button>

        <h2 className="text-2xl font-bold text-white">
          Projects Management
        </h2>
      </div>


      {loading ? (
        <div className="text-center py-12">
          <div className="text-cyan-400 font-mono tracking-widest animate-pulse text-sm">
            LOADING...
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative flex items-center gap-5 px-5 py-4 rounded-xl overflow-hidden
                bg-black/50 backdrop-blur-md
                border border-cyan-400/30
                hover:border-cyan-400/70
                hover:shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.03)]
                transition-all duration-300 group"
            >
              {/* Neon top line */}
              <span className="absolute top-0 inset-x-0 h-px
                bg-linear-to-r from-transparent via-cyan-400/60 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-14 h-14 shrink-0 rounded-lg flex items-center justify-center
                bg-black/50 border border-cyan-400/30 text-cyan-400
                group-hover:border-cyan-400/60
                group-hover:shadow-[0_0_14px_rgba(0,255,255,0.2)]
                transition-all duration-300">
                {getIconComponent(project.icon)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-cyan-400 tracking-widest">
                    {project.index}
                  </span>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
                <p className="text-sm text-zinc-400 truncate">{project.description}</p>
                <p className="font-mono text-xs text-cyan-400/30 mt-0.5">{project.image}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEditProject(project)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    bg-black/50 border border-cyan-400/30 text-cyan-400
                    hover:border-cyan-400/70 hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]
                    transition-all duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    bg-black/50 border border-zinc-700/60 text-zinc-500
                    hover:border-red-500/60 hover:text-red-400
                    hover:shadow-[0_0_12px_rgba(255,60,60,0.2)]
                    transition-all duration-200"
                >
                  <Trash2 size={16} />
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
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentSection('dashboard')}
          className="w-9 h-9 flex items-center justify-center rounded-lg
            bg-black/50 border border-cyan-400/40 text-cyan-400
            backdrop-blur-md
            hover:border-cyan-400/80 hover:shadow-[0_0_16px_rgba(0,255,255,0.3)]
            transition-all duration-200"
        >
          <ArrowRight size={16} className="rotate-180" />
      </button>
      <h2 className="text-2xl font-bold text-white">Work Experience</h2>
    </div>

    <div className="flex flex-col gap-3">
      {experiences.map((experience) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden
            bg-black/50 backdrop-blur-md
            border border-cyan-400/30
            hover:border-cyan-400/70
            hover:shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.03)]
            transition-all duration-300 group"
        >
          {/* Neon top line */}
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/60 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Left accent bar */}
          <span className="absolute left-0 top-4 bottom-4 w-px
            bg-linear-to-b from-transparent via-cyan-400/50 to-transparent" />

          <div className="px-6 py-5 flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">

              {/* Position + company */}
              <h3 className="text-lg font-bold text-white leading-tight">
                {experience.position}
              </h3>
              <p className="text-cyan-400 font-medium text-sm mt-0.5">
                {experience.company}
              </p>

              {/* Date badge */}
              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-md
                bg-black/50 border border-cyan-400/20 backdrop-blur-sm
                font-mono text-xs text-cyan-400/70 tracking-wider">
                {experience.startDate} — {experience.current ? 'Present' : experience.endDate}
              </span>

              {/* Description */}
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0 mt-1">
              <button
                onClick={() => {
                  setEditingExperience(experience);
                  setShowExperienceForm(true);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                  bg-black/50 border border-cyan-400/30 text-cyan-400
                  hover:border-cyan-400/70 hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]
                  transition-all duration-200"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDeleteExperience(experience.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                  bg-black/50 border border-zinc-700/60 text-zinc-500
                  hover:border-red-500/60 hover:text-red-400
                  hover:shadow-[0_0_12px_rgba(255,60,60,0.2)]
                  transition-all duration-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}


      {experiences.length === 0 && (
        <div className="relative rounded-xl overflow-hidden
          bg-black/50 backdrop-blur-md border border-cyan-400/20
          py-14 text-center">
          <span className="absolute top-0 inset-x-0 h-px
            bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
          <p className="font-mono text-sm text-cyan-400/40 tracking-widest">
            NO EXPERIENCE RECORDS FOUND
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            Click "Add Experience" to add your work history.
          </p>
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

          {/* Confirm Modal */}
          <ConfirmModal
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            onConfirm={handleConfirmDelete}
            title={confirmModal.title}
            message={confirmModal.message}
            confirmText="Supprimer"
            cancelText="Annuler"
          />

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
