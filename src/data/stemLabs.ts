import { FlaskConical, Cpu, Cog, Sigma, type LucideIcon } from "lucide-react";

export type DemoKind =
  | "pendulum"
  | "wave"
  | "molecule"
  | "ecosystem"
  | "code"
  | "ai"
  | "app"
  | "web"
  | "robot"
  | "circuit"
  | "iot"
  | "arduino"
  | "gears"
  | "cad"
  | "automation"
  | "machine";

export type StemLab = {
  slug: string;
  pillar: "science" | "tech" | "eng" | "math";
  pillarTitle: string;
  pillarIcon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  gradient: string; // tailwind from-X to-Y
  accent: string; // hex glow
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  projects: number;
  learn: string[];
  modules: { title: string; items: string[] }[];
  demo: DemoKind;
};

const S = (pillar: StemLab["pillar"]) => {
  switch (pillar) {
    case "science":
      return {
        title: "Science",
        icon: FlaskConical,
        gradient: "from-emerald-500 to-lime-400",
        accent: "#22c55e",
      };
    case "tech":
      return {
        title: "Technology",
        icon: Cpu,
        gradient: "from-sky-500 to-cyan-400",
        accent: "#0ea5e9",
      };
    case "eng":
      return {
        title: "Engineering",
        icon: Cog,
        gradient: "from-violet-500 to-pink-500",
        accent: "#8b5cf6",
      };
    case "math":
      return {
        title: "Mathematics",
        icon: Sigma,
        gradient: "from-orange-500 to-yellow-400",
        accent: "#f97316",
      };
  }
};

const lab = (
  slug: string,
  pillar: StemLab["pillar"],
  title: string,
  tagline: string,
  description: string,
  level: StemLab["level"],
  duration: string,
  projects: number,
  learn: string[],
  modules: StemLab["modules"],
  demo: DemoKind,
): StemLab => {
  const s = S(pillar);
  return {
    slug,
    pillar,
    pillarTitle: s.title,
    pillarIcon: s.icon,
    title,
    tagline,
    description,
    gradient: s.gradient,
    accent: s.accent,
    duration,
    level,
    projects,
    learn,
    modules,
    demo,
  };
};

