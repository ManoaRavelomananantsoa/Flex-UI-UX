import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { BentoGrid } from "@/components/BentoGrid/BentoGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Section 1: Hero (Salutations + Image) */}
      <section className="pt-32 pb-20">
        <Hero />
      </section>

      {/* Section 2: Services (Ton tableau asymétrique) */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-5xl font-bold mt-2 tracking-tighter">WHAT WE DO?</h2>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* Tu pourras ajouter la section "WHO ARE WE" plus bas ensuite */}
    </main>
  );
}