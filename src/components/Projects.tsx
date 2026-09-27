import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading, Reveal, RevealImage } from "./ui";
import {
  ArrowUpRight,
  Trophy,
  GraduationCap,
  Terminal,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import vietgooCertificate from "../assets/vietgoo-certificate.jpg";

function VietGooShowcase() {
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

      <div className="grid items-start md:grid-cols-[1.05fr_0.95fr]">
        {/* Full certificate: no fixed aspect ratio and no object-cover */}
        <div className="relative overflow-hidden bg-bg-subtle md:rounded-l-[28px]">
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
            {["Gemini", "Travel", "React", "TypeScript"].map((tag, index) => {
              const colors = [
                "var(--color-accent)",
                "var(--color-violet)",
                "var(--color-cyan)",
                "var(--color-indigo)",
              ];

              return (
                <motion.span
                  key={tag}
                  whileHover={{ y: -2, scale: 1.04 }}
                  className="inline-flex min-h-9 items-center justify-center rounded-full border bg-bg-subtle px-4 py-1.5 text-sm font-medium tracking-wide text-text-secondary transition-all duration-300 hover:bg-bg-surface"
                  style={{
                    borderColor: `${colors[index]}55`,
                    boxShadow: `0 4px 14px ${colors[index]}12`,
                  }}
                >
                  {tag}
                </motion.span>
              );
            })}
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

interface SimpleProject {
  title: string;
  description: string;
  tags: string[];
  github: string;
  icon: LucideIcon;
  color: string;
  span: string;
  big?: boolean;
}

const otherProjects: SimpleProject[] = [
  {
    title: "EduRoom",
    description:
      "Modern classroom scheduling and room booking platform for Vietnamese high schools, built with Django.",
    tags: ["Django", "Python"],
    github: "https://github.com/februus268/EduRoom",
    icon: GraduationCap,
    color: "var(--color-indigo)",
    span: "md:col-span-7 md:row-span-2",
    big: true,
  },
  {
    title: "TaskTracker CLI",
    description:
      "Python CLI task manager for creating, updating, deleting, viewing, and tracking tasks.",
    tags: ["Python", "CLI"],
    github: "https://github.com/februus268/TaskTracker_CLI",
    icon: Terminal,
    color: "var(--color-cyan)",
    span: "md:col-span-5",
  },
  {
    title: "ExpensesTracker CLI",
    description:
      "Python CLI application for managing and tracking expenses with CSV storage, argparse, and monthly/yearly summaries.",
    tags: ["Python", "CLI", "CSV"],
    github: "https://github.com/februus268/ExpensesTracker_CLI",
    icon: Wallet,
    color: "var(--color-violet)",
    span: "md:col-span-5",
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
      className={`group relative col-span-1 overflow-hidden rounded-[26px] border border-border bg-bg-surface transition-all duration-500 hover:shadow-[0_24px_60px_-28px_var(--proj-color)] ${project.span}`}
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
        className={`relative z-10 flex items-center justify-center overflow-hidden ${
          project.big ? "h-60 md:h-[300px]" : "h-44 md:h-[200px]"
        }`}
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
          className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/70 bg-white/60 shadow-[0_12px_35px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md"
        >
          <project.icon
            size={project.big ? 38 : 32}
            style={{ color: project.color }}
            strokeWidth={1.7}
          />
        </motion.div>

        <div
          className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full"
          style={{
            background: project.color,
            boxShadow: `0 0 18px ${project.color}`,
          }}
        />

        <div className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-text-muted shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-text-primary">
          <ArrowUpRight size={17} />
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-col items-center text-center ${
          project.big
            ? "px-8 py-8 md:px-10 md:py-9"
            : "px-7 py-7 md:px-8 md:py-8"
        }`}
      >
        <h3
          className={`font-display font-semibold tracking-tight text-text-primary ${
            project.big ? "text-2xl md:text-[1.7rem]" : "text-xl md:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-3 max-w-[560px] text-text-secondary leading-7 ${
            project.big
              ? "text-base md:text-[1.05rem]"
              : "text-[0.98rem] md:text-base"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-5 flex max-w-full flex-wrap items-center justify-center gap-2.5">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              whileHover={{ y: -2, scale: 1.04 }}
              className="inline-flex min-h-9 items-center justify-center rounded-full border bg-bg-subtle/90 px-4 py-1.5 text-sm font-medium tracking-wide text-text-secondary whitespace-nowrap shadow-[0_3px_12px_-8px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-accent/50 hover:bg-accent-soft/50 hover:text-accent"
              style={{
                borderColor:
                  tagIndex % 2 === 0
                    ? `${project.color}45`
                    : "var(--color-border)",
              }}
            >
              {tag}
            </motion.span>
          ))}
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
  return (
    <section id="projects" className="section-py relative">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            kicker="Projects"
            title="What I've built"
            description="Real projects I've shipped to practice and apply my skills."
          />
        </Reveal>

        <RevealImage>
          <VietGooShowcase />
        </RevealImage>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:auto-rows-[minmax(300px,auto)] md:gap-7">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
