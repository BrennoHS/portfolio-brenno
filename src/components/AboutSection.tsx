import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import vayneImg from "@/assets/vayne-character.png";
import athleteImg from "@/assets/athlete-training.png";

interface ParallaxItemProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  rotate?: number;
}

const ParallaxItem = ({ children, offset = 50, className = "", rotate = 0 }: ParallaxItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateVal = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        rotate: rotateVal,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="sobre" ref={sectionRef} className="section-wrap overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-primary/3 blur-[105px] pointer-events-none"
      />

      <div className="section-container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title"
        >
          Sobre <span className="text-gradient">Mim</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle mb-16 md:mb-20"
        >
          Minha base em suporte técnico, operação e desenvolvimento me permite construir soluções digitais com foco real em desempenho, estabilidade e experiência.
        </motion.p>

        <div className="relative space-y-20 md:space-y-28">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <ParallaxItem offset={60} rotate={1} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.015, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="surface-card p-8 cursor-default"
              >
                <p className="font-mono text-primary text-sm mb-2">01</p>
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">Apaixonado por tecnologia</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sempre fui movido por entender sistemas de ponta a ponta. Hoje aplico essa curiosidade para criar soluções claras, resolver problemas e transformar necessidades do time em entregas práticas.
                </p>
              </motion.div>
            </ParallaxItem>
            <ParallaxItem offset={100} rotate={-3} className="flex-1 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-primary blur-[60px] rounded-full"
                />
                <img src={vayneImg} alt="Gaming" className="relative w-48 md:w-64 rounded-lg drop-shadow-2xl" />
              </motion.div>
            </ParallaxItem>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <ParallaxItem offset={80} rotate={-1} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.015, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="surface-card p-8 cursor-default"
              >
                <p className="font-mono text-primary text-sm mb-2">02</p>
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">Entusiasta de jogos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  O universo dos jogos reforçou meu raciocínio estratégico e tomada de decisão sob pressão — competências que levo para projetos com prazos curtos, incidentes e priorização constante.
                </p>
              </motion.div>
            </ParallaxItem>
            <ParallaxItem offset={40} rotate={2} className="flex-1 text-center">
              <motion.p
                whileHover={{ scale: 1.05, textShadow: "0 0 28px hsl(185 80% 55% / 0.2)" }}
                className="font-display text-5xl md:text-6xl font-bold text-foreground/8 cursor-default select-none"
              >
                GG WP
              </motion.p>
            </ParallaxItem>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <ParallaxItem offset={70} rotate={1} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.015, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="surface-card p-8 cursor-default"
              >
                <p className="font-mono text-primary text-sm mb-2">03</p>
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">Disciplina e foco</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A rotina de treino me ensinou consistência, evolução incremental e foco em processo. No desenvolvimento, isso se traduz em melhoria contínua e qualidade de entrega.
                </p>
              </motion.div>
            </ParallaxItem>
            <ParallaxItem offset={90} rotate={-2} className="flex-1 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0 bg-primary blur-[60px] rounded-full"
                />
                <img src={athleteImg} alt="Academia" className="relative w-48 md:w-64 rounded-lg drop-shadow-2xl" />
              </motion.div>
            </ParallaxItem>
          </div>

          {/* Row 4 */}
          <ParallaxItem offset={50} className="text-center">
            <motion.div
              whileHover={{ scale: 1.015, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="surface-card p-8 max-w-2xl mx-auto cursor-default"
            >
              <p className="font-mono text-primary text-sm mb-2">04</p>
              <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">Resolução de problemas é meu forte</h3>
              <p className="text-muted-foreground leading-relaxed">
                Com 4 anos atuando em incidentes e suporte de TI, desenvolvi uma abordagem analítica para diagnosticar causas raiz, agir rápido e manter ambientes estáveis.
              </p>
            </motion.div>
          </ParallaxItem>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
