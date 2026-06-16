import { useEffect, useMemo, useRef, useState } from "react";
import type { DemoKind } from "@/data/stemLabs";

type Props = { kind: DemoKind; accent: string };

export function LabDemo({ kind, accent }: Props) {
  switch (kind) {
    case "pendulum":
      return <PendulumDemo accent={accent} />;
    case "wave":
      return <WaveDemo accent={accent} />;
    case "molecule":
      return <MoleculeDemo accent={accent} />;
    case "ecosystem":
      return <EcosystemDemo accent={accent} />;
    case "code":
      return <CodeDemo accent={accent} title="Python" snippets={PY_SNIPPETS} />;
    case "web":
      return <CodeDemo accent={accent} title="HTML / React" snippets={WEB_SNIPPETS} />;
    case "ai":
      return <AiDemo accent={accent} />;
    case "app":
      return <AppDemo accent={accent} />;
    case "robot":
      return <RobotArmDemo accent={accent} />;
    case "circuit":
      return <CircuitDemo accent={accent} />;
    case "arduino":
      return <ArduinoDemo accent={accent} />;
    case "iot":
      return <IotDemo accent={accent} />;
    case "gears":
      return <GearsDemo accent={accent} />;
    case "cad":
      return <CadDemo accent={accent} />;
    case "automation":
      return <AutomationDemo accent={accent} />;
    case "machine":
      return <MachineDemo accent={accent} />;
  }
}

/* ---------- shared shell ---------- */
function Shell({
  title,
  hint,
  accent,
  children,
  controls,
}: {
  title: string;
  hint: string;
  accent: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  return (
    <div className="card-3d gradient-border relative overflow-hidden rounded-3xl p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Interactive Lab
          </div>
          <h3 className="font-display text-xl font-bold md:text-2xl">{title}</h3>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-medium"
          style={{ background: `${accent}22`, color: accent }}
        >
          Live
        </span>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/30">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 60%, ${accent}26, transparent 60%)` }}
        />
        {children}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{hint}</span>
        {controls}
      </div>
    </div>
  );
}

/* ---------- SCIENCE: PENDULUM (drag to swing) ---------- */
function PendulumDemo({ accent }: { accent: string }) {
  const [angle, setAngle] = useState(35);
  const angleRef = useRef(angle);
  const velRef = useRef(0);
  const [drag, setDrag] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(40, t - last) / 1000;
      last = t;
      if (!drag) {
        const a = (angleRef.current * Math.PI) / 180;
        const acc = (-9.81 / 1.2) * Math.sin(a) * (180 / Math.PI);
        velRef.current = velRef.current * 0.998 + acc * dt;
        angleRef.current += velRef.current * dt;
        setAngle(angleRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [drag]);

  const onMove = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clientX - (r.left + r.width / 2);
    const py = clientY - (r.top + r.height * 0.15);
    const a = (Math.atan2(px, py) * 180) / Math.PI;
    angleRef.current = Math.max(-80, Math.min(80, a));
    velRef.current = 0;
    setAngle(angleRef.current);
  };

  return (
    <Shell
      title="Pendulum lab"
      hint="Drag the ball — release to see real gravity at work."
      accent={accent}
      controls={
        <button
          className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/10"
          onClick={() => {
            velRef.current = 0;
            angleRef.current = 35;
            setAngle(35);
          }}
        >
          Reset
        </button>
      }
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
        onPointerDown={(e) => {
          setDrag(true);
          onMove(e.clientX, e.clientY);
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => drag && onMove(e.clientX, e.clientY)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        style={{ cursor: drag ? "grabbing" : "grab" }}
      >
        <svg viewBox="0 0 400 225" className="h-full w-full">
          <defs>
            <radialGradient id="ball" cx="35%" cy="30%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor={accent} />
            </radialGradient>
          </defs>
          <line x1="200" y1="20" x2="200" y2="22" stroke={accent} strokeWidth="6" />
          <g transform={`rotate(${angle} 200 22)`}>
            <line x1="200" y1="22" x2="200" y2="170" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="200" cy="180" r="18" fill="url(#ball)" stroke={accent} strokeWidth="2" />
          </g>
          <text x="12" y="20" fill="#94a3b8" fontSize="11">
            θ = {angle.toFixed(1)}°
          </text>
        </svg>
      </div>
    </Shell>
  );
}

/* ---------- SCIENCE: WAVE / DNA helix ---------- */
function WaveDemo({ accent }: { accent: string }) {
  const [amp, setAmp] = useState(30);
  const [freq, setFreq] = useState(2);
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 0.06), 30);
    return () => clearInterval(id);
  }, []);
  const path = useMemo(() => {
    let d = "";
    for (let x = 0; x <= 400; x += 4) {
      const y = 112 + Math.sin((x / 400) * Math.PI * 2 * freq + t) * amp;
      d += `${x === 0 ? "M" : "L"}${x},${y} `;
    }
    return d;
  }, [amp, freq, t]);
  return (
    <Shell
      title="Wave studio"
      hint="Tune amplitude & frequency to feel how waves behave."
      accent={accent}
      controls={
        <div className="flex gap-3">
          <Slider label="Amp" value={amp} min={5} max={70} onChange={setAmp} />
          <Slider label="Freq" value={freq} min={1} max={6} step={0.5} onChange={setFreq} />
        </div>
      }
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full">
        <path d={path} fill="none" stroke={accent} strokeWidth="3" />
        <path d={path} fill="none" stroke={accent} strokeWidth="10" opacity="0.15" />
      </svg>
    </Shell>
  );
}

