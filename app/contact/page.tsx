"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">// get in touch</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "-.01em" }}>
              Contact Me
            </h1>
            <div className="h-px w-24 mx-auto bg-linear-to-r from-cyan-400 to-transparent" />
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate on your next project.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Mail className="text-cyan-400" size={24} />
                Send Message
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={24} />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-cyan-400" size={20} />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-zinc-400">ravelomanantsoamanoa89@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="text-cyan-400" size={20} />
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <p className="text-zinc-400">+261 34 35 894 73</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <MapPin className="text-cyan-400" size={20} />
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-zinc-400">Antananarivo, Madagascar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Github className="text-cyan-400" size={24} />
                  Social Profiles
                </h3>
                
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/ManoaRavelomananantsoa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-white">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="text-white">LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
