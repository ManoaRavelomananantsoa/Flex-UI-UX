import { Mail, Github, Globe, Zap, Shield, Cpu } from "lucide-react";

const items = [
  {
    title: "Performance Next.js",
    description: "Optimisation du rendu et temps de chargement éclair.",
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
    className: "md:col-span-2",
    bg: "bg-zinc-900/50",
  },
  {
    title: "Sécurité",
    description: "Auth sécurisée et gestion des données.",
    icon: <Shield className="h-4 w-4 text-blue-400" />,
    className: "md:col-span-1",
    bg: "bg-zinc-900/50",
  },
  {
    title: "Architecture",
    description: "Code propre et scalable.",
    icon: <Cpu className="h-4 w-4 text-emerald-400" />,
    className: "md:col-span-1",
    bg: "bg-zinc-900/50",
  },
  {
    title: "Projets Open Source",
    description: "Mes contributions majeures sur GitHub.",
    icon: <Github className="h-4 w-4 text-zinc-300" />,
    className: "md:col-span-2",
    bg: "bg-zinc-900/50",
  },
];

export function BentoGrid() {
  return (
    <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto p-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={`group relative overflow-hidden rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between transition-all hover:border-zinc-500 hover:shadow-2xl hover:shadow-white/5 ${item.className} ${item.bg}`}
        >
          {/* Effet de lueur en fond au hover */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="mb-4 rounded-lg bg-zinc-800 w-fit p-2 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
          </div>
          
          <div className="relative z-10 mt-4 flex items-center text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">
            En savoir plus →
          </div>
        </div>
      ))}
    </div>
  );
}