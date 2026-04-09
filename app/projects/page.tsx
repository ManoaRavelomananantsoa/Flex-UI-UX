"use client";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Database, Globe, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;500&display=swap');

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate-border {
    to { --angle: 360deg; }
  }

  /* ── LAYOUT PRINCIPAL ── */
  .projects-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    min-height: calc(100vh - 6rem);
    padding: 0 4rem;
    gap: 2rem;
  }

  @media (max-width: 900px) {
    .projects-layout {
      grid-template-columns: 1fr;
      padding: 2rem 1.5rem;
    }
    .projects-left {
      text-align: center;
    }
  }

  /* ── PANNEAU GAUCHE ── */
  .projects-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 2rem;
  }

  .projects-eyebrow {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 0.35em;
    color: rgba(0, 207, 255, 0.6);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .projects-eyebrow::before {
    content: '';
    display: inline-block;
    width: 32px;
    height: 1px;
    background: rgba(0, 207, 255, 0.5);
  }

  .projects-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 900;
    line-height: 1.05;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .projects-title .accent {
    background: linear-gradient(90deg, #1be7ff 0%, #1a8fff 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .projects-desc {
    font-family: 'Exo 2', sans-serif;
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.8;
    max-width: 420px;
  }

  .projects-stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 0.5rem;
  }

  .projects-stat-num {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #00cfff;
    display: block;
    line-height: 1;
  }

  .projects-stat-label {
    font-family: 'Exo 2', sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.3);
    margin-top: 4px;
    display: block;
  }

  .projects-divider {
    width: 48px;
    height: 1px;
    background: linear-gradient(90deg, rgba(0,207,255,0.6), transparent);
    margin: 0.5rem 0;
  }

  /* ── PANNEAU DROIT (carousel) ── */
  .projects-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .scene-3d {
    perspective: 1500px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 100%;
    position: relative;
  }

  .carousel-3d {
    position: relative;
    width: 260px;
    height: 380px;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .ds-card-3d {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
  }

  .ds-card-inner {
    position: relative;
    background: #09090b;
    height: 100%;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    padding: 1px;
    overflow: hidden;
  }

  .active .ds-card-inner::before {
    content: '';
    position: absolute;
    inset: -50%;
    background: conic-gradient(
      from var(--angle),
      transparent 70%,
      #00cfff 85%,
      #60f8ff 95%,
      #00cfff 100%
    );
    animation: rotate-border 3s linear infinite;
    z-index: 0;
  }

  .ds-card-content {
    position: relative;
    z-index: 1;
    background: #09090b;
    height: 100%;
    width: 100%;
    clip-path: polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px));
  }

  .ds-corner { position: absolute; width: 12px; height: 12px; z-index: 10; opacity: 0.2; transition: 0.4s; }
  .ds-corner-tr { top: 0; right: 0; border-top: 2px solid #00cfff; border-right: 2px solid #00cfff; }
  .ds-corner-bl { bottom: 0; left: 0; border-bottom: 2px solid #00cfff; border-left: 2px solid #00cfff; }
  .active .ds-corner { opacity: 1; box-shadow: 0 0 10px #00cfff; }

  .ds-hud-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: rgba(0, 207, 255, 0.5);
  }

  /* ── Overlay flottant pour texte et bouton ── */
  .ds-float-overlay {
    pointer-events: none;
  }
  
  .ds-float-overlay > * {
    pointer-events: auto;
  }

  .ds-float-overlay h3 {
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9), 0 8px 30px rgba(0, 0, 0, 0.8);
  }

  .ds-float-overlay span {
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 3px 15px rgba(255, 255,255, 0.95), 0 6px 25px rgba(0, 0, 0, 0.9);
  }

  .ds-float-overlay button {
    backdrop-filter: blur(4px);
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.1em;
    font-weight: 600;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px));
    position: relative;
    border: 1px solid rgba(0, 207, 255, 0.8);
    transition: all 0.3s ease;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .ds-float-overlay button:hover {
    border-color: rgba(0, 207, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 207, 255, 0.5), inset 0 0 10px rgba(0, 207, 255, 0.1);
  }
