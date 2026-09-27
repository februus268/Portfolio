import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionContent } from "./ui";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from "./Icons";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "congquyennv123@gmail.com",
    color: "var(--color-accent)",
    isEmail: true,
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
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "NV Cong Quyen",
    href: "https://www.facebook.com/congquyennv.826/",
    color: "#1877f2",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "februus.268",
    href: "https://www.instagram.com/februus.268/",
    color: "#e1306c",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("congquyennv123@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="portfolio-section relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-72 rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent), var(--color-violet))",
        }}
      />

      <SectionContent className="relative">
        <Reveal>
          <span className="kicker mb-4 sm:mb-6">Contact</span>
          <h2 className="font-display text-[2.2rem] xs:text-[2.6rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.08] max-w-3xl">
            Let's build something{" "}
            <span className="text-gradient">together.</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-text-secondary text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            I'm open to internship opportunities, collaborations, and
            conversations about technology.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 sm:mt-[68px] lg:mt-[76px] w-full max-w-4xl lg:max-w-5xl translate-y-[12px]">
            {links.map((link) => {
              if (link.isEmail) {
                return (
                  <motion.button
                    key={link.label}
                    onClick={handleCopyEmail}
                    type="button"
                    style={{ "--link-color": link.color } as React.CSSProperties}
                    className="group w-full text-left grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_auto] items-center gap-y-2 gap-x-3 sm:gap-8 py-4 sm:py-6 md:py-7 border-t border-border transition-all duration-300 hover:bg-bg-subtle/70 rounded-2xl px-3.5 sm:px-5 md:px-8 cursor-pointer"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-text-muted">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        style={{
                          background: `color-mix(in srgb, ${link.color} 14%, transparent)`,
                          color: link.color,
                        }}
                      >
                        <link.icon size={17} />
                      </span>
                      {link.label}
                    </span>

                    <span className="col-span-2 sm:col-span-1 order-3 sm:order-none font-display font-semibold text-lg sm:text-xl md:text-2xl text-text-primary tracking-tight truncate max-w-full">
                      {link.value}
                    </span>

                    <div className="order-2 sm:order-none justify-self-end flex items-center gap-2 text-text-muted">
                      {copied ? (
                        <span className="flex items-center gap-1.5 text-emerald-500 font-medium text-sm">
                          <Check size={18} />
                          <span>Đã sao chép!</span>
                        </span>
                      ) : (
                        <ArrowUpRight
                          size={22}
                          className="text-text-muted group-hover:text-[var(--link-color)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        />
                      )}
                    </div>
                  </motion.button>
                );
              }

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--link-color": link.color } as React.CSSProperties}
                  className="group grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_auto] items-center gap-y-2 gap-x-3 sm:gap-8 py-4 sm:py-6 md:py-7 border-t border-border last:border-b transition-all duration-300 hover:bg-bg-subtle/70 rounded-2xl px-3.5 sm:px-5 md:px-8 cursor-pointer"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-text-muted">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{
                        background: `color-mix(in srgb, ${link.color} 14%, transparent)`,
                        color: link.color,
                      }}
                    >
                      <link.icon size={17} />
                    </span>
                    {link.label}
                  </span>

                  <span className="col-span-2 sm:col-span-1 order-3 sm:order-none font-display font-semibold text-lg sm:text-xl md:text-2xl text-text-primary tracking-tight group-hover:text-accent transition-colors truncate max-w-full">
                    {link.value}
                  </span>

                  <ArrowUpRight
                    size={22}
                    className="order-2 sm:order-none justify-self-end text-text-muted group-hover:text-[var(--link-color)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </motion.a>
              );
            })}
          </div>
        </Reveal>
      </SectionContent>
    </section>
  );
}
