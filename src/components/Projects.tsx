import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { SectionHeading, Reveal, RevealImage, SectionContent } from "./ui";
import {
  ArrowUpRight,
  Trophy,
  GraduationCap,
  Terminal,
  Wallet,
  ZoomIn,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import vietgooCertificate from "../assets/vietgoo-certificate.jpg";
import eduRoomImage from "../assets/EduRoom.png";

interface LightboxData {
  src: string;
  alt: string;
  title: string;
}

function ImageLightbox({
  data,
  onClose,
}: {
  data: LightboxData | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (data) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8 cursor-zoom-out"
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-display font-medium text-sm md:text-base text-white/90 truncate">
              {data.title}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[82vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/50 flex items-center justify-center"
          >
            <img
              src={data.src}
              alt={data.alt}
              className="w-auto h-auto max-h-[80vh] max-w-full object-contain mx-auto select-none"
            />
          </motion.div>

          <p className="mt-3 text-xs text-white/60 font-sans">
            Nhấp ra ngoài hoặc bấm phím Esc để đóng
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VietGooShowcase({
  onOpenLightbox,
}: {
  onOpenLightbox: (data: LightboxData) => void;
}) {
  const panelRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(rotateYValue, [-0.5, 0.5], [2.5, -2.5]),
    { stiffness: 140, damping: 22 },
  );
  const rotateY = useSpring(
    useTransform(rotateXValue, [-0.5, 0.5], [-2.5, 2.5]),
    { stiffness: 140, damping: 22 },
  );

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = panelRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x * 100);
    mouseY.set(y * 100);
    rotateXValue.set(x - 0.5);
    rotateYValue.set(y - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.a
      ref={panelRef}
      href="https://vietgoo.ai.studio/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative block overflow-hidden rounded-[30px] border border-border bg-bg-surface shadow-[0_25px_70px_-35px_rgba(37,99,235,0.35)] cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(480px circle at ${x}% ${y}%, rgba(37,99,235,0.10), rgba(139,92,246,0.06) 42%, transparent 72%)`,
          ),
        }}
      />

      <span className="pointer-events-none absolute inset-0 z-30 rounded-[30px] border-2 border-transparent transition-all duration-500 group-hover:border-accent/30" />

      <div className="grid items-stretch md:grid-cols-[1.05fr_0.95fr]">
        {/* Certificate on left with zoom trigger */}
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenLightbox({
              src: vietgooCertificate,
              alt: "AI Riser Vietnam 2026 Certificate of Completion — Top 500",
              title: "AI Riser Vietnam 2026 Certificate of Completion — Top 500",
            });
          }}
          className="relative overflow-hidden bg-bg-subtle md:rounded-l-[28px] cursor-zoom-in group/zoom"
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative w-full"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(99,102,241,0.08), transparent 70%)",
              }}
            />

            <motion.img
              src={vietgooCertificate}
              alt="AI Riser Vietnam 2026 Certificate of Completion — Top 500"
              loading="eager"
              decoding="async"
              className="relative z-10 block h-auto w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
            />

            {/* Hover magnifying glass badge */}
            <div className="absolute inset-0 z-30 bg-black/20 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-text-primary text-xs font-medium shadow-xl backdrop-blur-md transform scale-90 group-hover/zoom:scale-100 transition-transform duration-300">
                <ZoomIn size={16} className="text-accent" />
                <span>Phóng to</span>
              </span>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}
            />

            <div className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-medium text-text-secondary shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(37,99,235,0.6)]" />
              AI Riser Vietnam 2026
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-7 py-10 text-center sm:px-9 sm:py-12 md:px-10 md:py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <div
              className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg, var(--color-accent), var(--color-violet), var(--color-cyan), var(--color-accent))",
              }}
            >
              <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-bg-surface">
                <Trophy size={23} style={{ color: "var(--color-accent)" }} />
              </div>
            </div>

            <div className="text-left">
              <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                AI Riser Vietnam 2026
              </span>
              <p className="mt-1 font-display text-4xl font-bold leading-none text-gradient sm:text-5xl">
                TOP 500
              </p>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
          >
            VietGoo
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-4 max-w-[560px] text-base leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8"
          >
            An AI-powered travel companion that helps users discover
            destinations, learn Vietnamese history and culture, explore local
            specialties, and experience AI Voice Tours across Vietnam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 flex max-w-[420px] flex-wrap justify-center gap-2.5"
          >
            {["Gemini", "Travel", "React", "TypeScript"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-bg-subtle px-4 py-1.5 text-sm font-medium tracking-wide text-text-secondary transition-all duration-300 hover:bg-bg-surface hover:text-text-primary shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors duration-300 group-hover:text-accent"
          >
            Explore VietGoo
            <ArrowUpRight size={15} />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

function EduRoomShowcase({
  onOpenLightbox,
}: {
  onOpenLightbox: (data: LightboxData) => void;
}) {
  const panelRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(rotateYValue, [-0.5, 0.5], [2.5, -2.5]),
    { stiffness: 140, damping: 22 },
  );
  const rotateY = useSpring(
    useTransform(rotateXValue, [-0.5, 0.5], [-2.5, 2.5]),
    { stiffness: 140, damping: 22 },
  );

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = panelRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x * 100);
    mouseY.set(y * 100);
    rotateXValue.set(x - 0.5);
    rotateYValue.set(y - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.a
      ref={panelRef}
      href="https://github.com/februus268/EduRoom"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative block overflow-hidden rounded-[30px] border border-border bg-bg-surface shadow-[0_25px_70px_-35px_rgba(99,102,241,0.35)] cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(480px circle at ${x}% ${y}%, rgba(99,102,241,0.12), rgba(139,92,246,0.06) 42%, transparent 72%)`,
          ),
        }}
      />

      <span className="pointer-events-none absolute inset-0 z-30 rounded-[30px] border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/30" />

      <div className="grid items-stretch md:grid-cols-[1.05fr_0.95fr]">
        {/* Screenshot Container with Zoom */}
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenLightbox({
              src: eduRoomImage,
              alt: "EduRoom Dashboard Preview",
              title: "EduRoom — Classroom Scheduling & Room Booking Platform",
            });
          }}
          className="relative overflow-hidden bg-bg-subtle md:rounded-l-[28px] cursor-zoom-in group/zoom flex items-center justify-center min-h-[260px] md:min-h-full"
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(99,102,241,0.08), transparent 70%)",
              }}
            />

            <motion.img
              src={eduRoomImage}
              alt="EduRoom Classroom Management Dashboard"
              loading="eager"
              decoding="async"
              className="relative z-10 block h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
            />

            {/* Hover magnifying glass badge */}
            <div className="absolute inset-0 z-30 bg-black/20 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-text-primary text-xs font-medium shadow-xl backdrop-blur-md transform scale-90 group-hover/zoom:scale-100 transition-transform duration-300">
                <ZoomIn size={16} className="text-accent" />
                <span>Phóng to</span>
              </span>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}
            />
          </motion.div>
        </div>

        {/* Details Column — Centered Text */}
        <div className="group/details relative z-10 flex min-h-full flex-col items-center justify-center px-7 py-10 text-center sm:px-9 sm:py-12 md:px-10 md:py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <div
              className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg, #6366f1, #8b5cf6, #3b82f6, #6366f1)",
              }}
            >
              <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-bg-surface">
                <GraduationCap size={24} className="text-indigo-600" />
              </div>
            </div>

            <div className="text-left">
              <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                Classroom & Room Management
              </span>
              <p className="mt-1 font-display text-4xl font-bold leading-none text-gradient sm:text-5xl">
                High School
              </p>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
          >
            EduRoom
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-4 max-w-[560px] text-base leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8 text-center"
          >
            Modern classroom scheduling and room booking platform for Vietnamese high schools, built with Django.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 flex max-w-[420px] flex-wrap justify-center gap-2.5"
          >
            {["Django", "Python", "SQLite", "Bootstrap"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-bg-subtle px-4 py-1.5 text-sm font-medium tracking-wide text-text-secondary transition-all duration-300 hover:bg-bg-surface hover:text-text-primary shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent opacity-0 translate-y-2 transition-all duration-300 pointer-events-none group-hover/details:opacity-100 group-hover/details:translate-y-0">
            View on GitHub
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

interface SimpleProject {
  title: string;
  description: string;
  tags: string[];
  github: string;
  icon: LucideIcon;
  color: string;
  span: string;
}

const cliProjects: SimpleProject[] = [
  {
    title: "TaskTracker CLI",
    description:
      "Python CLI task manager for creating, updating, deleting, viewing, and tracking tasks.",
    tags: ["Python", "CLI"],
    github: "https://github.com/februus268/TaskTracker_CLI",
    icon: Terminal,
    color: "var(--color-cyan)",
    span: "col-span-1",
  },
  {
    title: "ExpensesTracker CLI",
    description:
      "Python CLI application for managing and tracking expenses with CSV storage, argparse, and monthly/yearly summaries.",
    tags: ["Python", "CLI", "CSV"],
    github: "https://github.com/februus268/ExpensesTracker_CLI",
    icon: Wallet,
    color: "var(--color-violet)",
    span: "col-span-1",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: SimpleProject;
  index: number;
}) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -7 }}
      style={{ "--proj-color": project.color } as React.CSSProperties}
      className={`group relative col-span-1 overflow-hidden rounded-[26px] border border-border bg-bg-surface transition-all duration-500 hover:shadow-[0_24px_60px_-28px_var(--proj-color)] flex flex-col justify-between ${project.span}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at 50% 20%, ${project.color}18, transparent 68%)`,
        }}
      />

      <span
        className="pointer-events-none absolute inset-0 z-30 rounded-[26px] border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        style={{ borderColor: project.color }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center overflow-hidden shrink-0 h-40 md:h-[180px]"
        style={{
          background: `color-mix(in srgb, ${project.color} 9%, var(--color-bg-subtle))`,
        }}
      >
        <div
          className="pointer-events-none absolute h-48 w-48 rounded-full blur-3xl opacity-30 transition-transform duration-500 group-hover:scale-125"
          style={{ background: project.color }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `radial-gradient(${project.color} 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        />

        <motion.div
          whileHover={{ y: -6, scale: 1.08, rotate: -2 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/60 shadow-[0_12px_35px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md"
        >
          <project.icon
            size={28}
            style={{ color: project.color }}
            strokeWidth={1.7}
          />
        </motion.div>

        <div
          className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full z-20"
          style={{
            background: project.color,
            boxShadow: `0 0 18px ${project.color}`,
          }}
        />

        <div className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-text-muted shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-text-primary">
          <ArrowUpRight size={17} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-between px-7 py-6 md:px-8 md:py-7">
        <div className="flex flex-col items-center w-full">
          <h3 className="font-display font-semibold tracking-tight text-text-primary text-xl md:text-2xl">
            {project.title}
          </h3>

          <p className="mt-2.5 text-text-secondary leading-relaxed max-w-[560px] text-[0.98rem] md:text-base">
            {project.description}
          </p>

          <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex min-h-8 items-center justify-center rounded-full bg-bg-subtle/90 px-3.5 py-1 text-xs sm:text-sm font-medium tracking-wide text-text-secondary whitespace-nowrap shadow-[0_3px_12px_-8px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-accent-soft/60 hover:text-accent"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-text-muted opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View on GitHub
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);

  return (
    <section id="projects" className="portfolio-section relative">
      <SectionContent>
        <Reveal>
          <SectionHeading
            kicker="Projects"
            title="What I've built"
            description="Real projects I've shipped to practice and apply my skills."
          />
        </Reveal>

        <div className="space-y-7 md:space-y-8">
          <RevealImage>
            <VietGooShowcase onOpenLightbox={setLightbox} />
          </RevealImage>

          <RevealImage>
            <EduRoomShowcase onOpenLightbox={setLightbox} />
          </RevealImage>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {cliProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </SectionContent>

      <ImageLightbox data={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
