"use client";
import { Navbar } from "@/components/Navbar";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js & Express", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "PostgreSQL & MongoDB", level: 82 },
  { name: "DevOps & CI/CD", level: 75 },
];

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

const stats = [
  { value: 3, suffix: "+", label: "ANNÉES EXP." },
  { value: 2, suffix: "+", label: "PROJETS LIVRÉS" },
  { value: 3, suffix: "+", label: "CLIENTS SATISFAITS" },
];

const terminalLines = [
  { cmd: "whoami", out: "→ Developer | Designer | Problem Solver" },
  { cmd: "cat skills.json", out: '→ { react, ts, node, design, devops... }' },
  { cmd: "git log --oneline", out: "→ 5+ years of commits & counting 🚀" },
];

/* ── Animated counter ── */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-orbitron text-3xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

/* ── Terminal typing effect ── */
function Terminal() {
  const [cmdText, setCmdText] = useState("");
  const [outText, setOutText] = useState("");
  const [showOut, setShowOut] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function typeNext() {
      const { cmd, out } = terminalLines[indexRef.current % terminalLines.length];
      indexRef.current++;
      setCmdText("");
      setOutText("");
      setShowOut(false);
      let i = 0;
      function typeChar() {
        setCmdText(cmd.slice(0, ++i));
        if (i < cmd.length) timeout = setTimeout(typeChar, 80);
        else {
          timeout = setTimeout(() => {
            setOutText(out);
            setShowOut(true);
            timeout = setTimeout(typeNext, 3000);
          }, 400);
        }
      }
      typeChar();
    }
    timeout = setTimeout(typeNext, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative bg-[#00050f]/90 border border-cyan-500/25 rounded-xl p-5 font-mono text-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
      </div>
      <p className="text-cyan-500/70 leading-8">
        <span className="text-cyan-400">~$ </span>
        <span className="text-white">{cmdText}</span>
      </p>
      <p
        className="text-cyan-500/50 leading-8 transition-opacity duration-500"
        style={{ opacity: showOut ? 1 : 0 }}
      >
        {outText}
      </p>
      <p className="text-cyan-500/70 leading-8">
        <span className="text-cyan-400">~$ </span>
        <span className="inline-block w-2 h-4 bg-cyan-400 align-middle animate-pulse" />
      </p>
      {/* Top shimmer line */}
      <span className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_linear_infinite]" />
    </div>
  );
}

