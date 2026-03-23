import { motion } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Sparkles, MapPin, Code2, Rocket, Trophy } from 'lucide-react';

export function About() {
  const { aboutParagraphs, stats, location } = portfolioData.personalDetails;

  const statIcons = [
    <Code2 size={32} className="text-blue-400 mb-4" />,
    <Rocket size={32} className="text-purple-400 mb-4" />,
    <Trophy size={32} className="text-amber-400 mb-4" />
  ];

  return (
    <section id="about" className="py-24 w-full relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <SectionHeader title="About" />
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-12">
          
          {/* ── Main Bio Card ── */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-colors duration-500 backdrop-blur-xl border border-white/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group min-h-[300px]"
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <Sparkles className="absolute top-8 right-8 text-primary/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" size={80} />
            
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-primary mb-6 relative z-10">
              Who I Am
            </h3>
            <p className="text-primary-muted text-sm md:text-base leading-relaxed max-w-xl relative z-10">
              {aboutParagraphs[0]}
            </p>
          </motion.div>

          {/* ── Right Column (Location + Stat 0) ── */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            
            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-colors duration-500 backdrop-blur-xl border border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[180px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <MapPin size={32} className="text-primary-muted mb-3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-blue-400" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-muted font-bold mb-1">Based In</p>
              <p className="text-lg font-display text-primary">{location}</p>
            </motion.div>

            {/* Stat 0 */}
            {stats[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-colors duration-500 backdrop-blur-xl border border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[180px]"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                 {statIcons[0]}
                 <h4 className="font-display text-4xl text-primary mb-1 relative z-10">{stats[0].value}</h4>
                 <p className="text-[9px] uppercase tracking-[0.15em] text-primary-muted text-center relative z-10">{stats[0].label}</p>
              </motion.div>
            )}
          </div>

          {/* ── Bottom Row (Stat 1 + Stat 2) ── */}
          {stats.slice(1).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="md:col-span-6 rounded-3xl bg-surface/40 hover:bg-surface/60 transition-colors duration-500 backdrop-blur-xl border border-white/5 p-8 md:p-10 flex flex-col sm:flex-row items-center sm:justify-start justify-center text-center sm:text-left gap-6 relative overflow-hidden group min-h-[160px]"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                 {statIcons[i + 1]}
               </div>
               <div>
                 <h4 className="font-display text-4xl md:text-5xl text-primary mb-1">{stat.value}</h4>
                 <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary-muted">{stat.label}</p>
               </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
