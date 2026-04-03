"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Code2, Database, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

/* ─── Typewriter hook ─────────────────────────────────────── */
function useTypewriter(text: string, speed = 55, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ─── GlitchText component (STACK) ───────────────────────── */
function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block" style={{ lineHeight: "inherit" }}>
      {/* Calque rouge */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{
          background: "linear-gradient(90deg,#ff2d55,#ff6b6b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-r 4s 0.5s infinite",
          opacity: 0,
        }}
      >
        {children}
      </span>

      {/* Calque cyan */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{
          background: "linear-gradient(90deg,#00ffea,#0af)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-c 4s 0.5s infinite",
          opacity: 0,
        }}
      >
        {children}
      </span>

      {/* Texte principal */}
      <span
        className="relative z-10"
        style={{
          background: "linear-gradient(90deg,#1be7ff 0%,#1a8fff 60%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "glitch-main 4s 0.5s infinite",
          display: "inline-block",
        }}
      >
        {children}
      </span>

      {/* Scan line */}
      <span
        aria-hidden
        className="absolute pointer-events-none z-20"
        style={{
          left: "-4px",
          right: "-4px",
          height: "3px",
          background: "rgba(27,231,255,0.6)",
          animation: "slice 4s 0.5s infinite",
          opacity: 0,
        }}
      />
    </span>
  );
}

/* ─── Cursor blink ────────────────────────────────────────── */
function Cursor() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "3px",
        height: "0.82em",
        background: "#29b6e8",
        marginLeft: "6px",
        verticalAlign: "middle",
        boxShadow: "0 0 8px #29b6e8",
        animation: "blink-cur 0.8s step-end infinite",
      }}
    />
  );
}

