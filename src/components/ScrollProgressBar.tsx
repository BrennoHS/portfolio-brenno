import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.55))",
        boxShadow: "0 0 16px hsl(var(--primary) / 0.35)",
      }}
    />
  );
};

export default ScrollProgressBar;