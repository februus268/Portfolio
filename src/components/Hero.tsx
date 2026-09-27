import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import {
  useMouseParallax,
  useMagnetic,
  useTypewriter,
} from "../hooks/useAnimations";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface Badge {
  label: string;
  top: string;
  left?: string;
  right?: string;
  depth: number;
  delay: number;
  color: string;
}

const badges: Badge[] = [
  {
    label: "C++",
    top: "-4%",
    left: "-18%",
    depth: 1.5,
    delay: 0,
    color: "var(--color-cyan)",
  },
  {
    label: "Python",
    top: "64%",
    left: "-20%",
    depth: 0.9,
    delay: 0.5,
    color: "var(--color-accent)",
  },
  {
    label: "Algorithms",
    top: "-14%",
    right: "14%",
    depth: 1.1,
    delay: 1,
    color: "var(--color-violet)",
  },
  {
    label: "Git",
    top: "90%",
    right: "-8%",
    depth: 1.3,
    delay: 0.25,
    color: "var(--color-indigo)",
  },
  {
    label: "SQL",
    top: "36%",
    right: "-18%",
    depth: 0.7,
    delay: 0.8,
    color: "var(--color-accent)",
  },
  {
    label: "Web/App",
    top: "102%",
    left: "16%",
    depth: 1.2,
    delay: 1.3,
    color: "var(--color-violet)",
  },
];

const terminalLines = [
  "npm run dev",
  ">> Ngô Võ Công Quyến",
  ">> 06/02/2008",
  ">> IT Student @ UTE",
  ">> AI Riser Vietnam 2026 — TOP 500",
  "focus → Software Engineering · AI Engineering",
];