export default function AboutPage() {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-80px" });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [mounted, setMounted] = useState(false);

  // Charger les expériences depuis l'API
  useEffect(() => {
    setMounted(true);
    const loadExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
      }
    };
    loadExperiences();
  }, []);

  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30 overflow-hidden">
      <Navbar />


      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div
              animate={{ boxShadow: ["0 0 0 transparent", "0 0 20px rgba(0,200,255,0.3)", "0 0 0 transparent"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 border border-cyan-400/50 bg-cyan-500/5 px-5 py-2 rounded-full mb-6"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
              <span className="font-mono text-xs tracking-[3px] text-cyan-400 uppercase">
                System Online — Who I Am
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span className="text-[#e0f2ff]">ABOUT </span>
              <span
                className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-size-[200%_auto] bg-clip-text text-transparent"
                style={{ animation: "shimmer 3s linear infinite" }}
              >
                ME
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px w-24 mx-auto bg-linear-to-r from-transparent via-cyan-400 to-transparent"
            />
          </motion.div>

          {/* ── BIO ── */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">

            {/* Photo + orbital rings */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center"
              style={{ minHeight: 380 }}
            >
              <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>

                {/* Ring 3 – slow */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ width: 340, height: 340, border: "1px solid rgba(0,100,255,0.2)", borderRadius: "50%" }}
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#0055ff]" />
                </motion.div>

                {/* Ring 2 – medium, dashed, reverse */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ width: 300, height: 300, border: "1px dashed rgba(0,150,255,0.3)", borderRadius: "50%" }}
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#005fff]" />
                </motion.div>

                {/* Ring 1 – fast */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ width: 260, height: 260, border: "1px solid rgba(0,200,255,0.3)", borderRadius: "50%" }}
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00c8ff,0_0_24px_#00c8ff]" />
                </motion.div>

                {/* Photo frame */}
                <div className="relative z-10" style={{ width: 200, height: 200 }}>
                  {/* HUD brackets */}
                  {[
                    "top-[-8px] left-[-8px] border-t-2 border-l-2",
                    "top-[-8px] right-[-8px] border-t-2 border-r-2",
                    "bottom-[-8px] left-[-8px] border-b-2 border-l-2",
                    "bottom-[-8px] right-[-8px] border-b-2 border-r-2",
                  ].map((cls, i) => (
                    <span key={i} className={`absolute w-5 h-5 border-cyan-400 ${cls}`} />
                  ))}

                  <motion.div
                    animate={{ boxShadow: ["0 0 20px rgba(0,200,255,0.3),0 0 60px rgba(0,200,255,0.1)", "0 0 40px rgba(0,200,255,0.7),0 0 100px rgba(0,200,255,0.25)", "0 0 20px rgba(0,200,255,0.3),0 0 60px rgba(0,200,255,0.1)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-full h-full rounded-full border-2 border-cyan-500/50 overflow-hidden"
                  >
                    <motion.img
                      src="/images/profile/me.png"
                      alt="Profile"
                      animate={{ scale: [1.02, 1.06, 1.02] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full object-cover"
                      style={{ filter: "saturate(1.2) brightness(1.1)" }}
                    />
                    {/* Scan line */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,200,255,0.15) 50%, transparent 100%)", height: 60 }}
                    />
                  </motion.div>
                </div>

                {/* HUD label */}
                <motion.p
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-4 font-mono text-[10px] tracking-[2px] text-cyan-400/50"
                >
                  ID_VERIFIED ◆ STATUS: ACTIVE
                </motion.p>
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-5 text-[#e0f2ff] leading-snug">
                Full-Stack Developer<br />& UI Designer
              </h2>
              <p className="text-cyan-100/60 leading-relaxed mb-4">
                Passionné par la création d'expériences numériques belles, fonctionnelles et mémorables. Plus de 5 ans d'expérience dans le développement web moderne.
              </p>
              <p className="text-cyan-100/60 leading-relaxed mb-8">
                Quand je ne code pas, j'explore de nouveaux design trends, contribue à l'open-source ou esquisse de nouvelles idées autour d'un café.
              </p>
              <div className="flex flex-wrap gap-3">
                {["⚡ Clean Code", "◈ Creative Design", "◇ Passion Driven", "▣ Open Source"].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -2, boxShadow: "0 0 20px rgba(0,200,255,0.2)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500/5 border border-cyan-500/25 rounded-full text-sm text-cyan-400 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-3 gap-4 mb-20">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,200,255,0.15)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-[#00050f]/70 border border-cyan-500/20 rounded-xl p-5 text-center overflow-hidden"
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <p className="text-xs text-cyan-100/50 tracking-wider mt-1">{s.label}</p>
                {/* Animated top border shimmer */}
                <motion.span
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                  className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent"
                />
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent mb-16" />

          {/* ── SKILLS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-cyan-400 text-lg">◈</span>
              <h3 className="font-mono text-sm tracking-[3px] text-cyan-400 uppercase">Technical Skills</h3>
              <div className="flex-1 h-px bg-linear-to-r from-cyan-400/50 to-transparent" />
            </div>

            <div ref={skillsRef} className="grid md:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ borderColor: "rgba(0,200,255,0.5)", boxShadow: "0 0 30px rgba(0,200,255,0.08), inset 0 0 30px rgba(0,200,255,0.03)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#00050f]/60 border border-cyan-500/15 rounded-xl p-4 transition-colors"
                >
                  <div className="flex justify-between mb-2.5">
                    <span className="text-sm font-semibold text-cyan-100/80">{skill.name}</span>
                    <span className="font-mono text-sm text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-cyan-500/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={skillsInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-400"
                      style={{ boxShadow: "0 0 8px rgba(0,200,255,0.6)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent mb-16" />

          {/* ── EXPERIENCE TIMELINE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-cyan-400 text-lg">▣</span>
              <h3 className="font-mono text-sm tracking-[3px] text-cyan-400 uppercase">Experience Timeline</h3>
              <div className="flex-1 h-px bg-linear-to-r from-cyan-400/50 to-transparent" />
            </div>

            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-linear-to-b from-cyan-400/60 to-cyan-400/10" />

              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <motion.div
                    animate={{ boxShadow: ["0 0 12px rgba(0,200,255,0.8)", "0 0 24px rgba(0,200,255,1),0 0 40px rgba(0,200,255,0.4)", "0 0 12px rgba(0,200,255,0.8)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute left-[-29px] top-1 w-3.5 h-3.5 rounded-full bg-[#040b18] border-2 border-cyan-400"
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-[3px] rounded-full bg-cyan-400"
                    />
                  </motion.div>

                  <p className="font-mono text-xs text-cyan-400 tracking-widest mb-1">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <h4 className="text-xl font-bold text-[#e0f2ff] mb-0.5">{exp.position}</h4>
                  <p className="text-sm text-cyan-400/40 mb-2">{exp.company}</p>
                  <p className="text-cyan-100/60 text-sm leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── TERMINAL ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-cyan-400 text-lg">▶</span>
              <h3 className="font-mono text-sm tracking-[3px] text-cyan-400 uppercase">System Log</h3>
              <div className="flex-1 h-px bg-linear-to-r from-cyan-400/50 to-transparent" />
            </div>
            <Terminal />
          </motion.div>

        </div>
      </section>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(100vh); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}