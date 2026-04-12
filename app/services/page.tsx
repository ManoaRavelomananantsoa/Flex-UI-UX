"use client";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Database, ArrowRight, Sparkles, X, CheckCircle, Clock, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

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

const offersByService = {
  "Développement Web": [
    {
      title: "Landing Page Premium",
      price: "500€",
      duration: "2-3 semaines",
      features: ["Design responsive", "Animations modernes", "SEO optimisé", "Formulaire de contact"],
      popular: true
    },
    {
      title: "Application Web Complète",
      price: "1500€",
      duration: "4-6 semaines",
      features: ["Dashboard admin", "Authentification", "Base de données", "API REST complète"],
      popular: false
    },
    {
      title: "E-commerce",
      price: "2500€",
      duration: "6-8 semaines",
      features: ["Panier & paiement", "Gestion produits", "Commandes", "Intégration Stripe"],
      popular: false
    }
  ],
  "UI/UX Design": [
    {
      title: "Design System",
      price: "400€",
      duration: "1-2 semaines",
      features: ["Composants UI", "Palette de couleurs", "Typographie", "Guide de style"],
      popular: true
    },
    {
      title: "Maquettes Complètes",
      price: "800€",
      duration: "2-3 semaines",
      features: ["5-8 pages", "Prototypage Figma", "User flows", "Tests utilisateurs"],
      popular: false
    },
    {
      title: "Refonte UI/UX",
      price: "1200€",
      duration: "3-4 semaines",
      features: ["Audit UX", "Nouveau design", "A/B testing", "Documentation"],
      popular: false
    }
  ],
  "Mobile Apps": [
    {
      title: "App MVP",
      price: "1000€",
      duration: "3-4 semaines",
      features: ["iOS & Android", "Fonctionnalités core", "Navigation", "Push notifications"],
      popular: true
    },
    {
      title: "App Complète",
      price: "2500€",
      duration: "6-8 semaines",
      features: ["Authentification", "Base de données", "Offline mode", "Analytics"],
      popular: false
    },
    {
      title: "App Entreprise",
      price: "4000€",
      duration: "8-12 semaines",
      features: ["Intégration backend", "Sécurité avancée", "Support multi-langue", "Admin panel"],
      popular: false
    }
  ],
  "SEO & Performance": [
    {
      title: "Audit SEO",
      price: "200€",
      duration: "1 semaine",
      features: ["Analyse technique", "Rapport détaillé", "Recommandations", "Keywords research"],
      popular: true
    },
    {
      title: "Optimisation Performance",
      price: "600€",
      duration: "2-3 semaines",
      features: ["Core Web Vitals", "Lazy loading", "Optimisation images", "Cache strategy"],
      popular: false
    },
    {
      title: "SEO Complet",
      price: "1000€",
      duration: "4-6 semaines",
      features: ["SEO technique", "Content optimization", "Backlinks", "Monitoring mensuel"],
      popular: false
    }
  ],
  "Base de Données": [
    {
      title: "Design Schema",
      price: "300€",
      duration: "1 semaine",
      features: ["Modélisation", "Relations", "Indexes", "Documentation"],
      popular: true
    },
    {
      title: "Migration DB",
      price: "800€",
      duration: "2-3 semaines",
      features: ["Migration data", "Zero downtime", "Validation", "Rollback plan"],
      popular: false
    },
    {
      title: "Architecture Scalable",
      price: "1500€",
      duration: "3-4 semaines",
      features: ["Sharding", "Replication", "Caching layer", "Monitoring"],
      popular: false
    }
  ]
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
                onClick={() => setSelectedService(service.title)}
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

      {/* Modal des offres */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-zinc-950 border border-cyan-400/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-cyan-400/20 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedService}</h2>
                  <p className="text-zinc-400 text-sm">Choisissez l'offre qui vous convient</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              {/* Offers */}
              <div className="p-6 space-y-4">
                {offersByService[selectedService as keyof typeof offersByService]?.map((offer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-6 rounded-xl border ${
                      offer.popular
                        ? 'border-cyan-400/50 bg-cyan-400/5'
                        : 'border-zinc-800 bg-zinc-900/50'
                    } hover:border-cyan-400/30 transition-all`}
                  >
                    {offer.popular && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-cyan-400 text-black text-xs font-bold rounded-full">
                        POPULAIRE
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-zinc-400">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-cyan-400" />
                            <span>{offer.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>{offer.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {offer.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className="mt-6 w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                      onClick={() => {
                        setSelectedService(null);
                        window.location.href = '/contact';
                      }}
                    >
                      Choisir cette offre
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
