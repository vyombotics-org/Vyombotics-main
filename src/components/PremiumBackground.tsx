import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * PremiumBackground
 * Full-screen animated background for the STEM / LMS platform.
 * - Layered gradient mesh (deep navy → slate → steel)
 * - Particle network with dynamic connection lines
 * - Floating geometric tech shapes (hex, ring, node)
 * - Soft radial glows + cursor parallax
 * - 60fps, requestAnimationFrame, devicePixelRatio aware
 */
export function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0;

    // -------- Particles --------
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let particles: P[] = [];

    // -------- Floating shapes (hex, ring, node) --------
    type S = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vr: number;
      size: number;
      kind: 0 | 1 | 2;
      alpha: number;
    };
    let shapes: S[] = [];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // density scales with area, capped for perf
      const count = Math.min(110, Math.floor((W * H) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() < 0.55 ? 190 : 240, // cyan or indigo
      }));

      const sCount = Math.min(14, Math.floor((W * H) / 90000));
      shapes = Array.from({ length: sCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.003,
        size: 30 + Math.random() * 70,
        kind: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        alpha: 0.05 + Math.random() * 0.08,
      }));
    };

    const onResize = () => init();
    init();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // -------- Drawing helpers --------
    const drawHex = (s: S) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const px = Math.cos(a) * s.size;
        const py = Math.sin(a) * s.size;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 212, 255, ${s.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };
    const drawRing = (s: S) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.beginPath();
      ctx.arc(0, 0, s.size * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(79, 70, 229, ${s.alpha * 1.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };
    const drawNode = (s: S) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.strokeStyle = `rgba(0, 212, 255, ${s.alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-s.size * 0.5, 0);
      ctx.lineTo(s.size * 0.5, 0);
      ctx.moveTo(0, -s.size * 0.5);
      ctx.lineTo(0, s.size * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${s.alpha * 3})`;
      ctx.fill();
      ctx.restore();
    };

    // -------- Animation loop --------
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      ctx.clearRect(0, 0, W, H);

      // Parallax offset from cursor
      const px = (mouse.current.x - 0.5) * 20;
      const py = (mouse.current.y - 0.5) * 20;

      // Soft radial glows (drawn on canvas to feel alive)
      const g1 = ctx.createRadialGradient(
        W * 0.85 + px,
        H * 0.15 + py,
        0,
        W * 0.85 + px,
        H * 0.15 + py,
        Math.max(W, H) * 0.55,
      );
      g1.addColorStop(0, "rgba(0, 212, 255, 0.18)");
      g1.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(
        W * 0.12 - px,
        H * 0.88 - py,
        0,
        W * 0.12 - px,
        H * 0.88 - py,
        Math.max(W, H) * 0.6,
      );
      g2.addColorStop(0, "rgba(79, 70, 229, 0.22)");
      g2.addColorStop(1, "rgba(79, 70, 229, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Floating shapes
      for (const s of shapes) {
        s.x += s.vx * (reduce ? 0 : 1);
        s.y += s.vy * (reduce ? 0 : 1);
        s.rot += s.vr;
        if (s.x < -s.size) s.x = W + s.size;
        if (s.x > W + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = H + s.size;
        if (s.y > H + s.size) s.y = -s.size;
        if (s.kind === 0) drawHex(s);
        else if (s.kind === 1) drawRing(s);
        else drawNode(s);
      }

      // Particles + connections
      const mx = mouse.current.x * W;
      const my = mouse.current.y * H;
      const attract = mouse.current.active ? 1 : 0;

      for (const p of particles) {
        // gentle cursor attraction
        if (attract) {
          const dx = mx - p.x,
            dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 28000) {
            const f = 0.00012;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }
        // damping + drift
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      // connection lines (O(n^2) but n<=110)
      const MAX = 130;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX) {
            const alpha = (1 - d / MAX) * 0.22;
            const hue = (a.hue + b.hue) / 2;
            ctx.strokeStyle =
              hue > 215 ? `rgba(99, 102, 241, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particle dots with glow
      for (const p of particles) {
        const color = p.hue > 215 ? "99, 102, 241" : "0, 212, 255";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.08)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.9)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (theme === "light") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #f8fbff 0%, #eef4ff 50%, #f5f8ff 100%)",
        }}
      >
        {/* Soft blue glows */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 40% at 15% 0%, rgba(59,130,246,0.18), transparent 65%), radial-gradient(ellipse 50% 40% at 85% 10%, rgba(99,102,241,0.14), transparent 65%), radial-gradient(ellipse 60% 45% at 50% 100%, rgba(96,165,250,0.16), transparent 65%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(0,212,255,0.12), transparent 35%), radial-gradient(circle at bottom left, rgba(79,70,229,0.15), transparent 40%), linear-gradient(135deg, #16213E, #1E293B, #243B53)",
      }}
    >
      {/* Animated gradient mesh overlay (CSS) */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(0,212,255,0.08), rgba(79,70,229,0.10), rgba(0,212,255,0.06), rgba(79,70,229,0.10), rgba(0,212,255,0.08))",
          filter: "blur(80px)",
          animation: "premium-bg-spin 40s linear infinite",
        }}
      />
      {/* Subtle starfield */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(248,250,252,0.6), transparent), radial-gradient(1px 1px at 70% 80%, rgba(248,250,252,0.5), transparent), radial-gradient(1px 1px at 40% 60%, rgba(0,212,255,0.5), transparent), radial-gradient(1px 1px at 85% 15%, rgba(248,250,252,0.4), transparent), radial-gradient(1px 1px at 10% 85%, rgba(99,102,241,0.5), transparent)",
          backgroundSize: "600px 600px",
          animation: "premium-bg-drift 60s linear infinite",
        }}
      />
      {/* Light streak */}
      <div
        className="absolute -inset-x-20 top-1/3 h-32 opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)",
          filter: "blur(40px)",
          animation: "premium-bg-streak 18s ease-in-out infinite",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <style>{`
        @keyframes premium-bg-spin { to { transform: rotate(360deg); } }
        @keyframes premium-bg-drift { from { background-position: 0 0; } to { background-position: 600px 600px; } }
        @keyframes premium-bg-streak {
          0%,100% { transform: translateX(-10%); opacity: .15; }
          50%     { transform: translateX(10%);  opacity: .45; }
        }
      `}</style>
    </div>
  );
}
