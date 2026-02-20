import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CursorGlow = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 30, mass: 0.65 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 30, mass: 0.65 });

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, prefersReducedMotion, mouseX, mouseY]);

  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 w-[32rem] h-[32rem] rounded-full pointer-events-none z-0"
      style={{
        x: glowX,
        y: glowY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.14) 0%, hsl(var(--primary) / 0.08) 30%, transparent 74%)",
        filter: "blur(12px)",
      }}
    />
  );
};

export default CursorGlow;