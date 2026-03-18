"use client";
import { motion } from "framer-motion";
import { Code2, Database, Cpu } from "lucide-react";

export function Hero() {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-24 py-20 min-h-[80vh]">
      <div className="flex-1 space-y-6 z-10">
        <div className="flex flex-col gap-1">
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
            Full-Stack Developer
          </span>
          <span className="text-zinc-500 text-xs font-medium tracking-tighter">
            MEAN & PEAN SPECIALIST
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
          FULL <br /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
            STACK
          </span> <br />
          ENGINEER
        </h1>

        <p className="text-zinc-400 max-w-lg text-lg leading-relaxed">
          Spécialisé dans la conception d'applications robustes avec <span className="text-white font-medium">Angular</span>, <span className="text-white font-medium">Node.js</span> et les architectures <span className="text-white font-medium">NoSQL/SQL</span>. 
          Je transforme des logiques complexes en interfaces fluides et performantes.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {["Next.js", "TypeScript", "Clean Architecture"].map((skill) => (
            <div key={skill} className="px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-xs text-zinc-300">
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Image à droite avec les ANNEAUX NÉONS */}
      <div className="relative flex items-center justify-center flex-1">
        
        {/* Cercles d'orbite en arrière-plan */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Anneau 1 - Grand Néon */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-150 h-150 border border-cyan-500/10 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.1)]"
          >
             <div className="absolute top-1/2 -left-4 w-8 h-8 bg-zinc-950 border border-cyan-500/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Database className="text-cyan-400 h-4 w-4" />
             </div>
          </motion.div>

          {/* Anneau 2 - Moyen Néon */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-120 h-120 border border-blue-500/20 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950 border border-blue-500/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <Code2 className="text-blue-400 h-5 w-5" />
             </div>
          </motion.div>

          {/* Anneau 3 - Petit Néon Intense */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-95 h-95 border-2 border-cyan-400/30 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
             <div className="absolute bottom-10 right-0 w-8 h-8 bg-zinc-950 border border-cyan-400/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <Cpu className="text-cyan-300 h-4 w-4" />
             </div>
          </motion.div>
        </div>

        {/* Halo lumineux central plus intense */}
        <div className="absolute w-72 h-72 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"></div>

        {/* Le portrait */}
        <div className="relative group z-10 flex flex-col items-center">
          <div className="absolute -inset-1.5 bg-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 shadow-[0_0_30px_rgba(6,182,212,0.5)]"></div>
          <div className="relative w-72 h-72 md:w-80 md:h-80 bg-zinc-900 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
            <img 
              src="/images/toji.jpg" 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
          </div>
          
          {/* Badge de notification style néon */}
          <div className="absolute -top-2 -right-2 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/50">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Status</p>
                <p className="text-xs font-bold">Open to Work</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}