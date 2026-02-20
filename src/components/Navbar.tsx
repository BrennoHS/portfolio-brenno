import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const ids = navItems.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const onScroll = () => {
      if (!sections.length) return;
      const nav = document.querySelector("nav");
      const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
      const scrollPos = window.scrollY + navHeight + 120;

      let currentId = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        } else {
          break;
        }
      }

      if (currentId) {
        setActiveSection(currentId);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3 sm:py-4 px-3 sm:px-4"
    >
      <motion.div
        animate={{
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "blur(16px)",
          borderColor: scrolled ? "hsl(0 0% 100% / 0.08)" : "hsl(0 0% 100% / 0.04)",
        }}
        className={`no-scrollbar flex gap-1 rounded-full glass px-1.5 sm:px-2 py-1.5 w-full max-w-max overflow-x-auto transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_hsl(0_0%_0%_/_0.35)]" : ""
        }`}
      >
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`focus-ring relative shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-200 ${
              activeSection === item.href.replace("#", "")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {activeSection === item.href.replace("#", "") && (
              <motion.span
                layoutId="activeNavPill"
                className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
