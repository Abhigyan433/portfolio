import { motion } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, Calendar } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export function Experience() {
  const { education } = portfolioData;

  return (
    <section id="experience" className="py-12 relative w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionHeader title="Education" />
        
        <div className="flex flex-col gap-3">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex items-center justify-between gap-4 py-3 border-b border-border group cursor-default"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GraduationCap size={18} className="text-primary-muted shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-primary tracking-tight truncate">
                    {edu.degree}
                  </h4>
                  <p className="text-[11px] text-primary-muted">{edu.institution}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-primary-muted uppercase tracking-widest shrink-0 flex items-center gap-1.5">
                <Calendar size={10} /> {edu.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
