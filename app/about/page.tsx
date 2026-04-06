"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { User, Code, Sparkles, Briefcase, GraduationCap, Heart } from "lucide-react";
import { useEffect } from "react";

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js & Express", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "PostgreSQL & MongoDB", level: 82 },
  { name: "DevOps & CI/CD", level: 75 },
];

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "Tech Solutions Inc.",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies."
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "Digital Agency Pro",
    description: "Built responsive web applications and e-commerce platforms for diverse clients."
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "Startup Hub",
    description: "Developed interactive user interfaces and implemented modern design systems."
  }
];

export default function AboutPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#09090b';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="text-cyan-400 h-5 w-5" />
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">
                Who I Am
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              ABOUT <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                ME
              </span>
            </h1>
          </motion.div>

          {/* Bio Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full" />
                <img
                  src="/images/me.png"
                  alt="Profile"
                  className="relative w-full max-w-md mx-auto rounded-2xl border border-cyan-500/30"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-4">
                Full-Stack Developer & UI Designer
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Passionate about creating beautiful, functional, and user-friendly digital experiences. 
                With over 5 years of experience in web development, I specialize in building modern 
                applications using cutting-edge technologies.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source 
                projects, or enjoying a good cup of coffee while sketching new ideas.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <Code size={16} className="text-cyan-400" />
                  <span className="text-sm">Clean Code</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <Sparkles size={16} className="text-cyan-400" />
                  <span className="text-sm">Creative Design</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <Heart size={16} className="text-cyan-400" />
                  <span className="text-sm">Passion Driven</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-cyan-400" />
              Technical Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" />
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-8 pb-8 border-l-2 border-zinc-800 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-cyan-500 rounded-full border-4 border-[#09090b]" />
                  <span className="text-cyan-400 text-sm font-mono">{exp.year}</span>
                  <h4 className="text-xl font-bold mt-1">{exp.role}</h4>
                  <p className="text-zinc-500 text-sm mb-2">{exp.company}</p>
                  <p className="text-zinc-400">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
