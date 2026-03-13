import { Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Style "Hykrox" */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-cyan-400">FLEX</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Unique Designs</span>
        </div>

        {/* Liens de navigation (Cachés sur mobile pour le flex) */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Designs", "Services", "About Us", "Contact Us"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "")}`}
              className="text-xs uppercase tracking-widest font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Icône de recherche pour le look UI pro */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          
          {/* Un petit bouton "Call to Action" discret */}
          <div className="h-8 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />
          <button className="hidden sm:block text-[10px] uppercase tracking-widest font-bold border border-cyan-500/50 px-4 py-2 rounded-sm hover:bg-cyan-500 hover:text-black transition-all">
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}