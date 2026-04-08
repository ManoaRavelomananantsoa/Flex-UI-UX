import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: <Github size={18} />, href: "https://github.com/ManoaRavelomananantsoa" },
    //{ name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://linkedin.com" },
    { name: "Email", icon: <Mail size={18} />, href: "mailto:ravelomanantsoamanoa89@gmail.com" },
    //{ name: "Phone", icon: <Phone size={18} />, href: "tel:+261343589473" },
  ];

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter text-cyan-400">PORTFOLIO</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">Unique Designs</span>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
            <a 
              href="mailto:ravelomanantsoamanoa89@gmail.com" 
              className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Mail size={16} />
              <span>ravelomanantsoamanoa89@gmail.com</span>
            </a>
            <a 
              href="tel:+261343589473" 
              className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Phone size={16} />
              <span>+261 34 35 894 73</span>
            </a>
          </div>
        </div>

       
        <div className="border-t border-b border-white/5 py-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Have a project?</h3>
              <p className="text-zinc-400 text-sm">Feel free to contact me to collaborate.</p>
            </div>
            <a
              href="mailto:ravelomanantsoamanoa89@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-cyan-400 transition-colors"
            >
              Contact Me
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-zinc-500">
            © {currentYear} Portfolio. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-cyan-400 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
