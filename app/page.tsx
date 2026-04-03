"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { BentoGrid } from "@/components/BentoGrid/BentoGrid";
import { ProjectsCarousel } from "@/components/ProjectsCarousel/ProjectsCarousel";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen  text-white selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Section 1: Hero (Salutations + Image) */}
      <section id="section-hero" className="pt-20 pb-16">
        <Hero />
      </section>

      {/* Section 2: Services (Ton tableau asymétrique) */}
      <section id="section-services" className="py-16 bg-black/0">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Our Services</span>
            <h2 
              className="text-5xl font-bold mt-2 tracking-tighter"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              WHAT WE DO?
            </h2>
            <div
              className="h-px w-48 mt-1"
              style={{ background: "linear-gradient(90deg, rgba(41,182,232,1), transparent)" }}
            />
             <p className="text-sm font-light mt-2" style={{ color: "rgba(170,210,235,.6)", maxWidth: 480 }}>
              Découvrez mes expertises en développement web et mobile.
            </p>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* Section 3: Projets (Carrousel) */}
      <section id="section-projects" className="py-12">
        <ProjectsCarousel />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}