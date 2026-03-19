"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Database, Globe, Smartphone, Radius } from "lucide-react";

const projects = [
  {
    title: "Electro-view",
    description: "Application de simulation graphique de tension et de l'intensité du courant dans une circuit en fonction du temps .",
    tech: ["PyQT5","Python","Matplotlib"],
    icon: <Globe className="h-6 w-6" />,
    color: "from-blue-500 to-purple-600",
    image: "images/projects/Electro-view.png"
  },
  {
    title: "Gestion de carrière",
    description: "Application de gestion de carrière avec classification des candidatures et suivi des processus",
    tech: [ "PostgreSQL","Express","Angular", "Node.js"],
    icon: <Code2 className="h-6 w-6" />,
    color: "from-green-500 to-teal-600",
    image: "images/projects/gestion-carriere.png"
  },
  {
    title: "Tri-Fako",
    description: "Application mobile , portefeuille pour une distribution decentralisé destiner a encourager les utilisateurs a jetter leur déchets dans les points de collecte",
    tech: ["Angular", "D3.js", "Python", "PostgreSQL"],
    icon: <Database className="h-6 w-6" />,
    color: "transparent",
    image: "images/projects/logo-trifako.png"
  },
  {
    title: "Color detector ",
    description: "Application qui détecte la couleur d'un objet",
    tech: ["React Native", "TypeScript", "Firebase", "REST API"],
    icon: <Smartphone className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-600",
    image: "images/projects/color-detector.png"
  }
];

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 relative overflow-hidden" ref={carouselRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className=" bg-clip-text bg-linear-to-r text-white ">
              Mes Projets
            </span>
          </h2>
          <p className="text-cyan-400 max-w-2xl mx-auto text-lg">
            Découvrez mes réalisations récentes, des applications web aux solutions mobiles
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        >
          <div className="flex items-center justify-center">
            {/* Boutons de navigation */}
            <button
              onClick={prevProject}
              className="absolute left-0 z-20 p-4 bg-zinc-950/90 backdrop-blur-md rounded-full text-cyan-400 hover:bg-zinc-900 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 overflow-hidden group"
              aria-label="Projet précédent"
              style={{
                background: 'rgba(3, 7, 18, 0.95)',
                borderImage: 'linear-gradient(135deg, #06b6d4, #ffffff) 1',
                border: '2px solid'
              }}
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
            <div className="w-full max-w-4xl mx-auto" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)', borderRadius: '1.5rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="transparent backdrop-blur-sm rounded-3xl border border-zinc-700/50 overflow-hidden shadow-2xl">
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
                    <div className="p-8 bg-black/30">
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
              className="absolute right-0 z-20 p-4 bg-zinc-950/90 backdrop-blur-md rounded-full text-cyan-400 hover:bg-zinc-900 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 overflow-hidden group"
              aria-label="Projet suivant"
              style={{
                background: 'rgba(3, 7, 18, 0.95)',
                borderImage: 'linear-gradient(135deg, #06b6d4, #ffffff) 1',
                border: '2px solid'
              }}
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
        </motion.div>
      </div>
    </section>
  );
}
