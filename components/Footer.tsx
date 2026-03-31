import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: <Github size={18} />, href: "https://github.com" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://linkedin.com" },
    { name: "Email", icon: <Mail size={18} />, href: "mailto:contact@portfolio.com" },
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
        </div>

       
        <div className="border-t border-b border-white/5 py-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Vous avez un projet ?</h3>
              <p className="text-zinc-400 text-sm">N'hésitez pas à me contacter pour collaborer.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-cyan-400 transition-colors"
            >
              Me contacter
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-zinc-500">
            © {currentYear} Portfolio. Tous droits réservés.
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