/* ---------- SCIENCE: MOLECULE (rotating H2O) ---------- */
function MoleculeDemo({ accent }: { accent: string }) {
  const [r, setR] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setR((x) => x + 0.6), 16);
    return () => clearInterval(id);
  }, []);
  return (
    <Shell
      title="Molecule viewer — H₂O"
      hint="Auto-rotating molecule. Each bond is 104.5°."
      accent={accent}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div
          style={{
            transform: `rotate3d(1, 1, 0.2, ${r}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.05s linear",
          }}
          className="relative h-48 w-48"
        >
          <Atom label="O" color={accent} x={50} y={50} size={56} />
          <Bond x1={50} y1={50} x2={20} y2={20} />
          <Bond x1={50} y1={50} x2={80} y2={20} />
          <Atom label="H" color="#fff" x={20} y={20} size={32} />
          <Atom label="H" color="#fff" x={80} y={20} size={32} />
        </div>
      </div>
    </Shell>
  );
}
function Atom({
  label,
  color,
  x,
  y,
  size,
}: {
  label: string;
  color: string;
  x: number;
  y: number;
  size: number;
}) {
  return (
    <div
      className="absolute grid place-items-center rounded-full font-bold text-background shadow-2xl"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: "translate(-50%,-50%)",
        background: `radial-gradient(circle at 30% 30%, #fff, ${color})`,
        boxShadow: `0 0 30px ${color}`,
      }}
    >
      {label}
    </div>
  );
}
function Bond({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1,
    dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div
      className="absolute bg-white/40"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${len}%`,
        height: 4,
        transformOrigin: "0 50%",
        transform: `rotate(${ang}deg)`,
      }}
    />
  );
}

/* ---------- SCIENCE: ECOSYSTEM (Lotka-Volterra) ---------- */
function EcosystemDemo({ accent }: { accent: string }) {
  const [prey, setPrey] = useState(40);
  const [pred, setPred] = useState(9);
  const [hist, setHist] = useState<{ p: number; q: number }[]>([]);
  useEffect(() => {
    const id = setInterval(() => {
      const dt = 0.05;
      const dp = 0.6 * prey - 0.02 * prey * pred;
      const dq = 0.01 * prey * pred - 0.4 * pred;
      const np = Math.max(0.1, prey + dp * dt);
      const nq = Math.max(0.1, pred + dq * dt);
      setPrey(np);
      setPred(nq);
      setHist((h) => [...h.slice(-99), { p: np, q: nq }]);
    }, 60);
    return () => clearInterval(id);
  }, [prey, pred]);
  const max = Math.max(60, ...hist.map((h) => Math.max(h.p, h.q)));
  return (
    <Shell
      title="Predator–prey simulator"
      hint="Rabbits 🟢 and foxes 🟠 in a tiny ecosystem."
      accent={accent}
      controls={
        <button
          className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/10"
          onClick={() => {
            setPrey(40);
            setPred(9);
            setHist([]);
          }}
        >
          Reset
        </button>
      }
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full">
        <polyline
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          points={hist.map((h, i) => `${(i / 100) * 400},${225 - (h.p / max) * 200}`).join(" ")}
        />
        <polyline
          fill="none"
          stroke={accent}
          strokeWidth="2"
          points={hist.map((h, i) => `${(i / 100) * 400},${225 - (h.q / max) * 200}`).join(" ")}
        />
        <text x="10" y="18" fill="#22c55e" fontSize="11">
          Prey {prey.toFixed(0)}
        </text>
        <text x="80" y="18" fill={accent} fontSize="11">
          Predators {pred.toFixed(0)}
        </text>
      </svg>
    </Shell>
  );
}

/* ---------- TECH: CODE typewriter ---------- */
const PY_SNIPPETS = [
  `def greet(name):\n    return f"Hello, {name}! 👋"\n\nprint(greet("STEM learner"))`,
  `nums = [1, 2, 3, 4, 5]\nsquared = [n*n for n in nums]\nprint(squared)  # [1, 4, 9, 16, 25]`,
  `import random\nrolls = [random.randint(1,6) for _ in range(5)]\nprint("You rolled:", rolls)`,
];
const WEB_SNIPPETS = [
  `function App() {\n  return <h1>Hello, Web!</h1>\n}`,
  `<button onClick={() => alert("Hi!")}>\n  Click me\n</button>`,
  `const [count, setCount] = useState(0)\n// state that re-renders the UI`,
];
function CodeDemo({
  accent,
  title,
  snippets,
}: {
  accent: string;
  title: string;
  snippets: string[];
}) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    const target = snippets[idx];
    let i = 0;
    setText("");
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => setIdx((n) => (n + 1) % snippets.length), 1800);
      }
    }, 22);
    return () => clearInterval(id);
  }, [idx, snippets]);
  return (
    <Shell
      title={`${title} playground`}
      hint="Auto-typing examples — try them yourself in class."
      accent={accent}
    >
      <div className="absolute inset-0 flex flex-col">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[10px] text-muted-foreground">
            main.{title.toLowerCase().includes("python") ? "py" : "tsx"}
          </span>
        </div>
        <pre className="flex-1 overflow-hidden p-4 text-[13px] leading-relaxed text-white/90">
          <code>
            {text}
            <span
              className="ml-0.5 inline-block h-4 w-1.5 animate-pulse"
              style={{ background: accent }}
            />
          </code>
        </pre>
      </div>
    </Shell>
  );
}