export const STEM_LABS: StemLab[] = [
  // SCIENCE
  lab(
    "physics-fundamentals",
    "science",
    "Physics Fundamentals",
    "Motion, energy and the laws that run the universe.",
    "Explore the foundations of classical mechanics through interactive simulations. Build intuition for force, motion, energy and momentum by experimenting with virtual labs — no whiteboards, just play, predict, and prove.",
    "Beginner",
    "8 weeks",
    6,
    [
      "Newton's three laws with hands-on labs",
      "Energy, work & momentum visualizations",
      "Simple harmonic motion & pendulums",
      "Predict, measure, prove with virtual experiments",
    ],
    [
      {
        title: "Module 1 — Kinematics",
        items: [
          "Displacement, velocity, acceleration",
          "Graphing motion",
          "Free-fall & projectiles",
        ],
      },
      {
        title: "Module 2 — Forces & Newton's Laws",
        items: ["Net force diagrams", "Friction & tension", "Circular motion"],
      },
      {
        title: "Module 3 — Energy",
        items: ["Work-energy theorem", "Conservation of energy", "Power & efficiency"],
      },
      {
        title: "Module 4 — Oscillations",
        items: [
          "Springs and pendulums",
          "Damping & resonance",
          "Capstone: build a physics simulator",
        ],
      },
    ],
    "pendulum",
  ),

  lab(
    "chemistry-lab",
    "science",
    "Chemistry Lab",
    "Mix, react and discover the dance of molecules.",
    "Step into a safe virtual lab and explore atoms, bonds, and reactions. Watch molecules form, balance equations like a pro, and understand the chemistry behind everyday life.",
    "Beginner",
    "10 weeks",
    8,
    [
      "Atomic structure & periodic trends",
      "Bond formation visualized",
      "Balance equations like a chemist",
      "Acids, bases & reaction rates",
    ],
    [
      {
        title: "Module 1 — Matter & Atoms",
        items: ["States of matter", "Atomic models", "Periodic patterns"],
      },
      {
        title: "Module 2 — Bonds",
        items: ["Ionic vs covalent", "Molecular shapes", "Polarity & solubility"],
      },
      {
        title: "Module 3 — Reactions",
        items: ["Balancing equations", "Stoichiometry", "Reaction types"],
      },
      {
        title: "Module 4 — Real Chemistry",
        items: ["Acids and bases", "Rates & equilibrium", "Capstone: virtual reaction lab"],
      },
    ],
    "molecule",
  ),

  lab(
    "environmental-science",
    "science",
    "Environmental Science",
    "Understand the systems that keep Earth alive.",
    "Connect ecosystems, climate, energy and resources. Run living simulations of food webs and carbon cycles to see how small changes ripple across the planet.",
    "Beginner",
    "6 weeks",
    4,
    [
      "Ecosystems & biodiversity",
      "Climate systems & carbon cycle",
      "Sustainability & renewable energy",
      "Data-driven environmental thinking",
    ],
    [
      { title: "Module 1 — Ecosystems", items: ["Food webs", "Energy flow", "Biodiversity"] },
      {
        title: "Module 2 — Climate",
        items: ["Greenhouse effect", "Weather vs climate", "Carbon cycle"],
      },
      {
        title: "Module 3 — Resources",
        items: ["Water systems", "Renewable energy", "Waste & recycling"],
      },
      {
        title: "Module 4 — Action",
        items: ["Sustainable design", "Citizen science", "Capstone: local impact report"],
      },
    ],
    "ecosystem",
  ),

  lab(
    "biology-explorations",
    "science",
    "Biology Explorations",
    "From cells to systems — the science of life.",
    "Zoom from a single cell into entire organisms. Interactive models reveal how DNA, cells and bodies work together to power life on Earth.",
    "Beginner",
    "8 weeks",
    5,
    [
      "Cell structure & function",
      "DNA, genetics & inheritance",
      "Human body systems",
      "Evolution & adaptation",
    ],
    [
      { title: "Module 1 — Cells", items: ["Cell parts", "Cell division", "Microscope basics"] },
      { title: "Module 2 — DNA & Genetics", items: ["DNA structure", "Inheritance", "Mutations"] },
      { title: "Module 3 — Body Systems", items: ["Circulatory", "Nervous", "Immune"] },
      {
        title: "Module 4 — Evolution",
        items: ["Natural selection", "Adaptation", "Capstone: trait simulator"],
      },
    ],
    "wave",
  ),

  // TECHNOLOGY
  lab(
    "web-development",
    "tech",
    "Web Development",
    "Build modern, responsive websites from scratch.",
    "From your first HTML tag to a deployed React app — learn the modern web step by step with projects you can actually share.",
    "Beginner",
    "12 weeks",
    10,
    [
      "HTML, CSS & responsive design",
      "JavaScript & DOM mastery",
      "React components & state",
      "Deploy real projects to the web",
    ],
    [
      {
        title: "Module 1 — Foundations",
        items: ["HTML semantics", "CSS layout", "Responsive design"],
      },
      {
        title: "Module 2 — JavaScript",
        items: ["Variables & functions", "DOM manipulation", "Async & fetch"],
      },
      { title: "Module 3 — React", items: ["Components & props", "State & hooks", "Routing"] },
      {
        title: "Module 4 — Ship It",
        items: ["Forms & APIs", "Deployment", "Capstone: portfolio site"],
      },
    ],
    "web",
  ),

  lab(
    "python-programming",
    "tech",
    "Python Programming",
    "The language of AI, data and automation.",
    "Master Python from zero — variables, loops, functions, and on to real projects: data analysis, automation scripts and your first AI experiments.",
    "Beginner",
    "10 weeks",
    8,
    [
      "Python syntax & logic",
      "Functions, classes & modules",
      "Working with data (lists, dicts, files)",
      "Automate boring tasks",
    ],
    [
      { title: "Module 1 — Basics", items: ["Variables & types", "Conditionals", "Loops"] },
      { title: "Module 2 — Functions", items: ["Parameters", "Return values", "Scope"] },
      { title: "Module 3 — Data", items: ["Lists & dicts", "File I/O", "Libraries"] },
      {
        title: "Module 4 — Projects",
        items: ["Web scraping", "Data analysis", "Capstone: automation tool"],
      },
    ],
    "code",
  ),

  lab(
    "artificial-intelligence",
    "tech",
    "Artificial Intelligence",
    "Train machines to see, speak and decide.",
    "Demystify AI. Learn how neural networks learn, train your own classifiers, and explore the ideas behind ChatGPT and modern computer vision.",
    "Intermediate",
    "12 weeks",
    6,
    [
      "What AI actually is (and isn't)",
      "Train a model with real data",
      "Neural networks & deep learning intuition",
      "LLMs, prompting & responsible AI",
    ],
    [
      {
        title: "Module 1 — Foundations",
        items: ["AI vs ML vs DL", "Data & features", "Training & evaluation"],
      },
      { title: "Module 2 — Classic ML", items: ["Regression", "Classification", "Clustering"] },
      {
        title: "Module 3 — Deep Learning",
        items: ["Neurons & layers", "CNNs for vision", "RNNs & transformers"],
      },
      {
        title: "Module 4 — LLMs",
        items: ["Prompting", "Embeddings & RAG", "Capstone: AI assistant"],
      },
    ],
    "ai",
  ),

  lab(
    "app-development",
    "tech",
    "App Development",
    "Design and build mobile apps people love.",
    "Go from idea to App Store. Learn UI design fundamentals and build cross-platform apps with React Native and Expo.",
    "Intermediate",
    "12 weeks",
    7,
    [
      "Mobile UI/UX principles",
      "React Native + Expo basics",
      "Navigation, state & storage",
      "Publish to App Store / Play",
    ],
    [
      { title: "Module 1 — Design", items: ["Mobile patterns", "Wireframes", "Prototyping"] },
      { title: "Module 2 — React Native", items: ["Components", "Styling", "Lists & forms"] },
      {
        title: "Module 3 — Features",
        items: ["Navigation", "Camera & sensors", "Push notifications"],
      },
      { title: "Module 4 — Ship", items: ["Testing", "Build & publish", "Capstone: your app"] },
    ],
    "app",
  ),

  // ENGINEERING
  lab(
    "robotics",
    "eng",
    "Robotics",
    "Build robots that sense, think and move.",
    "Design, wire and program your own robots. From line-followers to autonomous bots, you'll combine mechanics, electronics and AI.",
    "Intermediate",
    "14 weeks",
    8,
    [
      "Robot anatomy: sensors, motors, brain",
      "Programming microcontrollers",
      "Path planning & control",
      "Build a working autonomous bot",
    ],
    [
      { title: "Module 1 — Anatomy", items: ["Actuators", "Sensors", "Power systems"] },
      { title: "Module 2 — Control", items: ["Motor control", "PID basics", "Feedback loops"] },
      {
        title: "Module 3 — Intelligence",
        items: ["Obstacle avoidance", "Line following", "Vision basics"],
      },
      {
        title: "Module 4 — Build",
        items: ["Chassis design", "Integration", "Capstone: autonomous robot"],
      },
    ],
    "robot",
  ),

  lab(
    "electronics",
    "eng",
    "Electronics",
    "Circuits, signals and the magic of electrons.",
    "From Ohm's law to soldering your first PCB — learn analog and digital electronics through interactive circuit labs.",
    "Beginner",
    "10 weeks",
    6,
    [
      "Voltage, current & resistance",
      "Build & simulate circuits",
      "Digital logic & microcontrollers",
      "Read schematics like a pro",
    ],
    [
      { title: "Module 1 — Basics", items: ["Ohm's law", "Series & parallel", "Multimeter use"] },
      {
        title: "Module 2 — Components",
        items: ["Resistors & capacitors", "Diodes & transistors", "ICs"],
      },
      { title: "Module 3 — Digital", items: ["Logic gates", "Binary", "Microcontrollers"] },
      {
        title: "Module 4 — Build",
        items: ["Breadboarding", "PCB design", "Capstone: working gadget"],
      },
    ],
    "circuit",
  ),

  lab(
    "arduino-projects",
    "eng",
    "Arduino Projects",
    "Code real-world hardware with Arduino.",
    "Light up LEDs, read sensors, and build smart gadgets. Each lesson is a project you can hold in your hand.",
    "Beginner",
    "8 weeks",
    10,
    [
      "Arduino IDE & C++ basics",
      "Read sensors & drive motors",
      "LCD, LEDs, buzzers",
      "Build 10 hands-on projects",
    ],
    [
      { title: "Module 1 — Hello Arduino", items: ["Setup", "Blink", "Serial monitor"] },
      { title: "Module 2 — Inputs", items: ["Buttons", "Sensors", "Analog reads"] },
      { title: "Module 3 — Outputs", items: ["LEDs & PWM", "Servos & motors", "Displays"] },
      {
        title: "Module 4 — Build",
        items: ["Combining I/O", "Project structure", "Capstone: smart device"],
      },
    ],
    "arduino",
  ),

  lab(
    "iot-systems",
    "eng",
    "IoT Systems",
    "Connect devices to the cloud — and to each other.",
    "Design end-to-end IoT solutions: sensors → microcontroller → cloud → dashboard. Build smart-home gadgets that actually talk online.",
    "Intermediate",
    "10 weeks",
    5,
    [
      "IoT architecture & protocols (MQTT, HTTP)",
      "ESP32 / NodeMCU programming",
      "Cloud dashboards & alerts",
      "Security & best practices",
    ],
    [
      { title: "Module 1 — Foundations", items: ["IoT stack", "Protocols", "Devices"] },
      { title: "Module 2 — Connect", items: ["WiFi/BLE", "MQTT", "REST APIs"] },
      { title: "Module 3 — Cloud", items: ["Dashboards", "Storage", "Alerts"] },
      {
        title: "Module 4 — Build",
        items: ["Security", "Power & deployment", "Capstone: smart-home node"],
      },
    ],
    "iot",
  ),

  // MATHEMATICS
  lab(
    "algebra-foundations",
    "math",
    "Algebra Foundations",
    "From variables to equations — the language of math.",
    "Build a rock-solid base in algebra. Manipulate expressions, solve equations, and visualize functions on an interactive graphing playground.",
    "Beginner",
    "8 weeks",
    5,
    [
      "Variables, expressions & equations",
      "Linear & quadratic functions",
      "Systems of equations",
      "Graph and interpret real data",
    ],
    [
      {
        title: "Module 1 — Numbers & Variables",
        items: ["Order of operations", "Expressions", "Properties of numbers"],
      },
      {
        title: "Module 2 — Equations",
        items: ["Linear equations", "Inequalities", "Word problems"],
      },
      { title: "Module 3 — Functions", items: ["Slope & intercepts", "Quadratics", "Graphing"] },
      {
        title: "Module 4 — Systems",
        items: ["Substitution & elimination", "Matrices intro", "Capstone: model a real scenario"],
      },
    ],
    "code",
  ),

  lab(
    "geometry-explorations",
    "math",
    "Geometry Explorations",
    "Shapes, space and the proofs that explain them.",
    "Discover geometry through dynamic constructions. Drag points to see how angles, areas and theorems hold true in every case.",
    "Beginner",
    "10 weeks",
    6,
    [
      "Points, lines, angles & polygons",
      "Triangle & circle theorems",
      "Transformations & symmetry",
      "Coordinate & solid geometry",
    ],
    [
      {
        title: "Module 1 — Foundations",
        items: ["Points & lines", "Angle pairs", "Parallel lines"],
      },
      {
        title: "Module 2 — Triangles",
        items: ["Congruence & similarity", "Pythagoras", "Trigonometry intro"],
      },
      {
        title: "Module 3 — Circles & Polygons",
        items: ["Arcs & chords", "Area & perimeter", "Regular polygons"],
      },
      {
        title: "Module 4 — Space",
        items: ["Transformations", "3D solids", "Capstone: geometric art"],
      },
    ],
    "cad",
  ),

  lab(
    "calculus-intro",
    "math",
    "Calculus Intro",
    "The math of change — limits, derivatives, integrals.",
    "Visualize calculus before formalizing it. Watch slopes, areas and rates of change come alive through animated graphs.",
    "Intermediate",
    "12 weeks",
    5,
    [
      "Limits & continuity intuition",
      "Derivatives & rates of change",
      "Integrals & area under curves",
      "Apply calculus to real problems",
    ],
    [
      { title: "Module 1 — Limits", items: ["Intuitive limits", "Continuity", "Asymptotes"] },
      {
        title: "Module 2 — Derivatives",
        items: ["Rules of differentiation", "Tangent lines", "Optimization"],
      },
      {
        title: "Module 3 — Integrals",
        items: ["Antiderivatives", "Definite integrals", "Area & accumulation"],
      },
      {
        title: "Module 4 — Applications",
        items: ["Motion & growth", "Modeling", "Capstone: calculus in the real world"],
      },
    ],
    "wave",
  ),

  lab(
    "statistics-data",
    "math",
    "Statistics & Data",
    "Turn raw data into evidence and decisions.",
    "Learn statistics through real datasets. Visualize distributions, run experiments, and reason about uncertainty like a data scientist.",
    "Beginner",
    "8 weeks",
    6,
    [
      "Descriptive statistics & visualization",
      "Probability foundations",
      "Distributions & sampling",
      "Hypothesis testing intro",
    ],
    [
      {
        title: "Module 1 — Describe",
        items: ["Mean, median, mode", "Spread & variance", "Charts that don't lie"],
      },
      {
        title: "Module 2 — Probability",
        items: ["Events & outcomes", "Conditional probability", "Bayes intuition"],
      },
      {
        title: "Module 3 — Distributions",
        items: ["Normal distribution", "Sampling", "Central limit theorem"],
      },
      {
        title: "Module 4 — Inference",
        items: ["Confidence intervals", "Hypothesis testing", "Capstone: data investigation"],
      },
    ],
    "iot",
  ),
];

export const LABS_BY_SLUG = Object.fromEntries(STEM_LABS.map((l) => [l.slug, l]));
export const LABS_BY_PILLAR = STEM_LABS.reduce<Record<string, StemLab[]>>((acc, l) => {
  (acc[l.pillar] ??= []).push(l);
  return acc;
}, {});