`;

const projects = [
  { 
    title: "Electro-view", 
    icon: <Globe size={16} />, 
    image: "images/projects/Electro-view.png", 
    index: "01",
    description: "Graphical simulation application for voltage and current intensity"
  },
  { 
    title: "Career Management", 
    icon: <Code2 size={16} />, 
    image: "images/projects/gestion-carriere.png", 
    index: "02",
    description: "Career management application with process tracking"
  },
  { 
    title: "Tri-Fako", 
    icon: <Database size={16} />, 
    image: "images/projects/logo-trifako.png", 
    index: "03",
    description: "Mobile app for decentralized waste distribution"
  },
  { 
    title: "Color Detector", 
    icon: <Smartphone size={16} />, 
    image: "images/projects/color-detector.png", 
    index: "04",
    description: "Real-time color detection via camera"
  },
];

export default function ProjectsPage() {
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const count = projects.length;
  const angleStep = 360 / count;
  const radius = 300;

  const rotate = (dir: number) => {
    setRotation(prev => prev + (dir * angleStep));
    setActiveIdx(prev => (prev - dir + count) % count);
  };

  return (
    <>
      <style>{STYLES}</style>
      <main className="min-h-screen bg-transparent text-white">
        <Navbar />

        <section className="pt-24 projects-layout">

          {/* ══ PANNEAU GAUCHE ══ */}
          <div className="projects-left">
            <span className="projects-eyebrow">MY PORTFOLIO</span>

            <h1 className="projects-title">
              My<br />
              <span className="accent">Real</span><br />
              Projects
            </h1>

            <div className="projects-divider" />

            <p className="projects-desc">
              Explore my complete development portfolio — from web applications 
              and mobile solutions to full-stack systems. Each project showcases 
              my expertise in modern technologies and clean architecture.
            </p>

            <div className="projects-stats">
              <div>
                <span className="projects-stat-num">0{count}</span>
                <span className="projects-stat-label">PROJECTS</span>
              </div>
              <div>
                <span className="projects-stat-num">FS</span>
                <span className="projects-stat-label">SPECIALTY</span>
              </div>
              <div>
                <span className="projects-stat-num">∞</span>
                <span className="projects-stat-label">INNOVATION</span>
              </div>
            </div>
          </div>

          {/* ══ PANNEAU DROIT — CAROUSEL ══ */}
          <div className="projects-right">
            <div className="scene-3d">
              <div className="carousel-3d" style={{ transform: `rotateY(${rotation}deg)` }}>
                {projects.map((p, i) => {
                  const isActive = i === activeIdx;
                  const itemAngle = i * angleStep;

                  return (
                    <div
                      key={i}
                      className={`ds-card-3d ${isActive ? 'active' : ''}`}
                      style={{ transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`, transformStyle: 'preserve-3d' }}
                    >
                      {/* La carte (surface) avec uniquement l'image */}
                      <div className="ds-card-inner" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="ds-card-content">
                          <div className="ds-corner ds-corner-tr" />
                          <div className="ds-corner ds-corner-bl" />
                          
                          <div className="h-full bg-gray-900 relative">
                            <img 
                              src={p.image} 
                              alt={p.title}
                              className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-20 grayscale'}`}
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#09090b] to-transparent" />
                          </div>
                        </div>
                      </div>

                      {/* TEXTE FLOTTANT */}
                      <div 
                        className="ds-float-overlay" 
                        style={{ 
                          transform: 'translateZ(40px)', 
                          position: 'absolute', 
                          bottom: 0, 
                          left: 0, 
                          right: 0, 
                          padding: '1.25rem',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <span className="text-[9px] text-cyan-500 font-bold mb-1 block tracking-[0.3em]">ID-{p.index}</span>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-cyan-400">{p.icon}</span>
                          <h3 className="text-xs font-bold tracking-widest leading-none text-white">{p.title}</h3>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed mb-3 max-w-[200px]">{p.description}</p>
                        
                        <AnimatePresence>
                          <motion.button 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isActive ? 1 : 0.6, x: 0 }}
                            className={`mt-4 flex items-center gap-2 text-[10px] px-4 py-2 transition-all ${
                              isActive 
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black' 
                                : 'bg-zinc-900/50 border-zinc-700/50 text-zinc-500'
                            } border`}
                          >
                            ACCESS <ExternalLink size={10} />
                          </motion.button>
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-12">
              <button onClick={() => rotate(1)} className="group relative p-4 outline-none">
                <div className="absolute inset-0 scale-75 group-hover:scale-100 transition-transform border border-cyan-500/20 rounded-full" />
                <ChevronLeft className="text-cyan-500 group-hover:text-white transition-colors" />
              </button>

              <div className="text-center">
                <div className="text-[10px] ds-hud-label opacity-40 mb-1">POSITION</div>
                <div className="font-bold text-xl text-cyan-500 tracking-tighter">0{activeIdx + 1}</div>
              </div>

              <button onClick={() => rotate(-1)} className="group relative p-4 outline-none">
                <div className="absolute inset-0 scale-75 group-hover:scale-100 transition-transform border border-cyan-500/20 rounded-full" />
                <ChevronRight className="text-cyan-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
