"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Database, Globe, Smartphone } from "lucide-react";
import "./ProjectsCarousel.css";

const projects = [
  {
    title: "Electro-view",
    description: "Graphical simulation application for voltage and current intensity in a circuit over time.",
    tech: ["PyQT5", "Python", "Matplotlib"],
    icon: <Globe className="h-6 w-6" />,
    color: "from-blue-500 to-purple-600",
    image: "images/projects/Electro-view.png",
  },
  {
    title: "Career Management",
    description: "Career management application with application classification and process tracking.",
    tech: ["PostgreSQL", "Express", "Angular", "Node.js"],
    icon: <Code2 className="h-6 w-6" />,
    color: "from-green-500 to-teal-600",
    image: "images/projects/gestion-carriere.png",
  },
  {
    title: "Tri-Fako",
    description: "Mobile app, wallet for decentralized distribution designed to encourage users to throw their waste into collection points.",
    tech: ["Angular", "D3.js", "Python", "PostgreSQL"],
    icon: <Database className="h-6 w-6" />,
    color: "from-emerald-500 to-cyan-600",
    image: "images/projects/logo-trifako.png",
  },
  {
    title: "Color Detector",
    description: "Application that detects the color of an object in real time via the camera.",
    tech: ["React Native", "TypeScript", "Firebase", "REST API"],
    icon: <Smartphone className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-600",
    image: "images/projects/color-detector.png",
  },
];

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible]       = useState(false);
  const [direction, setDirection]       = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length);
  };

  const project = projects[currentIndex];

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section className="py-20 relative overflow-hidden" ref={carouselRef}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          className="mb-16 flex flex-col gap-2"
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pc-hud">// recent projects</span>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "-.01em" }}
          >
            MY PROJECTS
          </h2>
          <div
            className="h-px w-48 mt-1"
            style={{ background: "linear-gradient(90deg, rgba(41,182,232,1), transparent)" }}
          />
          <p className="text-sm font-light mt-2" style={{ color: "rgba(170,210,235,.6)", maxWidth: 480 }}>
            Discover my recent work, from web applications to mobile solutions.
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-6">

            {/* Bouton PREV */}
            <button
              className="pc-nav-btn flex-shrink-0"
              onClick={() => go(-1)}
              aria-label="Previous project"
            >
              <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </motion.svg>
            </button>

            {/* Carte projet */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  {/* Wrapper neon (deux arcs) */}
                  <div className="pc-card-wrap pc-card-wrap-2" style={{ position: "relative", zIndex: 1 }}>

                    {/* Fond angulaire */}
                    <div
                      style={{
                        background: "#09090b",
                        clipPath: "polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,28px 100%,0 calc(100% - 28px))",
                        border: "1px solid rgba(0,207,255,.08)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {/* Accents coins */}
                      <div className="pc-corner pc-corner-tr" />
                      <div className="pc-corner pc-corner-bl" />
                      <div className="pc-corner pc-corner-tl-line" />

                      {/* Masque intérieur */}
                      <div style={{
                        position: "absolute", inset: 1,
                        background: "#09090b",
                        clipPath: "polygon(0 0,calc(100% - 27px) 0,100% 27px,100% 100%,27px 100%,0 calc(100% - 27px))",
                        zIndex: 0, pointerEvents: "none",
                      }} />

                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ height: 280, zIndex: 1 }}>
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to bottom right, ${project.color.includes("from") ? "rgba(6,182,212,.15)" : "rgba(6,182,212,.1)"}, transparent)`,
                          }}
                        />
                        {/* Scan line sur l'image */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                          background: "linear-gradient(90deg, transparent, rgba(0,207,255,.4), transparent)",
                          animation: "orbit 3s linear infinite", zIndex: 2,
                        }} />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        {/* Overlay dégradé bas */}
                        <div style={{
                          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                          background: "linear-gradient(to bottom, transparent, #09090b)",
                        }} />

                        {/* Index HUD */}
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          fontFamily: "'Orbitron', monospace",
                          fontSize: 9, letterSpacing: ".15em",
                          color: "rgba(0,207,255,.55)",
                          background: "rgba(3,7,18,.7)",
                          padding: "4px 10px",
                          clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
                          zIndex: 3,
                        }}>
                          {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Contenu texte */}
                      <div style={{ padding: "1.75rem 2rem 2rem", position: "relative", zIndex: 1 }}>

                        {/* Titre + description */}
                        <div className="flex items-start gap-4 mb-5">
                          <div style={{
                            padding: 10,
                            background: "rgba(10,30,55,.85)",
                            border: "1px solid rgba(0,207,255,.18)",
                            clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                            flexShrink: 0, color: "#22d3ee",
                          }}>
                            {project.icon}
                          </div>
                          <div>
                            <h3
                              className="text-xl font-black text-white mb-1"
                              style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "-.01em" }}
                            >
                              {project.title}
                            </h3>
                            <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.75, color: "rgba(170,210,235,.65)" }}>
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Tags tech */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t) => (
                            <span key={t} className="pc-tag">{t}</span>
                          ))}
                        </div>

                        {/* Boutons action */}
                        <div className="flex flex-wrap gap-3">
                          <button className="pc-btn pc-btn-ghost">
                            <Github size={15} /> View Code
                          </button>
                          <button className="pc-btn pc-btn-primary">
                            <ExternalLink size={15} /> Live Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bouton NEXT */}
            <button
              className="pc-nav-btn flex-shrink-0"
              onClick={() => go(1)}
              aria-label="Next project"
            >
              <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`pc-dot ${i === currentIndex ? "active" : ""}`}
                style={{ width: i === currentIndex ? 32 : 8 }}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}