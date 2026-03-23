import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';

export function Summary() {
  return (
    <section id="summary" className="py-20 relative">
      <SectionHeader title="Overview" subtitle="Executive Summary" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-surface/50 backdrop-blur-xl border border-border/50 p-10 md:p-16 rounded-[3rem] relative overflow-hidden group"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:translate-x-12 group-hover:translate-y-12" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl lg:text-4xl font-display font-medium leading-tight text-white tracking-tight">
              Bridging the gap between <br className="hidden md:block"/>
              <span className="text-primary italic">robust engineering</span> and 
              <span className="text-primary"> data-driven</span> decision making.
            </h3>
            <p className="text-lg text-primary-muted leading-relaxed max-w-2xl mx-auto">
              With a foundation in Computer Science and a focus on AI/ML, 
              I specialize in creating software that doesn't just work—it makes a difference. 
              My journey is driven by a curiosity for how things work and a passion for 
              how they can be made better for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 w-full pt-12 border-t border-border/50">
            <div className="text-center space-y-2">
              <span className="block text-primary text-2xl font-bold font-display tracking-tight">Java & JS</span>
              <span className="text-[10px] text-primary-muted uppercase font-black tracking-widest block">Core Languages</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-primary text-2xl font-bold font-display tracking-tight">AI/ML</span>
              <span className="text-[10px] text-primary-muted uppercase font-black tracking-widest block">Interest</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-primary text-2xl font-bold font-display tracking-tight">UX-First</span>
              <span className="text-[10px] text-primary-muted uppercase font-black tracking-widest block">Design Philosophy</span>
            </div>
            <div className="text-center space-y-2">
              <span className="block text-primary text-2xl font-bold font-display tracking-tight">100+ Solved</span>
              <span className="text-[10px] text-primary-muted uppercase font-black tracking-widest block">Coding Challenges</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
