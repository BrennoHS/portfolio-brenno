import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { MouseEvent } from "react";

const projects = [
  {
    title: "Automação de Chamados",
    description: "Software com interface simples para o usuario resolver problemas recorrentes com um clique (ex.: \"resolver erro Y\", \"instalar impressoras\"), reduzindo o volume de tickets.",
    tags: ["PowerShell", "Python", "Automacao"],
    github: "https://github.com/BrennoHS/",
  },
  {
    title: "Dashboard de Monitoramento",
    description: "Dashboard leve que centraliza status de servicos e disponibilidade em tempo real, com filtros rapidos e alertas visuais para priorizar incidentes.",
    tags: ["React", "API REST"],
    github: "https://github.com/BrennoHS/",
  },
  {
    title: "Web Scraper OLX",
    description: "Web scraper da OLX que varre anuncios recentes e identifica oportunidades com melhor preco ao longo do dia. Integra notificacoes com Telegram e SMTP para alertas em tempo real.",
    tags: ["Python", "Web Scraper", "Telegram", "SMTP"],
    github: "https://github.com/BrennoHS/",
  },
];

const TiltCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-7, 7]), { stiffness: 300, damping: 30 });

  // Spotlight effect position
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
    spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative surface-card p-5 sm:p-6 cursor-default overflow-hidden min-h-[250px]"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) => `radial-gradient(circle at ${sx}% ${sy}%, hsl(185 80% 55% / 0.08) 0%, transparent 60%)`
          ),
        }}
      />

      <h3 className="relative font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="relative text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
      <div className="relative flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs text-primary/80 glass px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 2 }}
        className="focus-ring relative inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium rounded"
      >
        GitHub <ExternalLink className="w-3.5 h-3.5" />
      </motion.a>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projetos" className="section-wrap min-h-screen flex items-center">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title"
        >
          <span className="text-gradient">Projetos</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle mb-14 md:mb-16"
        >
          Alguns trabalhos com foco em automação, experiência do usuário e soluções práticas para problemas reais.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
