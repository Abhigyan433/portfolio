import { motion } from 'motion/react';

export function SectionHeader({ title }) {
  return (
    <div className="mb-10 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary"
      >
        {title}
      </motion.h2>
    </div>
  );
}
