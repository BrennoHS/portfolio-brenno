import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    period: "YellowIpe (Clever Advertising) 2025 — Atual",
    title: "Analista de AdTech e Suporte",
    description: "Análise de HTML/CSS/JavaScript para garantir a entrega correta de anúncios, monitoramento de métricas no Kibana (impressões, cliques e revenue) e atuação com N2 na resolução de incidentes complexos. Correção de scripts/formatação e gestão de SLA (4h padrão e 2h premium) com conformidade acima de 95%.",
  },
  {
    period: "Stefanini Brasil (Marelli) | 2023 — 2025",
    title: "Analista de Suporte de TI",
    description: "Suporte de primeiro nível para desktops, notebooks, workstations, impressoras térmicas e coletores de dados, com mais de 250 incidentes/mês e 90% de resolução no primeiro contato. Gestão de chamados no ServiceNow (95% de SLA), administração de Active Directory e suporte à infraestrutura de redes e backup.",
  },
  {
    period: "Quartel da Informática | 2022 — 2023",
    title: "Técnico de TI",
    description: "Diagnóstico e reparo de hardware e periféricos (100 casos/mês com 95% de sucesso), instalação e atualização de sistemas e softwares, além de suporte presencial e remoto. Configuração e manutenção de redes LAN (roteadores, switches e firewalls) e gestão de backup/recuperação de dados.",
  },
];

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`relative mb-16 md:w-1/2 pl-12 md:pl-0 ${
        isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
      }`}
    >
      {/* Dot with pulse */}
      <div className="absolute left-3 md:left-auto top-1 md:top-1"
        style={isLeft ? { right: "-6.5px" } : { left: "-6.5px" }}
      >
        <div className="w-3 h-3 rounded-full bg-primary glow" />
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="surface-card motion-smooth rounded-xl p-5 sm:p-6 cursor-default"
      >
        <p className="font-mono text-primary text-xs tracking-wider mb-2">{item.period}</p>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experiencia" ref={sectionRef} className="section-wrap">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title"
        >
          Experiência <span className="text-gradient">Profissional</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle mb-14 md:mb-16"
        >
          Evolução contínua em suporte, automação e entrega de soluções com impacto direto no negócio.
        </motion.p>

        <div className="relative">
          {/* Static line (background) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {/* Animated line (foreground) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-px bg-primary/50"
          />

          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
