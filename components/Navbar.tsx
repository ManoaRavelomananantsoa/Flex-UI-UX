"use client";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isPageRoute = pathname === "/designs" || pathname === "/services" || pathname === "/about";

  useEffect(() => {
    if (isPageRoute) return;

    const handleScroll = () => {
      const sections = ["home", "designs", "services", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Designs", id: "designs" },
    { name: "Services", id: "services" },
    { name: "About Me", id: "about" },
    { name: "Contact Me", id: "contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Style "Hykrox" */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-cyan-400">PORTFOLIO</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Unique Designs</span>
        </div>

        {/* Liens de navigation (Cachés sur mobile pour le flex) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isDesigns = item.id === "designs";
            const isHome = item.id === "home";
            const isServices = item.id === "services";
            const isAbout = item.id === "about";
            const href = isHome ? "/" : isDesigns ? "/designs" : isServices ? "/services" : isAbout ? "/about" : `#${item.id}`;
            
            // Déterminer si l'item est actif
            let isActive = false;
            if (pathname === "/" && isHome) {
              isActive = true;
            } else if (pathname === "/designs" && isDesigns) {
              isActive = true;
            } else if (pathname === "/services" && isServices) {
              isActive = true;
            } else if (pathname === "/about" && isAbout) {
              isActive = true;
            } else if (!isPageRoute && activeSection === item.id) {
              isActive = true;
            }

            return isHome || isDesigns || isServices || isAbout ? (
              <Link
                key={item.id}
                href={href}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                  isActive 
                    ? "text-cyan-400" 
                    : "text-zinc-400 hover:text-cyan-400"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.id}
                href={href}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                  isActive 
                    ? "text-cyan-400" 
                    : "text-zinc-400 hover:text-cyan-400"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Icône de recherche pour le look UI pro */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          
          {/* Un petit bouton "Call to Action" discret */}
          <div className="h-8 w-px bg-zinc-800 mx-2 hidden sm:block" />
          <button className="hidden sm:block text-[10px] uppercase tracking-widest font-bold border border-cyan-500/50 px-4 py-2 rounded-sm hover:bg-cyan-500 hover:text-black transition-all">
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}