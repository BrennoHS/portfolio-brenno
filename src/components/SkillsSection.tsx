import { motion, useMotionValue, useSpring } from "framer-motion";
import { Code2, Terminal, Network, Wrench, Zap } from "lucide-react";
import type { MouseEvent } from "react";

const skills = [
  { name: "React", icon: Code2 },
  { name: "JavaScript", icon: Terminal },
  { name: "Python", icon: Terminal },
  { name: "Redes", icon: Network },
  { name: "Suporte Técnico", icon: Wrench },
  { name: "Automação", icon: Zap },
];

const SkillCard = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const Icon = skill.icon;
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    rotateX.set(cy * -0.06);
    rotateY.set(cx * 0.06);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="group relative surface-card p-5 sm:p-8 text-center cursor-default"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(185 80% 55% / 0.06) 0%, transparent 70%)" }}
      />

      <motion.div
        whileHover={{ rotate: 12, y: -1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Icon className="relative mx-auto mb-3 sm:mb-4 w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      </motion.div>
      <p className="relative font-display text-sm sm:text-base font-medium text-foreground group-hover:text-gradient transition-all duration-300">
        {skill.name}
      </p>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-wrap min-h-screen flex items-center">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title"
        >
          <span className="text-gradient">Skills</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle mb-14 md:mb-16"
        >
          Tecnologias e competências que uso para construir interfaces robustas e resolver problemas com eficiência.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
