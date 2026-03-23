import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink, Award } from 'lucide-react';

export function Certifications() {
  const { certificates } = portfolioData;

  return (
    <section id="certifications" className="py-20">
      <SectionHeader title="Credentials" subtitle="Certificates & Achievements" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Left: Certifications */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-primary-muted uppercase tracking-[0.3em] mb-8">Professional Certificates</h3>
          <div className="grid grid-cols-1 gap-4">
            {certificates.map((cert, index) => (
              <motion.a
                key={cert.title + index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center justify-between p-6 bg-surface/50 border border-border/50 hover:border-primary/30 rounded-3xl transition-all hover:bg-surface-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Award className="text-primary-muted group-hover:text-primary" size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-base group-hover:text-primary transition-colors">{cert.title}</h4>
                    <p className="text-primary-muted text-xs font-medium">{cert.organization} • {cert.period}</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-primary-muted" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Achievements */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Notable Milestones</h3>
          <div className="grid grid-cols-1 gap-4">
            {portfolioData.achievements.map((ach, index) => (
              <motion.div
                key={ach.title + index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col p-8 bg-surface/50 border border-border/50 hover:border-blue-500/30 rounded-3xl transition-all hover:bg-surface-hover relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-500/10 transition-colors" />
                 <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {ach.title}
                      </h4>
                      <span className="text-xs font-mono text-primary-muted bg-background/80 px-3 py-1 rounded-full border border-border">
                        {ach.period}
                      </span>
                    </div>
                    <p className="text-blue-400 text-sm font-black uppercase tracking-widest opacity-80 decoration-2">
                       {ach.platform}
                    </p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
