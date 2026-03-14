export function Hero() {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 py-20">
      {/* Texte à gauche */}
      <div className="flex-1 space-y-6">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            STACK
          </span> <br />
          ENGINEER
        </h1>

        <p className="text-zinc-400 max-w-lg text-lg leading-relaxed">
          Spécialisé dans la conception d'applications robustes avec <span className="text-white font-medium">Angular</span>, <span className="text-white font-medium">Node.js</span> et les architectures <span className="text-white font-medium">NoSQL/SQL</span>. 
          Je transforme des logiques complexes en interfaces fluides et performantes.
        </p>

        <div className="flex gap-4 pt-4">
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
            Next.js
          </div>
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
            TypeScript
          </div>
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
            Clean Architecture
          </div>
        </div>
      </div>

      {/* Image à droite avec l'effet de lueur néon */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative w-80 h-[450px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          <img 
            src="/images/toji.jpg" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
          {/* Badge flottant pour le côté pro */}
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
             <p className="text-[10px] uppercase text-cyan-400 font-bold">Currently Building</p>
             <p className="text-white text-xs font-medium">Gestion de Carrière @ Luminess</p>
          </div>
        </div>
      </div>
    </div>
  );
}