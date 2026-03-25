import { motion } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

export function About() {
  const { aboutParagraphs, stats, location } = portfolioData.personalDetails;

  return (
    <section id="about" className="py-24 w-full relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionHeader title="About" />
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mt-12">
          
          {/* ── Main Bio Card ── */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-all duration-500 backdrop-blur-xl border border-white/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group min-h-[280px]"
          >
            {/* Rainbow mesh hover glow */}
            <div className="absolute inset-0 rainbow-mesh-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-primary mb-6 relative z-10">
              Who I Am
            </h3>
            <div className="space-y-4 relative z-10">
              {aboutParagraphs.map((para, i) => (
                <p key={i} className="text-primary-muted text-sm md:text-base leading-relaxed max-w-xl">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* ── Location Card ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-all duration-500 backdrop-blur-xl border border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[280px]"
          >
            <div className="absolute inset-0 rainbow-mesh-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-muted font-bold mb-2 relative z-10">Based In</p>
            <p className="text-3xl md:text-4xl font-display text-primary relative z-10">{location}</p>
          </motion.div>

          {/* ── Stats Row ── */}
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="md:col-span-4 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-all duration-500 backdrop-blur-xl border border-white/5 p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[180px]"
            >
              <div className="absolute inset-0 rainbow-mesh-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h4 className="font-display text-4xl md:text-5xl text-primary mb-2 relative z-10 group-hover:rainbow-text transition-all">{stat.value}</h4>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary-muted relative z-10">{stat.label}</p>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