/* ─── Hero ────────────────────────────────────────────────── */
export function Hero() {
  const full = useTypewriter("FULL", 80, 200);
  const eng  = useTypewriter("ENGINEER", 70, 1100);

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', monospace",
    fontWeight: 900,
    fontSize: "clamp(52px, 9vw, 86px)",
    lineHeight: 0.92,
    letterSpacing: "-0.01em",
    textTransform: "uppercase",
    color: "#ffffff",
    textShadow: "0 2px 40px rgba(0,60,120,0.55)",
  };

  return (
    <>
      {/* ── Keyframes injectés en <style> ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@300;400;500&display=swap');

        @keyframes glitch-main {
          0%,91%,100% { transform: translate(0); }
          92% { transform: translate(-3px,1px); }
          93% { transform: translate(3px,-1px); }
          94% { transform: translate(-2px,0); }
          95% { transform: translate(2px,1px); }
          96% { transform: translate(0); }
        }
        @keyframes glitch-r {
          0%,91%,97%,100% { opacity:0; transform:translate(0); }
          92% { opacity:.75; transform:translate(4px,0) skewX(2deg); }
          93% { opacity:.5;  transform:translate(-4px,1px); }
          94% { opacity:.65; transform:translate(3px,-1px) skewX(-1deg); }
          95% { opacity:0; }
        }
        @keyframes glitch-c {
          0%,91%,97%,100% { opacity:0; transform:translate(0); }
          92% { opacity:.6; transform:translate(-4px,-1px) skewX(-2deg); }
          93% { opacity:.75; transform:translate(4px,0); }
          94% { opacity:.4;  transform:translate(-3px,1px); }
          95% { opacity:0; }
        }
        @keyframes slice {
          0%,90%,97%,100% { opacity:0; top:0; }
          91% { opacity:1; top:28%; }
          92% { opacity:.8; top:62%; }
          93% { opacity:1; top:18%; }
          94% { opacity:.55; top:78%; }
          95% { opacity:0; }
        }
        @keyframes blink-cur {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }
        @keyframes dot-glow {
          0%,100% { box-shadow: 0 0 4px #29b6e8; }
          50%      { box-shadow: 0 0 12px #29b6e8, 0 0 24px rgba(41,182,232,0.4); }
        }
        @keyframes hud-blink {
          0%,90%,100% { opacity:.28; }
          45%          { opacity:.85; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div
        className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-24 py-20 min-h-[80vh]"
        style={{ fontFamily: "'Exo 2', sans-serif" }}
      >

        {/* ══════════ LEFT — Text ══════════ */}
        <div className="flex-1 z-10 relative flex flex-col gap-5">

          {/* Nébulosités ambiantes */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: 420, height: 280,
                top: -40, left: "30%",
                background: "radial-gradient(ellipse,rgba(0,180,200,0.11) 0%,transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 300, height: 300,
                bottom: -60, left: "5%",
                background: "radial-gradient(ellipse,rgba(0,80,180,0.14) 0%,transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Badge */}
          <motion.div
            className="flex flex-col gap-0.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#29b6e8",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: "#29b6e8",
                  flexShrink: 0,
                  animation: "dot-glow 2.2s ease-in-out infinite",
                }}
              />
              Full-Stack Developer
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: "0.2em",
                color: "rgba(100,160,190,0.55)",
                textTransform: "uppercase",
                paddingLeft: 14,
              }}
            >
              MEAN &amp; PEAN Specialist
            </span>
          </motion.div>

          {/* ── Titre animé ── */}
          <div className="flex flex-col" style={{ gap: 0 }}>

            {/* FULL — typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ ...headingStyle, minHeight: "0.92em" }}
            >
              {full.displayed}
              <span style={{ opacity: 0 }}>.</span>
            </motion.div>

            {/* STACK — glitch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ ...headingStyle, position: "relative" }}
            >
              <GlitchText>STACK</GlitchText>
            </motion.div>

            {/* ENGINEER — typewriter + cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={{ ...headingStyle, display: "flex", alignItems: "center" }}
            >
              {eng.displayed}
              {!eng.done && <Cursor />}
              {eng.done  && <Cursor />}
            </motion.div>

            {/* Règle déco */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.7, ease: "easeOut" }}
              style={{
                height: 1,
                marginTop: 6,
                transformOrigin: "left",
                background: "linear-gradient(90deg, rgba(41,182,232,0.5) 0%, transparent 65%)",
              }}
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            style={{
              fontSize: 14.5,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(170,210,235,0.65)",
              borderLeft: "1px solid rgba(41,182,232,0.3)",
              paddingLeft: 14,
              maxWidth: 440,
            }}
          >
            Spécialisé dans la conception d'applications robustes avec{" "}
            <strong style={{ color: "#c8e8f8", fontWeight: 500 }}>Angular</strong>,{" "}
            <strong style={{ color: "#c8e8f8", fontWeight: 500 }}>Node.js</strong> et les architectures{" "}
            <strong style={{ color: "#c8e8f8", fontWeight: 500 }}>NoSQL/SQL</strong>.
            Je transforme des logiques complexes en interfaces fluides et performantes.
          </motion.p>

          {/* Chips */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.5 }}
          >
            {["Next.js", "TypeScript", "Clean Architecture"].map((skill, i) => (
              <motion.div
                key={skill}
                whileHover={{
                  background: "rgba(0,80,140,0.55)",
                  borderColor: "rgba(41,182,232,0.6)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(41,182,232,0.3)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "5px 16px",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(150,210,240,0.85)",
                  background: "rgba(10,30,55,0.75)",
                  border: "1px solid rgba(41,182,232,0.22)",
                  borderRadius: 2,
                  clipPath:
                    "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                  cursor: "default",
                  animationDelay: `${2.3 + i * 0.1}s`,
                }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* HUD */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 8.5,
              letterSpacing: "0.13em",
              color: "rgba(41,182,232,0.28)",
            }}
          >
            {["SYS · ONLINE", "ALT ∞ LY", "LAT 18.9°S · 47.5°E"].map((t, i) => (
              <span
                key={t}
                style={{ animation: `hud-blink 3.5s ${i * 1.2}s ease-in-out infinite` }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══════════ RIGHT — Portrait ══════════ */}
        <div className="relative flex items-center justify-center flex-1">

          {/* Anneaux orbitaux */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-150 h-150 border border-cyan-500/10 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.1)]"
            >
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-zinc-950 border border-cyan-500/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Database className="text-cyan-400 h-4 w-4" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-120 h-120 border border-blue-500/20 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950 border border-blue-500/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <Code2 className="text-blue-400 h-5 w-5" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-95 h-95 border-2 border-cyan-400/30 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              <div className="absolute bottom-10 right-0 w-8 h-8 bg-zinc-950 border border-cyan-400/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <Cpu className="text-cyan-300 h-4 w-4" />
              </div>
            </motion.div>
          </div>

          {/* Halo glow */}
          <div className="absolute w-72 h-72 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" />

          {/* Portrait */}
          <motion.div
            className="relative group z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -inset-1.5 bg-cyan-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
            <div className="relative w-72 h-72 md:w-80 md:h-80 bg-zinc-900 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
              <img
                src="/images/me.png"
                alt="Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>

            {/* Badge Status */}
            <motion.div
              className="absolute -top-2 -right-2 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-cyan-500/50"
              style={{ boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#29b6e8",
                    }}
                  >
                    Status
                  </p>
                  <p className="text-xs font-bold">Open to Work</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </>
  );
}