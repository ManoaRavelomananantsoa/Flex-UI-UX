"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client
      window.location.href = `mailto:ravelomanantsoamanoa89@gmail.com?subject=${subject}&body=${body}`;
      
      setSubmitStatus('success');
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30 overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

        @keyframes neon-flicker {
          0%, 100% { text-shadow: 0 0 8px #00e5ff, 0 0 20px #00e5ff, 0 0 40px #0088ff; }
          50% { text-shadow: 0 0 4px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #0055ff; }
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(0,229,255,0.3), inset 0 0 10px rgba(0,229,255,0.05); }
          50% { box-shadow: 0 0 20px rgba(0,229,255,0.5), inset 0 0 20px rgba(0,229,255,0.08); }
        }

        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .glass-panel {
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(0,200,255,0.18);
          animation: border-glow 4s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .glass-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,220,255,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .glass-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,220,255,0.6), transparent);
          pointer-events: none;
        }

        .neon-input {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0,180,255,0.2);
          color: #e0f7ff;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .neon-input::placeholder {
          color: rgba(0,180,255,0.35);
        }

        .neon-input:focus {
          outline: none;
          border-color: rgba(0,229,255,0.7);
          box-shadow: 0 0 0 1px rgba(0,229,255,0.3), 0 0 20px rgba(0,229,255,0.15), inset 0 0 10px rgba(0,229,255,0.05);
        }

        .neon-btn {
          background: linear-gradient(135deg, rgba(0,150,255,0.3), rgba(0,229,255,0.2));
          border: 1px solid rgba(0,229,255,0.5);
          color: #00e5ff;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .neon-btn:hover {
          background: linear-gradient(135deg, rgba(0,180,255,0.5), rgba(0,229,255,0.35));
          box-shadow: 0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,150,255,0.2);
          border-color: rgba(0,229,255,0.9);
          color: #fff;
        }

        .neon-btn::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -60%;
          width: 40%;
          height: 300%;
          background: rgba(255,255,255,0.08);
          transform: skewX(-20deg);
          transition: all 0.5s ease;
        }

        .neon-btn:hover::before {
          left: 130%;
        }

        .social-btn {
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(0,180,255,0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-btn:hover {
          background: rgba(0,80,150,0.35);
          border-color: rgba(0,229,255,0.6);
          box-shadow: 0 0 15px rgba(0,229,255,0.25);
        }

        .neon-title {
          font-family: 'Orbitron', monospace;
          animation: neon-flicker 4s ease-in-out infinite;
        }

        .neon-label {
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.08em;
          color: rgba(0,200,255,0.7);
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        .contact-icon-wrap {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(0,180,255,0.1);
          border: 1px solid rgba(0,180,255,0.25);
          flex-shrink: 0;
        }

        .scan-overlay {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent);
          animation: scan-line 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .data-tag {
          font-family: 'Rajdhani', sans-serif;
          color: rgba(0,229,255,0.5);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Scan line effect */}
      <div className="scan-overlay" aria-hidden />

      <Navbar />

      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="data-tag mb-3">// SYS.COMM — INITIALIZE_CONTACT</p>

           <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span className="text-[#e0f2ff]">CONTACT </span>
              <span
                className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-size-[200%_auto] bg-clip-text text-transparent"
                style={{ animation: "shimmer 3s linear infinite" }}
              >
                ME
              </span>
            </h1>

            <div style={{
              height: 1,
              width: 400,
              margin: "0 auto 16px",
              background: "linear-gradient(90deg, transparent, #00e5ff, transparent)"
            }} />

            <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(140,200,255,0.7)", fontSize: "1.05rem" }}>
              Ready to bring your ideas to life? Let's collaborate on your next project.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-panel rounded-2xl p-8"
            >
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", color: "#00e5ff", letterSpacing: "0.1em" }} className="mb-6 flex items-center gap-3">
                <Mail size={20} style={{ color: "#00e5ff" }} />
                SEND MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="neon-label block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="neon-input w-full px-4 py-3 rounded-lg"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="neon-label block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="neon-input w-full px-4 py-3 rounded-lg"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="neon-label block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="neon-input w-full px-4 py-3 rounded-lg resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                    ✓ Message sent successfully! Your email client should open.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    ✗ Error sending message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="neon-btn w-full px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: "0.85rem" }}
                >
                  <Send size={16} />
                  {isSubmitting ? 'SENDING...' : 'SEND'}
                </button>
              </form>
            </motion.div>

            {/* Right column */}
            <div className="space-y-6">

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="glass-panel rounded-2xl p-8"
              >
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9rem", color: "#00e5ff", letterSpacing: "0.1em" }} className="mb-6 flex items-center gap-3">
                  <MapPin size={18} style={{ color: "#00e5ff" }} />
                  CONTACT INFO
                </h3>

                <div className="space-y-5">
                  {[
                    { icon: <Mail size={18} style={{ color: "#00e5ff" }} />, label: "EMAIL", value: "ravelomanantsoamanoa89@gmail.com" },
                    { icon: <Phone size={18} style={{ color: "#00e5ff" }} />, label: "PHONE", value: "+261 34 35 894 73" },
                    { icon: <MapPin size={18} style={{ color: "#00e5ff" }} />, label: "LOCATION", value: "Antananarivo, Madagascar" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="contact-icon-wrap">{icon}</div>
                      <div>
                        <p className="neon-label">{label}</p>
                        <p style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(200,235,255,0.85)", fontSize: "0.95rem", marginTop: 2 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="glass-panel rounded-2xl p-8"
              >
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9rem", color: "#00e5ff", letterSpacing: "0.1em" }} className="mb-6 flex items-center gap-3">
                  <Github size={18} style={{ color: "#00e5ff" }} />
                  SOCIAL PROFILES
                </h3>

                <div className="flex gap-4">
                  {[
                    { href: "https://github.com/ManoaRavelomananantsoa", icon: <Github size={18} />, label: "GitHub" },
                    { href: "https://linkedin.com", icon: <Linkedin size={18} />, label: "LinkedIn" },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn flex items-center gap-3 px-5 py-3 rounded-xl"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(0,220,255,0.85)", letterSpacing: "0.05em" }}
                    >
                      {icon}
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(0,180,255,0.35)",
              letterSpacing: "0.15em",
              textTransform: "uppercase"
            }}
          >
            <span>◉ SYSTEM ACTIVE</span>
            <span>|</span>
            <span>◎ SECURE CONNECTION</span>
            <span>|</span>
            <span>◉ ONLINE</span>
          </motion.div>

        </div>
      </section>
    </main>
  );
}