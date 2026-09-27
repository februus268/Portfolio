import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../hooks/useAnimations";

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-border py-4 sm:py-5 shadow-sm"
          : "bg-transparent py-5 sm:py-7 md:py-8"
      }`}
    >
      <nav className="container-wide flex items-center justify-between">
        {/* Brand */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-semibold text-[1.25rem] sm:text-[1.5rem] md:text-[1.8rem] tracking-tight text-text-primary hover:text-accent transition-colors cursor-pointer"
        >
          februus268
        </motion.button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-14">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id} className="relative">
                <motion.button
                  onClick={() => scrollTo(link.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`group relative py-2 text-[15px] lg:text-[16px] font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-accent), var(--color-violet))",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-border scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle button */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2.5 -mr-2 rounded-lg text-text-primary cursor-pointer"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-bg-primary border-b border-border overflow-hidden"
          >
            <div className="container-wide py-7 space-y-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left px-4 py-4 rounded-lg text-lg font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activeId === link.id
                      ? "text-accent bg-accent-soft/60"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeId === link.id && (
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
