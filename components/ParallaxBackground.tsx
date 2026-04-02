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

    // cyan-400 = hsl(189, 94%, 53%) → hue ~189
    // blue-600 = hsl(221, 83%, 53%)  → hue ~221
    // On interpole aléatoirement dans cette plage
    const randHue = () => rand(189, 221);
    const randSat = () => rand(80, 100);
    const randLit = () => rand(55, 75);

    const drawStar4 = (
      cx: number, cy: number,
      outerR: number,
      hue: number, sat: number, lit: number
    ) => {
      const innerR = outerR * 0.22;
      const spikes = 4;
      const step = Math.PI / spikes; // 45°

      // --- Halo circulaire radial doux ---
      const haloR = outerR * 8;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      grad.addColorStop(0,   `hsla(${hue}, ${sat}%, ${lit + 15}%, 0.55)`);
      grad.addColorStop(0.3, `hsla(${hue}, ${sat}%, ${lit}%, 0.20)`);
      grad.addColorStop(1,   `hsla(${hue}, ${sat}%, ${lit}%, 0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // --- 3 couches de lueur en forme d'étoile ---
      for (let layer = 3; layer >= 1; layer--) {
        const scale = layer * 2.8;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const angle = i * step - Math.PI / 2;
          const r = i % 2 === 0 ? outerR * scale : innerR * scale;
          i === 0
            ? ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
            : ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lit}%, ${0.12 / layer})`;
        ctx.fill();
      }

      // --- Corps de l'étoile 4 branches net ---
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle = i * step - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        i === 0
          ? ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
          : ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      }
      ctx.closePath();
      // Dégradé cyan→bleu sur le corps
      const bodyGrad = ctx.createLinearGradient(cx - outerR, cy, cx + outerR, cy);
      bodyGrad.addColorStop(0,   `hsl(189, 94%, 80%)`); // cyan-400 clair
      bodyGrad.addColorStop(0.5, `hsl(${hue}, ${sat}%, 92%)`); // blanc chaud au centre
      bodyGrad.addColorStop(1,   `hsl(221, 83%, 75%)`); // blue-600 clair
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // --- Pic central surbrillant ---
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
      cg.addColorStop(0,   "rgba(255,255,255,1)");
      cg.addColorStop(0.4, `hsla(${hue}, 100%, 90%, 0.7)`);
      cg.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    };

    // Couche lointaine — petites, froides, parallax lente
    const starsFar = Array.from({ length: 60 }, () => ({
      x: rand(0, 1), y: rand(0, 1),
      r: rand(0.8, 1.8),
      hue: randHue(), sat: randSat(), lit: randLit(),
    }));

    // Couche proche — grandes, vives, parallax rapide
    const starsNear = Array.from({ length: 38 }, () => ({
      x: rand(0, 1), y: rand(0, 1),
      r: rand(2.0, 3.6),
      hue: randHue(), sat: randSat(), lit: randLit(),
    }));

    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const render = () => {
      smoothScrollRef.current += (scrollYRef.current - smoothScrollRef.current) * 0.06;
      const sy = smoothScrollRef.current;

      container.style.setProperty("--bg-parallax-y", `${-sy * 0.05}px`);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      // Couche lointaine (parallax 0.12)
      starsFar.forEach(s => {
        const y = ((s.y * H - sy * 0.12) % H + H) % H;
        drawStar4(s.x * W, y, s.r, s.hue, s.sat, s.lit);
      });

      // Couche proche (parallax 0.3)
      starsNear.forEach(s => {
        const y = ((s.y * H - sy * 0.3) % H + H) % H;
        drawStar4(s.x * W, y, s.r, s.hue, s.sat, s.lit);
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/parallax background.png')",
          transform: "scale(1.2) translateY(var(--bg-parallax-y, 0px))",
          willChange: "transform",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}