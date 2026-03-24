"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Palette, Layers, Figma, PenTool, Sparkles, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const designProjects = [
  {
    title: "UI/UX Design System",
    description: "Design system complet avec composants réutilisables et guidelines.",
    icon: <Layers className="h-6 w-6 text-cyan-400" />,
    color: "rgba(34, 211, 238, 0.15)",
    tags: ["Figma", "Design System", "Components"]
  },
  {
    title: "Mobile App Design",
    description: "Interface mobile intuitive avec focus sur l'expérience utilisateur.",
    icon: <Palette className="h-6 w-6 text-emerald-400" />,
    color: "rgba(52, 211, 153, 0.15)",
    tags: ["Mobile", "iOS", "Android"]
  },
  {
    title: "Web Application",
    description: "Dashboard moderne avec visualisation de données et analytics.",
    icon: <Figma className="h-6 w-6 text-orange-400" />,
    color: "rgba(251, 146, 60, 0.15)",
    tags: ["Dashboard", "Analytics", "Web"]
  },
  {
    title: "Brand Identity",
    description: "Identité visuelle complète incluant logo, palette et typographie.",
    icon: <PenTool className="h-6 w-6 text-purple-400" />,
    color: "rgba(192, 132, 252, 0.15)",
    tags: ["Branding", "Logo", "Identity"]
  },
];

export default function DesignsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#09090b';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Hero Section Designs */}
      <section id="designs" className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-cyan-400 h-5 w-5" />
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              MY <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                DESIGNS
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Découvrez mes créations en UI/UX design, identités visuelles et interfaces digitales. 
              Chaque projet est une fusion d'esthétique et de fonctionnalité.
            </p>
          </motion.div>

          {/* Grid Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {designProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-4xl border border-white/10 bg-zinc-950 p-8 overflow-hidden cursor-pointer"
              >
                {/* Glow effect */}
                <div
                  className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]"
                  style={{ background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 w-14 h-14 shadow-inner">
                    {project.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                    <span>Voir le projet</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-500 mb-4">Vous avez un projet en tête ?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
            >
              <span>Discutons-en</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
