"use client";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Layers, Figma, PenTool, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

/* ══════════════════════════════════════════════
   STYLES HUD & ANIMATION DE BORDURE
══════════════════════════════════════════════ */
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
    width: 260px; /* Plus étroit */
    height: 380px;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .ds-card-3d {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
  }

  /* ── L'ANIMATION DE BORDURE (uniquement active) ── */
  .ds-card-inner {
    position: relative;
    background: #09090b;
    height: 100%;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    padding: 1px; /* Espace pour la bordure */
    overflow: hidden;
  }

  /* La bordure animée (pseudo-élément) */
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

  /* Le fond de la carte par-dessus la bordure */
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
`;

const designProjects = [
  { title: "UI SYSTEM", icon: <Layers size={16} />, image: "/images/designs/UIsystem.png", index: "01" },
  { title: "MOBILE APP", icon: <Palette size={16} />, image: "/images/designs/mobileApp.png", index: "02" },
  { title: "WEB APP", icon: <Figma size={16} />, image: "/images/designs/webApp.png", index: "03" },
  { title: "FULLSTACK", icon: <PenTool size={16} />, image: "/images/designs/fullStack.png", index: "04" },
  { title: "MOTION", icon: <Sparkles size={16} />, image: "/images/designs/motion.png", index: "05" },
  
];

function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block" style={{ lineHeight: "inherit" }}>
      {/* Calque rouge */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{
          background: "linear-gradient(90deg,#ff2d55,#ff6b6b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-r 2s 0.5s infinite",
          opacity: 0,
        }}
      >
        {children}
      </span>

      {/* Calque cyan */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{
          background: "linear-gradient(90deg,#00ffea,#0af)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-c 4s 0.5s infinite",
          opacity: 0,
        }}
      >
        {children}
      </span>

      {/* Texte principal */}
      <span
        className="relative z-10"
        style={{
          background: "linear-gradient(90deg,#1be7ff 0%,#1a8fff 60%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-main 4s 0.5s infinite",
          display: "inline-block",
        }}
      >
        {children}
      </span>

      {/* Scan line */}
      <span
        aria-hidden
        className="absolute pointer-events-none z-20"
        style={{
          left: "-4px",
          right: "-4px",
          height: "3px",
          background: "rgba(27,231,255,0.6)",
          animation: "slice 4s 0.5s infinite",
          opacity: 0,
        }}
      />
    </span>
  );
}

export default function DesignsCarousel3D() {
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const count = designProjects.length;
  const angleStep = 360 / count;
  const radius = 300; // Rayon ajusté pour l'étroitesse

  const rotate = (dir: number) => {
    setRotation(prev => prev + (dir * angleStep));
    setActiveIdx(prev => (prev - dir + count) % count);
  };

  

  return (
    <>
      <style>{STYLES}</style>
      <main className="min-h-screen bg-transparent text-white">
        <Navbar />

        <section className="pt-32 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="font-black text-4xl md:text-6xl tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              MES  <GlitchText>DESIGNS</GlitchText>
            </h1>
            <p className="ds-hud-label mt-2">// INTERFACE ROTATIVE SÉCURISÉE</p>
          </div>

          <div className="scene-3d">
            <div className="carousel-3d" style={{ transform: `rotateY(${rotation}deg)` }}>
              {designProjects.map((p, i) => {
                const isActive = i === activeIdx;
                const itemAngle = i * angleStep;

                return (
                  <div
                    key={i}
                    className={`ds-card-3d ${isActive ? 'active' : ''}`}
                    style={{ transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)` }}
                  >
                    <div className="ds-card-inner">
                      <div className="ds-card-content">
                        <div className="ds-corner ds-corner-tr" />
                        <div className="ds-corner ds-corner-bl" />
                        
                        {/* Image */}
                        <div className="h-40 bg-gray-900 relative">
                          <img 
                            src={p.image} 
                            alt={p.title}
                            className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-20 grayscale'}`}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] to-transparent" />
                        </div>

                        {/* Text Content */}
                        <div className="p-5">
                          <span className="text-[9px] text-cyan-500 font-bold mb-1 block tracking-[0.3em]">ID-{p.index}</span>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-cyan-400">{p.icon}</span>
                            <h3 className="text-xs font-bold tracking-widest leading-none">{p.title}</h3>
                          </div>
                          
                          <AnimatePresence>
                            {isActive && (
                              <motion.button 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mt-4 flex items-center gap-2 text-[10px] bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-2 hover:bg-cyan-500 hover:text-black transition-all"
                              >
                                ACCÉDER <ExternalLink size={10} />
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-12 mt-8">
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
        </section>
      </main>
    </>
  );
}