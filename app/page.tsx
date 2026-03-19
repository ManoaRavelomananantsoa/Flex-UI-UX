"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { BentoGrid } from "@/components/BentoGrid/BentoGrid";
import { ProjectsCarousel } from "@/components/ProjectsCarousel/ProjectsCarousel";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Définir la couleur de background pour cette section
    document.body.style.backgroundColor = 'rgba(139, 69, 19, 0.9)';
    
    return () => {
      // Nettoyer quand le composant est démonté
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className="min-h-screen  text-white selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Section 1: Hero (Salutations + Image) */}
      <section className="pt-20 pb-16">
        <Hero />
      </section>

      {/* Section 2: Services (Ton tableau asymétrique) */}
      <section className="py-16 bg-black/0">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-5xl font-bold mt-2 tracking-tighter">WHAT WE DO?</h2>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* Section 3: Projets (Carrousel) */}
      <section className="py-12">
        <ProjectsCarousel />
      </section>
    </main>
  );
}