/* ===== Code-window hero visual ===== */
function CodeWindow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(0.022);
  const typed = useTypewriter(terminalLines, 26, 1600);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const currentLine = typed.length;
  const isTypingLast =
    typed.length > 0 &&
    typed[typed.length - 1].length < terminalLines[typed.length - 1]?.length;

  return (
    <div
      className="relative w-full max-w-md mx-auto lg:max-w-none"
      style={{ perspective: 1300 }}
    >
      {/* Glowing gradient orb behind the visual */}
      <motion.div
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[70px] opacity-60"
        style={{
          background:
            "conic-gradient(from 90deg, var(--color-accent), var(--color-violet), var(--color-cyan), var(--color-accent))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            top: `${18 + i * 20}%`,
            left: i % 2 === 0 ? "-4%" : "102%",
            background:
              i % 2 === 0 ? "var(--color-accent)" : "var(--color-violet)",
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}

      {badges.map((b) => (
        <motion.div
          key={b.label}
          className="hidden sm:flex items-center gap-2 absolute z-20 px-4 py-2.5 rounded-xl bg-bg-surface/95 backdrop-blur border border-border text-[13px] font-mono font-medium text-text-secondary shadow-[0_10px_28px_-10px_rgba(30,30,60,0.22)]"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            x: mouse.x * b.depth,
            y: mouse.y * b.depth,
          }}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { delay: 0.9 + b.delay * 0.15, duration: 0.6 },
            scale: { delay: 0.9 + b.delay * 0.15, duration: 0.6 },
            y: {
              delay: 1.4,
              duration: 5 + b.depth,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.12, y: -4 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: b.color }}
          />
          {b.label}
        </motion.div>
      ))}

      <motion.div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1300 }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="relative z-10 rounded-2xl border border-border bg-bg-surface/95 backdrop-blur overflow-hidden shadow-[0_35px_80px_-20px_rgba(30,30,60,0.25)]"
      >
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-border bg-bg-subtle/80">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e3a651]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4fb06a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e35d5d]" />
          <span className="ml-3 text-[11px] font-mono text-text-muted">
            nvcongquyen.dev.tsx
          </span>
        </div>

        {/* Code body */}
        <div className="p-6 md:p-7 font-mono text-[13px] md:text-[14px] leading-[2]">
          <p>
            <span className="text-[#8c6dd0]">const</span>{" "}
            <span className="text-[#2e6e5e]">developer</span> = {"{"}
          </p>
          <p className="pl-4">
            <span className="text-text-muted">name:</span>{" "}
            <span className="text-[#b3542e]">'Ngô Võ Công Quyến'</span>,
          </p>
          <p className="pl-4">
            <span className="text-text-muted">role:</span>{" "}
            <span className="text-[#b3542e]">'IT Student'</span>,
          </p>
          <p className="pl-4">
            <span className="text-text-muted">stack:</span> [
            <span
              style={{ textShadow: "0 0 14px rgba(37,99,235,0.35)" }}
              className="text-[#b3542e]"
            >
              'Software'
            </span>
            ,{" "}
            <span
              style={{ textShadow: "0 0 14px rgba(139,92,246,0.35)" }}
              className="text-[#b3542e]"
            >
              'Algorithms'
            </span>
            , <span className="text-[#b3542e]">'AI'</span>],
          </p>
          <p className="pl-4">
            <span className="text-text-muted">focus:</span>{" "}
            <span className="text-[#b3542e]">
              'Software Engineer · AI Engineering'
            </span>
            ,
          </p>
          <p>{"}"}</p>
        </div>

        {/* Terminal strip with typing effect */}
        <div className="border-t border-border bg-[#15161b] px-6 md:px-7 py-4 font-mono text-[12.5px] leading-[1.9]">
          {terminalLines.map((line, i) => {
            const shown = typed[i] ?? "";
            if (!shown && i !== currentLine) return null;
            const isCurrent = i === typed.length - 1 && isTypingLast;
            return (
              <p
                key={line}
                className={i === 0 ? "text-[#8fd9a8]" : "text-[#9ea3b0]"}
              >
                {i === 0 && <span className="text-[#5c93ff] mr-1.5">$</span>}
                {shown}
                {isCurrent && (
                  <motion.span
                    className="inline-block w-[7px] h-[13px] bg-[#8fd9a8] ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </p>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function MagneticButton({
  children,
  onClick,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const { ref, offset, onMouseMove, onMouseLeave } = useMagnetic(0.3);

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.4,
      }}
      className={`
        group relative inline-flex
        items-center justify-center
        gap-3 whitespace-nowrap
        rounded-full
        cursor-pointer
        text-base md:text-lg font-medium
        overflow-hidden
        transition-all duration-300
        ${className}
        ${
          variant === "solid"
            ? "text-white bg-gradient-to-r from-blue-600 to-violet-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
            : "border border-border text-text-primary hover:border-border-hover"
        }
      `}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      <span className="relative z-10 flex items-center justify-center shrink-0">
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </motion.button>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-36 pb-24 md:pt-40 overflow-hidden">
      <div className="container-wide grid lg:grid-cols-[1.05fr_0.95fr] gap-20 lg:gap-20 items-center">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={fadeUp} className="kicker mb-10">
            Open to opportunities
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold text-[3.25rem] sm:text-7xl lg:text-[5.25rem] tracking-tight leading-[0.98] text-text-primary"
          >
            Ngô Võ
            <br />
            <span className="relative inline-block">
              <span className="text-gradient">Công Quyến</span>
              <motion.span
                className="absolute left-0 -bottom-1 h-[6px] md:h-[9px] rounded-full -z-10"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent), var(--color-violet))",
                  opacity: 0.25,
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 0.9,
                  delay: 1.1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-xl md:text-2xl text-text-secondary font-medium"
          >
            Information Technology Student
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-text-muted text-base md:text-lg leading-relaxed"
          >
            Building my skills in software development, algorithms, and modern
            technology.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ marginTop: "7px" }}
            className="mt-14 flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="h-12 min-w-[175px] px-7"
            >
              View projects
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => scrollTo("contact")}
              className="h-12 min-w-[155px] px-7"
            >
              Contact me
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{ marginTop: "15px", marginLeft: "5px" }}
            className="flex items-center gap-10"
          >
            <a
              href="https://github.com/februus268"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-2.5 text-lg text-text-muted hover:text-accent transition-colors"
            >
              <GithubIcon size={22} /> GitHub <ArrowUpRight size={17} />
            </a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a
              href="https://linkedin.com/in/cong-quyen-nv-01b854429"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-2.5 text-lg text-text-muted hover:text-accent transition-colors"
            >
              <LinkedinIcon size={22} /> LinkedIn <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </motion.div>

        {/* Visual column */}
        <div>
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}
