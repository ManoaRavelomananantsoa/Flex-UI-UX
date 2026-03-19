"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Database, Globe, Smartphone } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Boutique en ligne moderne avec panier interactif et paiement sécurisé",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    icon: <Globe className="h-6 w-6" />,
    color: "from-blue-500 to-purple-600",
    image: "/projects/ecommerce.jpg"
  },
  {
    title: "Task Management App",
    description: "Application de gestion de tâches avec drag & drop et collaboration en temps réel",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    icon: <Code2 className="h-6 w-6" />,
    color: "from-green-500 to-teal-600",
    image: "/projects/taskapp.jpg"
  },
  {
    title: "Tri-Fako",
    description: "Application mobile , portefeuille pour une distribution decentralisé destiner a encourager les utilisateurs a jetter leur déchets dans les points de collecte",
    tech: ["Angular", "D3.js", "Python", "PostgreSQL"],
    icon: <Database className="h-6 w-6" />,
    color: "from-orange-500 to-red-600",
    image: "/projects/dashboard.jpg"
  },
  {
    title: "Mobile Banking App",
    description: "Application bancaire mobile avec authentification biométrique et notifications push",
    tech: ["React Native", "TypeScript", "Firebase", "REST API"],
    icon: <Smartphone className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-600",
    image: "/projects/mobile.jpg"
  }
];

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-600">
              Mes Projets
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Découvrez mes réalisations récentes, des applications web aux solutions mobiles
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Boutons de navigation */}
            <button
              onClick={prevProject}
              className="absolute left-0 z-20 p-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-full text-white hover:bg-zinc-800 transition-colors"
              aria-label="Projet précédent"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7 7"
                />
              </motion.svg>
            </button>

            {/* Projet actuel */}
            <div className="w-full max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-zinc-700/50 overflow-hidden shadow-2xl">
                    {/* Image du projet */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <div className={`absolute inset-0 bg-linear-to-br ${projects[currentIndex].color} opacity-20`}></div>
                      <img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1460925859211-0?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>

                    {/* Contenu */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 bg-linear-to-br ${projects[currentIndex].color} rounded-xl text-white`}>
                          {projects[currentIndex].icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {projects[currentIndex].title}
                          </h3>
                          <p className="text-zinc-300 text-base leading-relaxed">
                            {projects[currentIndex].description}
                          </p>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-zinc-800/80 border border-zinc-600/50 rounded-lg text-zinc-300 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl text-white transition-colors">
                          <Github className="h-4 w-4" />
                          Voir le code
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border border-cyan-500/50 rounded-xl text-white font-medium transition-all">
                          <ExternalLink className="h-4 w-4" />
                          Démo live
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bouton suivant */}
            <button
              onClick={nextProject}
              className="absolute right-0 z-20 p-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-full text-white hover:bg-zinc-800 transition-colors"
              aria-label="Projet suivant"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </button>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-cyan-500 w-8"
                    : "bg-zinc-600 hover:bg-zinc-500"
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
