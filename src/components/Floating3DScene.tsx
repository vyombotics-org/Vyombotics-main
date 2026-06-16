import { useEffect, useRef } from "react";
import { Atom, Cpu, Cog, Bot, FlaskConical, Binary, Microscope, Rocket } from "lucide-react";

const ITEMS = [
  {
    Icon: Atom,
    x: "8%",
    y: "12%",
    size: 56,
    depth: 30,
    delay: "0s",
    tint: "from-emerald-400 to-lime-400",
  },
  {
    Icon: Cpu,
    x: "82%",
    y: "18%",
    size: 64,
    depth: 50,
    delay: "0.4s",
    tint: "from-sky-400 to-cyan-400",
  },
  {
    Icon: Cog,
    x: "14%",
    y: "78%",
    size: 72,
    depth: 40,
    delay: "0.8s",
    tint: "from-orange-400 to-yellow-400",
  },
  {
    Icon: Bot,
    x: "78%",
    y: "72%",
    size: 60,
    depth: 35,
    delay: "1.2s",
    tint: "from-violet-400 to-pink-400",
  },
  {
    Icon: FlaskConical,
    x: "46%",
    y: "8%",
    size: 44,
    depth: 25,
    delay: "1.6s",
    tint: "from-emerald-400 to-cyan-400",
  },
  {
    Icon: Binary,
    x: "52%",
    y: "88%",
    size: 48,
    depth: 45,
    delay: "2s",
    tint: "from-sky-400 to-violet-400",
  },
  {
    Icon: Microscope,
    x: "4%",
    y: "46%",
    size: 50,
    depth: 20,
    delay: "0.2s",
    tint: "from-lime-400 to-emerald-400",
  },
  {
    Icon: Rocket,
    x: "92%",
    y: "48%",
    size: 52,
    depth: 55,
    delay: "1s",
    tint: "from-pink-400 to-orange-400",
  },
];

export function Floating3DScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      tx = (e.clientX / w - 0.5) * 2;
      ty = (e.clientY / h - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", String(tx));
      el.style.setProperty("--my", String(ty));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px] ${className}`}
      style={{ ["--mx" as any]: 0, ["--my" as any]: 0 }}
    >
      {ITEMS.map(({ Icon, x, y, size, depth, delay, tint }, i) => (
        <div
          key={i}
          className="absolute animate-float-slow"
          style={{
            left: x,
            top: y,
            animationDelay: delay,
            transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px), 0)`,
            transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <div
            className={`grid place-items-center rounded-2xl bg-gradient-to-br ${tint} p-3 shadow-2xl shadow-black/40 backdrop-blur-sm`}
            style={{
              width: size,
              height: size,
              transform: `rotateX(${depth / 4}deg) rotateY(${-depth / 4}deg)`,
              boxShadow: `0 20px 50px -10px oklch(0.6 0.25 295 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.4)`,
            }}
          >
            <Icon className="h-full w-full text-white drop-shadow-md" strokeWidth={1.75} />
          </div>
        </div>
      ))}
    </div>
  );
}
