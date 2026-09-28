import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, Reveal, SectionContent } from "./ui";
import { useInView } from "../hooks/useAnimations";
import {
  Code2,
  Layers,
  Binary,
  Database,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillGroup {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
  color: string;
  gradient: string;
  span: string;
}

const skillGroups: SkillGroup[] = [
  {
    icon: Layers,
    title: "Software Development",
    description: "Web technologies and tools I use to build software projects.",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    color: "var(--color-indigo)",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    span: "md:col-span-1 lg:col-span-7",
  },
  {
    icon: Code2,
    title: "Programming",
    description: "Core programming foundations and practical development.",
    skills: ["C++", "Python"],
    color: "var(--color-accent)",
    gradient: "linear-gradient(135deg, #2563eb, #06b6d4)",
    span: "md:col-span-1 lg:col-span-5",
  },
  {
    icon: Binary,
    title: "Algorithms",
    description: "Data structures and problem-solving techniques.",
    skills: ["Data Structures", "Searching", "Sorting", "Problem Solving"],
    color: "var(--color-violet)",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    span: "md:col-span-1 lg:col-span-5",
  },
  {
    icon: Database,
    title: "Database",
    description: "Fundamentals of relational databases and SQL.",
    skills: ["SQL", "Database Fundamentals"],
    color: "var(--color-cyan)",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    span: "md:col-span-1 lg:col-span-4",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Tools and environments I use for development.",
    skills: ["Git", "GitHub", "Linux"],
    color: "var(--color-accent)",
    gradient: "linear-gradient(135deg, #2563eb, #6366f1)",
    span: "md:col-span-2 lg:col-span-3",
  },
];

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, isInView } = useInView(0.15);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: isSelected ? -8 : 0,
              scale: isSelected ? 1.015 : 1,
            }
          : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      onClick={() => setIsSelected((selected) => !selected)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsSelected((selected) => !selected);
        }
      }}
      style={
        {
          "--skill-color": group.color,
          "--skill-gradient": group.gradient,
        } as React.CSSProperties
      }
      className={`
        group relative col-span-1 ${group.span}
        min-h-[280px]
        rounded-[28px]
        border border-border/70
        bg-bg-surface
        overflow-hidden
        transition-all duration-500
        ${isSelected ? "border-transparent shadow-[0_25px_70px_-25px_var(--skill-color)]" : "hover:border-transparent hover:shadow-[0_25px_70px_-25px_var(--skill-color)]"}
      `}
    >
      {/* Large decorative glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -top-24
          -right-24
          w-64
          h-64
          rounded-full
          blur-3xl
          opacity-[0.07]
          transition-all
          duration-700
          ${isSelected ? "opacity-[0.20] scale-125" : "group-hover:opacity-[0.20] group-hover:scale-125"}
        `}
        style={{ background: group.gradient }}
      />

      {/* Bottom glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          w-56
          h-56
          rounded-full
          blur-3xl
          opacity-0
          transition-opacity
          duration-700
          ${isSelected ? "opacity-[0.10]" : "group-hover:opacity-[0.10]"}
        `}
        style={{ background: group.color }}
      />

      {/* Subtle gradient overlay */}
      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          ${isSelected ? "opacity-100" : "group-hover:opacity-100"}
        `}
        style={{
          background: `linear-gradient(
            135deg,
            color-mix(in srgb, ${group.color} 7%, transparent),
            transparent 55%
          )`,
        }}
      />

      {/* Hover border */}
      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          border
          border-transparent
          opacity-0
          transition-opacity
          duration-500
          ${isSelected ? "opacity-100" : "group-hover:opacity-100"}
        `}
        style={{ borderColor: group.color }}
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          h-full
          min-h-[240px]
          sm:min-h-[280px]
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-5
          py-8
          sm:px-7
          sm:py-10
          md:px-10
        "
      >
        {/* Icon */}
        <motion.div
          whileHover={{
            scale: 1.12,
            rotate: 5,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className={`
            relative
            mb-7
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            border
            shadow-sm
            transition-transform
            duration-500
            ${isSelected ? "scale-110 rotate-[5deg]" : "group-hover:scale-110 group-hover:rotate-[5deg]"}
          `}
          style={{
            background: `color-mix(in srgb, ${group.color} 10%, white)`,
            borderColor: `color-mix(in srgb, ${group.color} 25%, transparent)`,
            color: group.color,
          }}
        >
          <group.icon size={27} strokeWidth={1.8} />

          {/* Small orbit dot */}
          <span
            className={`
              absolute
              -top-1
              -right-1
              w-3
              h-3
              rounded-full
              opacity-0
              scale-0
              transition-all
              duration-500
              ${isSelected ? "opacity-100 scale-100" : "group-hover:opacity-100 group-hover:scale-100"}
            `}
            style={{
              background: group.gradient,
            }}
          />
        </motion.div>

        {/* Title */}
        <h3
          className={`
            font-display
            text-2xl
            md:text-[1.75rem]
            font-semibold
            tracking-tight
            text-text-primary
            mb-3
            transition-transform
            duration-500
            ${isSelected ? "-translate-y-1" : "group-hover:-translate-y-1"}
          `}
        >
          {group.title}
        </h3>

        {/* Description */}
        <p
          className="
            max-w-[520px]
            text-base
            md:text-[1.05rem]
            leading-7
            text-text-secondary
            mb-7
          "
        >
          {group.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {group.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
              transition={{
                delay: index * 0.08 + i * 0.05 + 0.25,
                duration: 0.3,
              }}
              whileHover={{
                y: -3,
                scale: 1.05,
              }}
              className={`
                px-3.5
                py-2
                rounded-full
                bg-bg-subtle
                border
                border-border
                text-sm
                md:text-[0.9rem]
                font-medium
                text-text-secondary
                transition-all
                duration-300
                ${isSelected ? "bg-white" : "hover:bg-white"}
              `}
              style={
                {
                  "--pill-hover": group.color,
                } as React.CSSProperties
              }
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Corner arrow */}
        <div
          className={`
            absolute
            top-6
            right-6
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            border
            border-border
            text-text-muted
            opacity-0
            translate-x-2
            -translate-y-2
            transition-all
            duration-500
            ${isSelected ? "opacity-100 translate-x-0 translate-y-0" : "group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"}
          `}
          style={{
            color: group.color,
            borderColor: `color-mix(in srgb, ${group.color} 25%, transparent)`,
          }}
        >
          <ArrowUpRight size={17} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="portfolio-section relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="
          pointer-events-none
          absolute
          top-20
          right-[-180px]
          w-[420px]
          h-[420px]
          rounded-full
          blur-[120px]
          opacity-[0.07]
        "
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-violet))",
        }}
      />

      <SectionContent className="relative z-10">
        <Reveal>
          <SectionHeading
            kicker="Skills"
            title="Technical toolkit"
            description="Technologies and concepts I'm currently learning and applying."
          />
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </SectionContent>
    </section>
  );
}
