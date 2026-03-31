// "use client";
// import { useEffect, useRef } from "react";

// export default function ParallaxNeonBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const scrollYRef = useRef(0);
//   const smoothScrollRef = useRef(0);
//   const rafId = useRef<number>(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d", { alpha: false })!;

//     let W: number, H: number;
//     const resize = () => {
//       W = canvas.width = window.innerWidth;
//       H = canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const rand = (min: number, max: number) => min + Math.random() * (max - min);

//     // --- DATA ---
//     const starsFar = Array.from({ length: 200 }, () => ({
//       x: rand(0, 1), y: rand(0, 1), r: rand(0.5, 1.2), opacity: rand(0.3, 0.8)
//     }));

//     const starsNeon = Array.from({ length: 30 }, () => ({
//       x: rand(0, 1), y: rand(0, 1), r: rand(1.5, 3), hue: rand(180, 210)
//     }));

//     const accretion = Array.from({ length: 120 }, () => ({
//       angle: rand(0, Math.PI * 2),
//       speed: rand(0.01, 0.025),
//       dist: rand(70, 140),
//       size: rand(1, 3),
//       hue: rand(190, 220)
//     }));

//     const onScroll = () => { scrollYRef.current = window.scrollY; };
//     window.addEventListener("scroll", onScroll, { passive: true });

//     // --- RENDER ---
//     const render = (time: number) => {
//       const T = time * 0.001;
//       smoothScrollRef.current += (scrollYRef.current - smoothScrollRef.current) * 0.06;
//       const sy = smoothScrollRef.current;

//       // Fond clean
//       ctx.globalCompositeOperation = "source-over";
//       ctx.fillStyle = "#00040a";
//       ctx.fillRect(0, 0, W, H);

//       // --- EFFET NÉON (SANS BLUR) ---
//       ctx.globalCompositeOperation = "screen";

//       // 1. Étoiles de fond
//       ctx.fillStyle = "#ffffff";
//       starsFar.forEach(s => {
//         const y = ((s.y * H - sy * 0.05) % H + H) % H;
//         ctx.globalAlpha = s.opacity;
//         ctx.beginPath();
//         ctx.arc(s.x * W, y, s.r, 0, Math.PI * 2);
//         ctx.fill();
//       });
//       ctx.globalAlpha = 1.0;

//       // 2. Trou Noir & Disque d'accrétion
//       const bhX = W * 0.5;
//       const bhY = H * 0.5;

//       accretion.forEach(p => {
//         p.angle += p.speed;
//         const x = bhX + Math.cos(p.angle) * p.dist;
//         const y = bhY + Math.sin(p.angle) * p.dist * 0.35;
        
//         // On dessine deux fois : un gros carré coloré (halo) et un petit blanc (core)
//         ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.3)`;
//         ctx.fillRect(x - 2, y - 2, p.size + 4, p.size + 4);
//         ctx.fillStyle = "#fff";
//         ctx.fillRect(x, y, p.size, p.size);
//       });

//       // Horizon des événements
//       ctx.globalCompositeOperation = "source-over";
//       ctx.beginPath();
//       ctx.arc(bhX, bhY, 60, 0, Math.PI * 2);
//       ctx.fillStyle = "#000";
//       ctx.fill();

//       // Anneau bleu électrique (tracé simple)
//       ctx.strokeStyle = "#00d2ff";
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       // 3. Étoiles Proches (L'effet "Brillant")
//       ctx.globalCompositeOperation = "screen";
//       starsNeon.forEach(s => {
//         const y = ((s.y * H - sy * 0.25) % H + H) % H;
//         const x = s.x * W;

//         // Technique des 3 couches : Halo large, Halo intense, Point blanc
//         // Couche 1 (Halo large)
//         ctx.fillStyle = `hsla(${s.hue}, 100%, 50%, 0.15)`;
//         ctx.beginPath(); ctx.arc(x, y, s.r * 6, 0, Math.PI * 2); ctx.fill();
        
//         // Couche 2 (Halo intense)
//         ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, 0.4)`;
//         ctx.beginPath(); ctx.arc(x, y, s.r * 3, 0, Math.PI * 2); ctx.fill();

//         // Couche 3 (Point central)
//         ctx.fillStyle = "#fff";
//         ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fill();
//       });

//       rafId.current = requestAnimationFrame(render);
//     };

//     rafId.current = requestAnimationFrame(render);

//     return () => {
//       cancelAnimationFrame(rafId.current);
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 z-[-1] pointer-events-none bg-[#00040a]"
//     />
//   );
// }








"use client";
import { useEffect, useRef } from "react";

export default function ParallaxNeonBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let W: number, H: number;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    
    // On garde uniquement les étoiles néon pour le dynamisme
    const starsNeon = Array.from({ length: 35 }, () => ({
      x: rand(0, 1), 
      y: rand(0, 1), 
      r: rand(1.2, 2.8), 
      hue: rand(185, 215) // Teintes bleutées néon
    }));

    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const render = (time: number) => {
      smoothScrollRef.current += (scrollYRef.current - smoothScrollRef.current) * 0.06;
      const sy = smoothScrollRef.current;

      // --- PARALLAX INVERSÉ SUR L'IMAGE DE FOND ---
      // On utilise une valeur négative (-sy * 0.05) pour que l'image monte quand on scroll vers le bas
      container.style.setProperty('--bg-parallax-y', `${-sy * 0.05}px`);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      // --- DESSIN DES ÉTOILES NÉON UNIQUEMENT ---
      starsNeon.forEach(s => {
        // Les étoiles bougent plus vite (0.3) pour se détacher du fond
        const y = ((s.y * H - sy * 0.3) % H + H) % H;
        const x = s.x * W;
        
        // Effet de lueur multicouche (sans blur pour la performance)
        ctx.fillStyle = `hsla(${s.hue}, 100%, 55%, 0.25)`;
        ctx.beginPath(); ctx.arc(x, y, s.r * 5, 0, Math.PI * 2); ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fill();
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden bg-[#00040a]">
      {/* L'IMAGE DE FOND EN SENS CONTRAIRE */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/parallax background.png')",
          // scale(1.2) donne assez de marge pour le mouvement négatif sans bordures
          transform: "scale(1.2) translateY(var(--bg-parallax-y, 0px))",
          willChange: "transform",
        }}
      />
      
      {/* CANVAS NÉON ÉPURÉ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}