/* ---------- TECH: AI chat ---------- */
function AiDemo({ accent }: { accent: string }) {
  const msgs = [
    { who: "you", t: "Classify: 'I love this!'" },
    { who: "ai", t: "Sentiment → 😊 Positive (0.94)" },
    { who: "you", t: "Summarize: solar energy basics" },
    {
      who: "ai",
      t: "Solar panels convert sunlight to electricity using photovoltaic cells. Clean, renewable, scalable.",
    },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown((n) => (n + 1) % (msgs.length + 1)), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <Shell
      title="Mini AI assistant"
      hint="Watch a tiny model classify text and summarize content."
      accent={accent}
    >
      <div className="absolute inset-0 space-y-2 overflow-hidden p-4">
        {msgs.slice(0, shown).map((m, i) => (
          <div
            key={i}
            className={`flex ${m.who === "you" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${m.who === "you" ? "bg-white/10 text-white" : "text-background"}`}
              style={m.who === "ai" ? { background: accent } : undefined}
            >
              {m.t}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------- TECH: APP phone preview ---------- */
function AppDemo({ accent }: { accent: string }) {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTab((n) => (n + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <Shell
      title="Mobile app preview"
      hint="A live React Native–style preview animating between screens."
      accent={accent}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[88%] w-[42%] rounded-[28px] border-4 border-white/20 bg-slate-900 shadow-2xl">
          <div className="absolute left-1/2 top-1.5 h-2 w-12 -translate-x-1/2 rounded-full bg-white/20" />
          <div
            className="absolute inset-0 m-2 mt-5 overflow-hidden rounded-[20px]"
            style={{ background: `linear-gradient(160deg, ${accent}33, #0f172a)` }}
          >
            <div className="p-3 text-[10px] font-semibold text-white/80">
              {["Feed", "Profile", "Stats"][tab]}
            </div>
            <div className="space-y-2 px-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-6 rounded-md bg-white/10 animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-5 rounded-full ${tab === i ? "" : "opacity-30"}`}
                style={{ background: tab === i ? accent : "#fff" }}
              />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------- ENG: Robot arm ---------- */
function RobotArmDemo({ accent }: { accent: string }) {
  const [target, setTarget] = useState({ x: 70, y: 40 });
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTarget({ x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 });
  };
  // 2-link IK
  const base = { x: 50, y: 90 };
  const L1 = 30,
    L2 = 28;
  const dx = target.x - base.x,
    dy = target.y - base.y;
  const dist = Math.min(L1 + L2 - 0.1, Math.hypot(dx, dy));
  const a2 = Math.acos(
    Math.max(-1, Math.min(1, (dist * dist - L1 * L1 - L2 * L2) / (2 * L1 * L2))),
  );
  const a1 = Math.atan2(dy, dx) - Math.atan2(L2 * Math.sin(a2), L1 + L2 * Math.cos(a2));
  const j = { x: base.x + L1 * Math.cos(a1), y: base.y + L1 * Math.sin(a1) };
  return (
    <Shell
      title="Robotic arm — inverse kinematics"
      hint="Move your mouse / finger — the arm tracks it."
      accent={accent}
    >
      <div
        ref={ref}
        className="absolute inset-0"
        onMouseMove={(e) => onMove(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          const t = e.touches[0];
          onMove(t.clientX, t.clientY);
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <line
            x1={base.x}
            y1={base.y}
            x2={j.x}
            y2={j.y}
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1={j.x}
            y1={j.y}
            x2={target.x}
            y2={target.y}
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx={base.x} cy={base.y} r="4" fill="#fff" />
          <circle cx={j.x} cy={j.y} r="3" fill={accent} />
          <circle cx={target.x} cy={target.y} r="3" fill="#fff" stroke={accent} strokeWidth="2" />
        </svg>
      </div>
    </Shell>
  );
}

/* ---------- ENG: Circuit (LED) ---------- */
function CircuitDemo({ accent }: { accent: string }) {
  const [on, setOn] = useState(true);
  return (
    <Shell
      title="Live circuit"
      hint="Toggle the switch to power the LED."
      accent={accent}
      controls={
        <button
          onClick={() => setOn((v) => !v)}
          className="rounded-full px-3 py-1"
          style={{ background: on ? accent : "#334155", color: on ? "#000" : "#cbd5e1" }}
        >
          {on ? "ON" : "OFF"}
        </button>
      }
    >
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full">
        <rect
          x="30"
          y="80"
          width="60"
          height="40"
          rx="6"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="60" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">
          9V
        </text>
        <path
          d={`M90 100 H160 V60 H260`}
          fill="none"
          stroke={on ? accent : "#475569"}
          strokeWidth="3"
        />
        <path
          d={`M260 60 H330 V140 H160 V100`}
          fill="none"
          stroke={on ? accent : "#475569"}
          strokeWidth="3"
        />
        <circle cx="220" cy="60" r="14" fill={on ? accent : "#1e293b"} opacity={on ? 1 : 0.5} />
        <circle cx="220" cy="60" r="24" fill={accent} opacity={on ? 0.25 : 0} />
        <text x="220" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10">
          LED
        </text>
        <rect x="305" y="120" width="30" height="20" fill="none" stroke="#94a3b8" />
        <text x="320" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">
          220Ω
        </text>
      </svg>
    </Shell>
  );
}

/* ---------- ENG: Arduino blink ---------- */
function ArduinoDemo({ accent }: { accent: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 800);
    return () => clearInterval(id);
  }, []);
  return (
    <Shell title="Arduino: Blink" hint="Your first Arduino program — running live." accent={accent}>
      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
        <pre className="rounded-xl bg-black/60 p-3 text-[11px] leading-relaxed text-emerald-300">{`void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, ${on ? "HIGH" : "LOW"});
  delay(800);
  digitalWrite(13, ${on ? "LOW" : "HIGH"});
  delay(800);
}`}</pre>
        <div className="relative rounded-xl bg-[#0d3b2e] p-4">
          <div className="text-[10px] font-semibold text-emerald-200">ARDUINO UNO</div>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="h-1.5 rounded-sm bg-black/60" />
            ))}
          </div>
          <div className="absolute right-6 top-10 grid place-items-center">
            <div
              className="h-6 w-6 rounded-full transition-all"
              style={{
                background: on ? accent : "#1e293b",
                boxShadow: on ? `0 0 30px ${accent}` : "none",
              }}
            />
            <div className="mt-1 text-[9px] text-emerald-200">PIN 13</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------- ENG: IoT dashboard ---------- */
function IotDemo({ accent }: { accent: string }) {
  const [data, setData] = useState({ temp: 24, hum: 55, lux: 420 });
  useEffect(() => {
    const id = setInterval(
      () =>
        setData((d) => ({
          temp: +(d.temp + (Math.random() - 0.5) * 0.6).toFixed(1),
          hum: Math.max(20, Math.min(90, d.hum + (Math.random() - 0.5) * 3)),
          lux: Math.max(50, Math.min(900, d.lux + (Math.random() - 0.5) * 80)),
        })),
      700,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <Shell title="IoT dashboard" hint="Live sensor readings streamed over MQTT." accent={accent}>
      <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4">
        {[
          { k: "Temperature", v: `${data.temp}°C`, ratio: data.temp / 40 },
          { k: "Humidity", v: `${data.hum.toFixed(0)}%`, ratio: data.hum / 100 },
          { k: "Light", v: `${data.lux.toFixed(0)} lx`, ratio: data.lux / 900 },
        ].map((m) => (
          <div key={m.k} className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
            <div className="mt-1 text-xl font-bold" style={{ color: accent }}>
              {m.v}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full transition-all"
                style={{ width: `${Math.min(100, m.ratio * 100)}%`, background: accent }}
              />
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------- MECH: GEARS ---------- */
function GearsDemo({ accent }: { accent: string }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 16);
    return () => clearInterval(id);
  }, []);
  const Gear = ({
    x,
    y,
    r,
    teeth,
    dir = 1,
  }: {
    x: number;
    y: number;
    r: number;
    teeth: number;
    dir?: number;
  }) => {
    const angle = t * (24 / r) * dir;
    return (
      <g transform={`translate(${x} ${y}) rotate(${angle})`}>
        {Array.from({ length: teeth }).map((_, i) => {
          const a = (i / teeth) * Math.PI * 2;
          return (
            <rect
              key={i}
              x={r - 3}
              y={-4}
              width={8}
              height={8}
              fill={accent}
              transform={`rotate(${(a * 180) / Math.PI})`}
            />
          );
        })}
        <circle r={r} fill={`${accent}33`} stroke={accent} strokeWidth="2" />
        <circle r={r * 0.25} fill="#0f172a" stroke={accent} />
      </g>
    );
  };
  return (
    <Shell
      title="Gear train"
      hint="Small gear spins faster — gear ratio in action."
      accent={accent}
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full">
        <Gear x={130} y={112} r={50} teeth={16} dir={1} />
        <Gear x={232} y={112} r={36} teeth={12} dir={-1} />
        <Gear x={310} y={112} r={24} teeth={8} dir={1} />
      </svg>
    </Shell>
  );
}

/* ---------- MECH: CAD extrude ---------- */
function CadDemo({ accent }: { accent: string }) {
  const [h, setH] = useState(40);
  return (
    <Shell
      title="CAD extrude"
      hint="Slide to extrude a 2D sketch into a 3D part."
      accent={accent}
      controls={<Slider label="Height" value={h} min={5} max={80} onChange={setH} />}
    >
      <div className="absolute inset-0 grid place-items-center [perspective:600px]">
        <div
          className="relative"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(55deg) rotateZ(-25deg)" }}
        >
          <div
            className="rounded-md"
            style={{
              width: 140,
              height: 140,
              background: `${accent}55`,
              border: `2px solid ${accent}`,
            }}
          />
          {[...Array(Math.max(2, Math.round(h / 4)))].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 top-0 rounded-md"
              style={{
                width: 140,
                height: 140,
                background: `${accent}33`,
                border: `1px solid ${accent}88`,
                transform: `translateZ(${i * 4}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------- MECH: Automation (conveyor) ---------- */
function AutomationDemo({ accent }: { accent: string }) {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    const spawn = setInterval(() => setItems((arr) => [...arr, Date.now()]), 1200);
    const move = setInterval(
      () => setItems((arr) => arr.filter((id) => Date.now() - id < 5000)),
      300,
    );
    return () => {
      clearInterval(spawn);
      clearInterval(move);
    };
  }, []);
  return (
    <Shell
      title="Assembly line"
      hint="Sensors trigger, conveyor moves, robot stamps."
      accent={accent}
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 bg-slate-700" />
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-black/40" />
        {items.map((id) => {
          const age = (Date.now() - id) / 5000;
          return (
            <div
              key={id}
              className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-md transition-none"
              style={{ left: `${age * 100}%`, background: accent, boxShadow: `0 0 20px ${accent}` }}
            />
          );
        })}
        <div className="absolute right-6 top-3 grid place-items-center">
          <div className="h-3 w-3 rounded-full animate-pulse" style={{ background: accent }} />
          <div className="text-[9px] text-muted-foreground">SENSOR</div>
        </div>
        <div
          className="absolute right-2 top-1/2 h-16 w-2 -translate-y-1/2"
          style={{ background: accent }}
        />
      </div>
    </Shell>
  );
}

/* ---------- MECH: Machine (catapult) ---------- */
function MachineDemo({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 60), 50);
    return () => clearInterval(id);
  }, []);
  const launchAngle = phase < 20 ? -30 + phase * 1.5 : -60;
  const t = phase >= 20 ? (phase - 20) / 40 : 0;
  const ballX = 90 + t * 300;
  const ballY = 150 - 4 * 130 * t * (1 - t);
  return (
    <Shell
      title="Catapult lab"
      hint="Watch energy convert from elastic → kinetic → potential."
      accent={accent}
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full">
        <line x1="0" y1="200" x2="400" y2="200" stroke="#475569" strokeWidth="2" />
        <g transform={`translate(80 180)`}>
          <polygon points="-20,20 20,20 0,-10" fill="#334155" />
          <g transform={`rotate(${launchAngle})`}>
            <rect x="-5" y="-50" width="80" height="6" fill={accent} />
            <circle cx="70" cy="-50" r="6" fill="#fff" opacity={phase < 20 ? 1 : 0} />
          </g>
        </g>
        {phase >= 20 && <circle cx={ballX} cy={ballY} r="6" fill="#fff" />}
      </svg>
    </Shell>
  );
}

/* ---------- helpers ---------- */
function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24 accent-current"
      />
    </label>
  );
}
