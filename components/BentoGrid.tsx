"use client";
import React, { useState, useEffect, useRef } from "react";
import { Database, Layout, Server, Code2, Sparkles, ArrowRight } from "lucide-react";

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

const css = `
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes orbit {
    to { --angle: 360deg; }
  }

  .bento-section {
    padding: 6rem 1rem;
    background: #000;
    color: #fff;
  }

  .bento-container {
    max-width: 64rem;
    margin: 0 auto;
  }

  .bento-header {
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .bento-header-text {
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 20rem;
    gap: 1.5rem;
  }

  .bento-span-two {
    grid-column: span 2;
  }

  .bento-scroll-layer {
    height: 100%;
    opacity: 0;
    translate: 0 48px;
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      translate 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bento-scroll-layer.in-view {
    opacity: 1;
    translate: 0 0;
  }

  .bento-perspective {
    perspective: 1200px;
    height: 100%;
  }

  .bento-inner {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bento-inner.is-flipped {
    transform: rotateY(180deg);
  }

  .bento-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 2.5rem;
    padding: 2rem;
  }

  /* ── Face avant ── */
  .bento-front {
    background: #09090b;
    border: 1.5px solid rgba(0, 207, 255, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: visible;
  }

  /* Arc neon #1 */
  .bento-front::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: calc(2.5rem + 1px);
    background: conic-gradient(
      from var(--angle),
      transparent 0deg,
      transparent 55deg,
      #0099cc 70deg,
      #00cfff 88deg,
      #60f8ff 100deg,
      #00cfff 112deg,
      #0099cc 130deg,
      transparent 150deg,
      transparent 360deg
    );
    animation: orbit 6s linear infinite;
    z-index: 0;
    pointer-events: none;
  }

  /* Glow #1 */
  .bento-front::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: calc(2.5rem + 4px);
    background: conic-gradient(
      from var(--angle),
      transparent 0deg,
      transparent 50deg,
      rgba(0, 180, 255, 0.08) 75deg,
      rgba(0, 230, 255, 0.28) 100deg,
      rgba(100, 248, 255, 0.08) 125deg,
      transparent 150deg,
      transparent 360deg
    );
    animation: orbit 6s linear infinite;
    filter: blur(6px);
    z-index: -1;
    pointer-events: none;
  }

  /* Arc neon #2 — opposé à 180deg */
  .bento-neon2 {
    position: absolute;
    inset: -1px;
    border-radius: calc(2.5rem + 1px);
    background: conic-gradient(
      from calc(var(--angle) + 180deg),
      transparent 0deg,
      transparent 55deg,
      #0099cc 70deg,
      #00cfff 88deg,
      #60f8ff 100deg,
      #00cfff 112deg,
      #0099cc 130deg,
      transparent 150deg,
      transparent 360deg
    );
    animation: orbit 6s linear infinite;
    z-index: 0;
    pointer-events: none;
  }

  /* Glow #2 */
  .bento-neon2-glow {
    position: absolute;
    inset: -4px;
    border-radius: calc(2.5rem + 4px);
    background: conic-gradient(
      from calc(var(--angle) + 180deg),
      transparent 0deg,
      transparent 50deg,
      rgba(0, 180, 255, 0.08) 75deg,
      rgba(0, 230, 255, 0.28) 100deg,
      rgba(100, 248, 255, 0.08) 125deg,
      transparent 150deg,
      transparent 360deg
    );
    animation: orbit 6s linear infinite;
    filter: blur(6px);
    z-index: -1;
    pointer-events: none;
  }

  /* Masque qui cache le conic derrière le fond de la carte */
  .bento-front-mask {
    position: absolute;
    inset: 0.5px;
    border-radius: calc(2.5rem - 0.5px);
    background: #09090b;
    z-index: 1;
    pointer-events: none;
  }

  /* Tout le contenu passe au-dessus du masque */
  .bento-front > *:not(.bento-front-mask):not(.bento-neon2):not(.bento-neon2-glow) {
    position: relative;
    z-index: 2;
  }

  /* Hover : intensité uniquement (pas de changement de vitesse) */
  .bento-inner:hover .bento-front::before {
    background: conic-gradient(
      from var(--angle),
      transparent 0deg,
      transparent 45deg,
      #0077bb 60deg,
      #00cfff 80deg,
      #ffffff 100deg,
      #00cfff 120deg,
      #0077bb 140deg,
      transparent 165deg,
      transparent 360deg
    );
  }

  .bento-inner:hover .bento-front::after {
    filter: blur(8px);
    background: conic-gradient(
      from var(--angle),
      transparent 0deg,
      transparent 50deg,
      rgba(0, 180, 255, 0.12) 75deg,
      rgba(0, 230, 255, 0.45) 100deg,
      rgba(100, 248, 255, 0.12) 125deg,
      transparent 150deg,
      transparent 360deg
    );
  }

  .bento-inner:hover .bento-neon2 {
    background: conic-gradient(
      from calc(var(--angle) + 180deg),
      transparent 0deg,
      transparent 45deg,
      #0077bb 60deg,
      #00cfff 80deg,
      #ffffff 100deg,
      #00cfff 120deg,
      #0077bb 140deg,
      transparent 165deg,
      transparent 360deg
    );
  }

  .bento-inner:hover .bento-neon2-glow {
    filter: blur(8px);
  }

  .bento-inner:hover .bento-hint {
    color: rgba(0, 207, 255, 0.5);
  }

  /* ── Face arrière ── */
  .bento-back {
    transform: rotateY(180deg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  /* ── Icône ── */
  .bento-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    margin-bottom: 1.5rem;
  }

  .bento-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
  }

  .bento-card-desc {
    color: #a1a1aa;
    font-size: 0.875rem;
    margin: 0;
  }

  .bento-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #3f3f46;
    transition: color 0.2s;
  }

  .bento-back-title {
    font-weight: 700;
    font-size: 1rem;
    margin: 0 0 1.5rem;
  }

  .bento-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .bento-tag {
    padding: 0.25rem 0.75rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    font-size: 0.625rem;
    color: #d4d4d8;
  }

  @media (max-width: 768px) {
    .bento-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: 280px;
    }
    .bento-span-two {
      grid-column: span 1;
    }
  }
`;

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
    <>
      <style>{css}</style>

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
    </>
  );
}
