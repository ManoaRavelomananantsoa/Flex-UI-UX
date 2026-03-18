"use client";
import React, { useState, useEffect, useRef } from "react";
import { Database, Layout, Server, Code2, Sparkles, ArrowRight } from "lucide-react";
import "./BentoGrid.css";

const items = [
  {
    title: "Expertise Frontend",
    description: "Interfaces réactives avec Angular (RxJS/Signals) et Next.js.",
    backDescription: "Angular, Next.js, TypeScript, TailwindCSS",
    icon: <Layout size={24} color="#22d3ee" />,
    spanTwo: true,
    color: "#083344",
  },
  {
    title: "Full-Stack",
    description: "Architectures MEAN & PEAN robustes.",
    backDescription: "Node.js, Express, MongoDB, PostgreSQL",
    icon: <Server size={24} color="#34d399" />,
    spanTwo: false,
    color: "#064e3b",
  },
  {
    title: "Data Master",
    description: "SQL & NoSQL (Postgres / Mongo).",
    backDescription: "MongoDB, PostgreSQL, Prisma, Redis",
    icon: <Database size={24} color="#fb923c" />,
    spanTwo: false,
    color: "#7c2d12",
  },
  {
    title: "Clean Code",
    description: "SOLID & Design Patterns pour la scalabilité.",
    backDescription: "SOLID, Clean Architecture, Repository Pattern",
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
            <h2 className="bento-header-text">Mes compétences</h2>
          </div>

          <div className="bento-grid">
            {items.map((item, i) => (
              <div
                key={i}
                className={item.spanTwo ? "bento-span-two" : ""}
              >
                {/* Couche 1 — scroll animation (opacity + translate) */}
                <div
                  ref={(el) => { scrollRefs.current[i] = el; }}
                  className={`bento-scroll-layer${visibleCards.has(i) ? " in-view" : ""}`}
                >
                  {/* Couche 2 — perspective */}
                  <div className="bento-perspective">

                    {/* Couche 3 — flip */}
                    <div
                      onClick={() => toggleCard(i)}
                      className={`bento-inner${flippedCards.has(i) ? " is-flipped" : ""}`}
                    >
                      {/* FACE AVANT */}
                      {/* FACE AVANT */}
                      <div className="bento-face bento-front">
                        <div className="bento-front-mask" />
                        <div className="bento-neon2" />
                        <div className="bento-neon2-glow" />
                        <div>
                          <div className="bento-icon-box">{item.icon}</div>
                          <h3 className="bento-card-title">{item.title}</h3>
                          <p className="bento-card-desc">{item.description}</p>
                        </div>
                        <div className="bento-hint">
                          Détails <ArrowRight size={12} />
                        </div>
                      </div>

                      {/* FACE ARRIÈRE */}
                      <div
                        className="bento-face bento-back"
                        style={{ backgroundColor: item.color }}
                      >
                        <h3 className="bento-back-title">Stack Technique</h3>
                        <div className="bento-tags">
                          {item.backDescription.split(", ").map((tech, idx) => (
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
