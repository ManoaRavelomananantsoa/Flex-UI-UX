"use client";
import React, { useState, useEffect, useRef } from "react";
import { Database, Layout, Server, Code2, Sparkles, ArrowRight } from "lucide-react";
import "./BentoGrid.css";

const items = [
  {
    title: "Frontend Expertise",
    description: "Responsive interfaces with Angular (RxJS/Signals) and Next.js.",
    backTitle: "Frontend Dev",
    backDesc: "Building pixel-perfect, reactive UIs with modern frameworks — real-time data streams with RxJS, SSR/ISR with Next.js, and type-safe codebases throughout.",
    backTechs: ["Angular", "Next.js", "TypeScript", "TailwindCSS", "RxJS"],
    icon: <Layout size={24} color="#22d3ee" />,
    spanTwo: true,
    color: "#083344",
  },
  {
    title: "Full-Stack",
    description: "Robust MEAN & PEAN architectures.",
    backTitle: "Backend Systems",
    backDesc: "REST & GraphQL APIs with Node/Express, scalable DB schemas, JWT auth, and clean layered architecture from route to repository.",
    backTechs: ["Node.js", "Express",  "PostgreSQL"],
    icon: <Server size={24} color="#34d399" />,
    spanTwo: false,
    color: "#064e3b",
  },
  {
    title: "Data Master",
    description: "SQL & NoSQL (Postgres / Mongo).",
    backTitle: "Data Layer",
    backDesc: "Schema design, query optimization, migrations with Prisma, and caching strategies with Redis for high-throughput applications.",
    backTechs: ["MongoDB", "PostgreSQL", "Prisma", "Redis"],
    icon: <Database size={24} color="#fb923c" />,
    spanTwo: false,
    color: "#7c2d12",
  },
  {
    title: "Clean Code",
    description: "SOLID & Design Patterns for scalability.",
    backTitle: "Architecture",
    backDesc: "Applying SOLID principles, Repository and Strategy patterns to keep codebases maintainable, testable, and ready to scale without rewrites.",
    backTechs: ["SOLID", "Clean Arch", "Repository", "DI", "Design Patterns"],
    icon: <Code2 size={24} color="#a78bfa" />,
    spanTwo: true,
    color: "#4c1d95",
  },
];

export function BentoGrid() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    scrollRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, i * 120);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleCard = (i: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section className="bento-section">
      <div className="bento-container">

        <div className="bento-header">
          <Sparkles size={18} color="#22d3ee" />
          <h2 className="bento-header-text">My Skills</h2>
        </div>

        <div className="bento-grid">
          {items.map((item, i) => (
            <div key={i} className={item.spanTwo ? "bento-span-two" : ""}>

              {/* Couche scroll reveal */}
              <div
                ref={(el) => { scrollRefs.current[i] = el; }}
                className={`bento-scroll-layer${visibleCards.has(i) ? " in-view" : ""}`}
              >
                {/* Perspective */}
                <div className="bento-perspective">

                  {/* Flip */}
                  <div
                    onClick={() => toggleCard(i)}
                    className={`bento-inner${flippedCards.has(i) ? " is-flipped" : ""}`}
                  >

                    {/* ── FACE AVANT ── */}
                    <div className="bento-face bento-front">

                      {/* Arcs neon rotatifs */}
                      <div className="bento-neon2" />
                      <div className="bento-neon2-glow" />

                      {/* Masque fond noir */}
                      <div className="bento-front-mask" />

                      {/* Accents coins angulaires */}
                      <div className="bento-corner-accent bento-corner-tr" />
                      <div className="bento-corner-accent bento-corner-bl" />

                      {/* Ligne accent coin haut-gauche */}
                      <div className="bento-cut-line" />

                      {/* Contenu */}
                      <div>
                        <div className="bento-icon-box">{item.icon}</div>
                        <h3 className="bento-card-title">{item.title}</h3>
                        <p className="bento-card-desc">{item.description}</p>
                      </div>

                      <div className="bento-hint">
                        Details <ArrowRight size={12} />
                      </div>
                    </div>

                    {/* ── FACE ARRIÈRE ── */}
                    {/* ── FACE ARRIÈRE ── */}
                    <div className="bento-face bento-back">

                      {/* Header label */}
                      <div className="bento-back-header">
                        <div className="bento-back-dot" />
                        <span className="bento-back-label">Tech Stack</span>
                      </div>

                      {/* Titre */}
                      <h3 className="bento-back-title">{item.backTitle}</h3>

                      {/* Description */}
                      <p className="bento-back-desc">{item.backDesc}</p>

                      {/* Divider */}
                      <div className="bento-back-divider" />

                      {/* Tags */}
                      <p className="bento-back-stack-label">Technologies</p>
                      <div className="bento-tags">
                        {item.backTechs.map((tech, idx) => (
                          <span key={idx} className="bento-tag">{tech}</span>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}