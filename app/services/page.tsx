"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Database, ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

const services = [
  {
    title: "Développement Web",
    description: "Applications web modernes avec React, Next.js et TypeScript. Performance optimale et code propre.",
    icon: <Code className="h-8 w-8 text-cyan-400" />,
    features: ["React/Next.js", "TypeScript", "Node.js", "API REST"]
  },
  {
    title: "UI/UX Design",
    description: "Interfaces utilisateur intuitives et esthétiques. Design centré sur l'expérience utilisateur.",
    icon: <Palette className="h-8 w-8 text-emerald-400" />,
    features: ["Figma", "Prototypage", "Design System", "User Research"]
  },
  {
    title: "Mobile Apps",
    description: "Applications mobiles cross-platform avec React Native. Une codebase, iOS et Android.",
    icon: <Smartphone className="h-8 w-8 text-orange-400" />,
    features: ["React Native", "iOS", "Android", "Push Notifications"]
  },
  {
    title: "SEO & Performance",
    description: "Optimisation pour les moteurs de recherche et performance web. Score Lighthouse 90+.",
    icon: <Globe className="h-8 w-8 text-purple-400" />,
    features: ["SEO Technique", "Core Web Vitals", "SSR/SSG", "Analytics"]
  },
  {
    title: "Base de Données",
    description: "Architecture et gestion de bases de données SQL et NoSQL. Scalable et sécurisé.",
    icon: <Database className="h-8 w-8 text-pink-400" />,
    features: ["PostgreSQL", "MongoDB", "Redis", "Prisma"]
  },
];

export default function ServicesPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#09090b';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Hero Section Services */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-cyan-400 h-5 w-5" />
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">
                Ce que je propose
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              MES <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                SERVICES
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Des solutions digitales complètes pour donner vie à vos projets. 
              Du design au développement, je vous accompagne à chaque étape.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-4xl border border-white/10 bg-zinc-950 p-8 overflow-hidden cursor-pointer"
              >
                {/* Glow effect */}
                <div className="absolute -inset-20 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 w-16 h-16 shadow-inner">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-500 mb-4">Besoin d'un service personnalisé ?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
            >
              <span>Discutons de votre projet</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
