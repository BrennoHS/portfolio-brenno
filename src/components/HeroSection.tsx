import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { ChevronDown, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import cvFile from "@/assets/Currículo - Brenno Henrique.pdf";

const FloatingParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/15"
    style={{ width: size, height: size, left: `${x}%` }}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 0.35, 0],
    }}
    transition={{
      duration: 8 + Math.random() * 6,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseRafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const layerNearY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const layerFarY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Mouse tracking for interactions/parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const layerX = useTransform(mouseX, [0, 1400], [-16, 16]);
  const inverseLayerX = useTransform(layerX, (value) => -value * 0.9);
  const layerRotate = useTransform(layerX, (value) => value * 0.03);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const nextX = e.clientX - rect.left;
    const nextY = e.clientY - rect.top;

    if (mouseRafRef.current !== null) {
      cancelAnimationFrame(mouseRafRef.current);
    }

    mouseRafRef.current = requestAnimationFrame(() => {
      mouseX.set(nextX);
      mouseY.set(nextY);
    });
  }, [isMobile, prefersReducedMotion, mouseX, mouseY]);

  const scrollToExperience = () => {
    const target = document.getElementById("experiencia");
    const nav = document.querySelector("nav");

    if (!target) {
      return;
    }

    const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const extraGap = 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - extraGap;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  const particleCount = prefersReducedMotion ? 0 : isMobile ? 4 : 10;
  const particles = useMemo(() => (
    Array.from({ length: particleCount }, (_, i) => ({
      delay: i * 1.05,
      x: Math.random() * 100,
      size: 2 + Math.random() * 3,
    }))
  ), [particleCount]);

  // Rotating typewriter effect for subtitle
  const roleTexts = useMemo(
    () => [
      "Desenvolvedor Front-end · 4 anos em TI",
      "Analista de TI · Especialista em resolução de problemas",
    ],
    []
  );
  const [displayText, setDisplayText] = useState("");
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = roleTexts[activeRoleIndex];
    const typeSpeed = 48;
    const deleteSpeed = 26;
    const holdDelay = 1600;

    let timer: number;

    if (!isDeleting && displayText === currentText) {
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, holdDelay);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setActiveRoleIndex((previous) => (previous + 1) % roleTexts.length);
      return;
    } else {
      timer = window.setTimeout(() => {
        const nextText = isDeleting
          ? currentText.slice(0, Math.max(0, displayText.length - 1))
          : currentText.slice(0, displayText.length + 1);

        setDisplayText(nextText);
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [activeRoleIndex, displayText, isDeleting, roleTexts]);

  useEffect(() => {
    return () => {
      if (mouseRafRef.current !== null) {
        cancelAnimationFrame(mouseRafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg noise-bg scroll-mt-24"
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Ambient parallax layers */}
      <motion.div
        style={{ y: layerFarY, x: layerX }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.02, 0.035, 0.02] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[18%] left-[8%] w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] rounded-full bg-primary/70 blur-[95px]"
        />
      </motion.div>

      <motion.div
        style={{ y: layerNearY, x: inverseLayerX, rotate: layerRotate }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { scale: [1.08, 1, 1.08], opacity: [0.015, 0.03, 0.015] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[14%] right-[6%] w-[16rem] h-[16rem] md:w-[21rem] md:h-[21rem] rounded-full bg-primary/65 blur-[90px]"
        />
      </motion.div>

      {/* Ambient orbs */}
      {!isMobile && !prefersReducedMotion && (
        <>
          <motion.div
            style={{ y: layerFarY }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.02, 0.035, 0.02] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute top-1/4 -left-32 w-[360px] h-[360px] rounded-full bg-primary/70 blur-[95px] pointer-events-none"
          />
          <motion.div
            style={{ y: layerNearY }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.015, 0.03, 0.015] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 -right-32 w-[300px] h-[300px] rounded-full bg-primary/70 blur-[85px] pointer-events-none"
          />
        </>
      )}

      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="mx-auto mb-6 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-primary text-xs sm:text-sm tracking-[0.24em] uppercase">
            Disponível para novos projetos
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-[clamp(2.4rem,7vw,5.6rem)] font-bold tracking-tight leading-[0.95] mb-5 md:mb-6"
        >
          <motion.span
            className="relative inline-block"
            whileHover={
              isMobile || prefersReducedMotion
                ? undefined
                : {
                    y: -2,
                    scale: 1.045,
                    textShadow: "0 0 40px hsl(185 80% 55% / 0.35)",
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            <span className="text-foreground">Brenno</span>{" "}
            <span className="relative inline-block">
            <motion.span
              className="relative z-10 inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, hsl(185 80% 55%) 15%, hsl(185 90% 88%) 42%, hsl(185 80% 55%) 72%)",
                backgroundSize: "240% 100%",
              }}
              animate={
                prefersReducedMotion
                  ? { backgroundPosition: "50% 50%" }
                  : {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
              }
              transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
            >
              Henrique
            </motion.span>
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 -z-0 text-primary/50 blur-md"
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.03, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Henrique
              </motion.span>
            )}
            </span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground text-[clamp(0.78rem,2.6vw,1.25rem)] w-fit max-w-full mx-auto mb-5 md:mb-6 font-mono min-h-[1.75rem] tracking-tight whitespace-nowrap overflow-hidden"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary ml-0.5"
          >
            |
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mx-auto mb-8 md:mb-10 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground"
        >
          Desenvolvo soluções digitais que conectam front-end, automação, dados e operação de TI para gerar performance, estabilidade e resultado real para o negócio.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -1, boxShadow: "0 0 36px hsl(185 80% 55% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToExperience}
            className="focus-ring motion-smooth inline-flex w-full sm:w-[220px] items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium cursor-pointer border border-primary/50 shadow-[0_0_30px_hsl(185_80%_55%_/_0.25)] hover:brightness-110 hover:shadow-[0_0_40px_hsl(185_80%_55%_/_0.45)] transition-all duration-300"
          >
            Ver Experiência
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href="#projetos"
            className="focus-ring motion-smooth glass-highlight inline-flex w-full sm:w-[220px] items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full border border-primary/25 bg-secondary/25 text-foreground/90 hover:text-foreground hover:border-primary/35 transition-colors"
          >
            Ver Projetos
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href={cvFile}
            download="Curriculo-Brenno-Henrique.pdf"
            className="focus-ring motion-smooth inline-flex w-full sm:w-[220px] items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:border-primary/45 transition-colors"
          >
            Baixar Currículo
            <Download className="w-4 h-4" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-7 md:mt-9 flex flex-wrap items-center justify-center gap-2.5"
        >
          {["React", "Tailwind", "Bootstrap", "UI Responsiva"].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ y: -3, scale: 1.03 }}
              className="glass-highlight px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-muted-foreground border border-border/70 bg-secondary/25"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
