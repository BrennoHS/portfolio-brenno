import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

const links = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/brenn0henrique/" },
  { icon: Github, label: "GitHub", href: "https://github.com/BrennoHS/portfolio-brenno" },
  { icon: Mail, label: "Email", href: "mailto:brenno-vivas@hotmail.com.br" },
];

const ContactSection = () => {
  return (
    <section id="contato" className="relative overflow-hidden min-h-[100svh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-2xl mx-auto text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title mb-6"
        >
          Vamos <span className="text-gradient">conversar</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground mb-8 text-base sm:text-lg"
        >
          Vamos construir algo incrível juntos.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          href="mailto:brenno-vivas@hotmail.com.br"
          className="focus-ring inline-flex items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 text-sm sm:text-base font-medium text-primary-foreground shadow-[0_0_28px_hsl(185_80%_55%_/_0.25)] hover:brightness-105 transition mb-10 sm:mb-12"
        >
          Enviar mensagem
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center flex-wrap gap-3 sm:gap-5"
        >
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + index * 0.1 }}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  boxShadow: "0 0 20px hsl(185 80% 55% / 0.18)",
                }}
                whileTap={{ scale: 0.95 }}
                className="focus-ring motion-smooth group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full surface-card cursor-pointer"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-100" />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 sm:mt-12 text-muted-foreground/40 text-xs font-mono"
        >
          © 2026 · Feito com dedicação e coca zero 🖤
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
