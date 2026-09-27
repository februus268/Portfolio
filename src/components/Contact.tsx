import { motion } from "framer-motion";
import { Reveal } from "./ui";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "congquyennv123@gmail.com",
    href: "mailto:congquyennv123@gmail.com",
    color: "var(--color-accent)",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "februus268",
    href: "https://github.com/februus268",
    color: "var(--color-indigo)",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "Ngô Võ Công Quyến",
    href: "https://linkedin.com/in/cong-quyen-nv-01b854429",
    color: "var(--color-violet)",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-py relative"
      style={{ paddingBottom: "clamp(64px, 9vw, 120px)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-72 rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent), var(--color-violet))",
        }}
      />

      <div className="container-wide relative">
        <Reveal>
          <span className="kicker mb-7">Contact</span>
          <h2 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.08] max-w-2xl">
            Let's build something{" "}
            <span className="text-gradient">together.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg md:text-xl max-w-md leading-relaxed">
            I'm open to internship opportunities, collaborations, and
            conversations about technology.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-24 sm:mt-32 lg:mt-48 translate-y-[12px]">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ "--link-color": link.color } as React.CSSProperties}
                className="group grid sm:grid-cols-[160px_1fr_auto] items-center gap-3 sm:gap-8 py-7 md:py-8 border-t border-border last:border-b transition-colors duration-300 hover:bg-bg-subtle/60 -mx-6 px-6 md:-mx-10 md:px-10"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-text-muted">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `color-mix(in srgb, ${link.color} 14%, transparent)`,
                      color: link.color,
                    }}
                  >
                    <link.icon size={16} />
                  </span>
                  {link.label}
                </span>
                <span className="font-display text-xl md:text-2xl text-text-primary">
                  {link.value}
                </span>
                <ArrowUpRight
                  size={22}
                  className="hidden sm:block justify-self-end text-text-muted group-hover:text-[var(--link-color)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
