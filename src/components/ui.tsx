import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useAnimations";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 md:mb-14 lg:mb-16 ${align === "left" ? "max-w-4xl" : ""}`}
      style={
        align === "center"
          ? {
              textAlign: "center",
              maxWidth: "46rem",
              marginLeft: "auto",
              marginRight: "auto",
            }
          : undefined
      }
    >
      <span
        className="kicker mb-5"
        style={align === "center" ? { justifyContent: "center" } : undefined}
      >
        {kicker}
      </span>
      <h2 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className="mt-5 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
          style={
            align === "center"
              ? { marginLeft: "auto", marginRight: "auto" }
              : undefined
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface SectionContentProps {
  children: ReactNode;
  className?: string;
}

export function SectionContent({
  children,
  className = "",
}: SectionContentProps) {
  const { ref, isInView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className={`section-settle ${isInView ? "is-active" : ""} container-wide my-auto w-full ${className}`}
    >
      {children}
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const { ref, isInView } = useInView(0.12);

  const directionMap = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...offset }
      }
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Clip-path reveal, for images / visual panels */
export function RevealImage({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
