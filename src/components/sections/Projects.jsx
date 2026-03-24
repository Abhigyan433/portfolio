import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Calendar, Wrench, ArrowRight, ArrowLeft, BarChart, Database, Brain, Search, Chrome, Bot } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

const getTagIcon = (tag) => {
  const devicons = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  };
  
  if (devicons[tag]) {
    return <img src={devicons[tag]} alt={tag} className="w-12 h-12 object-contain" />;
  }
  
  const lucideMap = {
    'Power BI': <BarChart size={40} className="text-yellow-500" />,
    'DAX': <Database size={40} className="text-blue-500" />,
    'Data Modelling': <Database size={40} className="text-zinc-400" />,
    'Data Visualization': <BarChart size={40} className="text-purple-500" />,
    'Scikit-learn': <Brain size={40} className="text-orange-500" />,
    'Machine Learning': <Bot size={40} className="text-emerald-500" />,
    'EDA': <Search size={40} className="text-sky-500" />,
    'NLP': <Brain size={40} className="text-indigo-400" />,
    'Chrome Extension APIs': <Chrome size={40} className="text-amber-500" />
  };
  
  return lucideMap[tag] || <Database size={40} className="text-zinc-500" />;
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="pt-32 pb-20 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary"
        >
          Projects
        </motion.h2>
      </div>

      {/* Full-width horizontal scroll row */}
      <div className="w-full overflow-x-auto no-scrollbar px-6 md:px-12">
        <div className="flex gap-16 md:gap-20 w-max pb-12 pt-10">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial="rest"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                rest: { opacity: 0, y: 40, filter: 'blur(6px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, delay: index * 0.12 } },
                hover: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              className="w-[320px] md:w-[400px] shrink-0 flex flex-col group cursor-pointer relative"
              onClick={() => setSelectedProject(project)}
            >
              {/* Macbook Frame & Stickers */}
              <div className="relative mx-auto w-full max-w-[90%]">
                
                {/* Tech Stack Sticker SVGs */}
                {project.tags.map((tag, i) => {
                  const positions = [
                    { top: '-8%', left: '-8%', rotate: -14 },
                    { bottom: '12%', right: '-10%', rotate: 15 },
                    { top: '35%', left: '-12%', rotate: -6 },
                    { top: '-12%', right: '8%', rotate: 8 },
                    { bottom: '-12%', left: '15%', rotate: 4 },
                    { bottom: '5%', right: '65%', rotate: -10 },
                  ];
                  const pos = positions[i % positions.length];
                  return (
                    <motion.div
                      key={tag}
                      variants={{
                        rest: { opacity: 0, scale: 0.2, y: 20, rotate: pos.rotate - 30 },
                        visible: { opacity: 0, scale: 0.2, y: 20, rotate: pos.rotate - 30 },
                        hover: { 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          rotate: pos.rotate,
                          transition: { type: 'spring', stiffness: 400, damping: 18, delay: i * 0.04 }
                        }
                      }}
                      whileHover={{ scale: 1.25, rotate: 0, zIndex: 30, transition: { duration: 0.15 } }}
                      className="absolute z-20 pointer-events-auto cursor-pointer"
                      style={{ 
                        top: pos.top, 
                        left: pos.left, 
                        right: pos.right, 
                        bottom: pos.bottom,
                        willChange: 'transform, opacity',
                      }}
                    >
                      {/* Static inner layer holds the expensive filter — never re-rendered during animation */}
                      <div
                        className="flex items-center justify-center"
                        style={{
                          filter: "drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white) drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white) drop-shadow(0 8px 12px rgba(0,0,0,0.4))"
                        }}
                      >
                        {getTagIcon(tag)}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Laptop Lid */}
                <div className="relative rounded-t-xl bg-zinc-800 p-1.5 md:p-2 border-t border-x border-zinc-700 shadow-2xl z-10 transition-colors duration-500 group-hover:bg-zinc-700">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-950"></div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Laptop Base */}
                <div className="relative h-3 md:h-4 bg-zinc-400 rounded-b-xl border border-zinc-300 w-[114%] -ml-[7%] shadow-[0_20px_40px_-5px_rgba(0,0,0,0.6)] flex justify-center items-start z-10 transition-colors duration-500 group-hover:bg-zinc-300">
                  <div className="w-1/5 h-1 md:h-1.5 bg-zinc-500 rounded-b-md" />
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-8 text-center px-4 flex-1 flex flex-col z-0">
                <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-normal text-primary mb-5 transition-colors group-hover:text-primary-muted">
                  {project.title}
                </h3>
                <div className="mt-auto flex justify-center">
                  <span className="relative inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary pb-1 group-hover:text-primary-muted transition-colors duration-300">
                    View Details 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    <span className="absolute left-0 bottom-0 w-full h-[2px] rainbow-line origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal — Compact with Back Button */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar with back button */}
              <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-muted hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </motion.button>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <X size={14} />
                </motion.button>
              </div>

              {/* Compact image */}
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 -mt-6 relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-2xl md:text-3xl uppercase tracking-tight text-primary mb-3"
                >
                  {selectedProject.title}
                </motion.h3>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-border text-primary-muted uppercase tracking-widest">
                    <Calendar size={10} /> {selectedProject.period}
                  </span>
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="text-primary-muted hover:text-primary transition-colors"><Github size={15} /></a>
                  {selectedProject.live !== '#' && (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="text-primary-muted hover:text-primary transition-colors"><ExternalLink size={15} /></a>
                  )}
                </div>

                {/* Bullets */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted mb-3">What I Did</h4>
                  <ul className="space-y-2.5">
                    {selectedProject.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="flex gap-3 text-xs text-primary-muted leading-relaxed"
                      >
                        <span className="shrink-0 w-1 h-1 rounded-full bg-primary/30 mt-1.5" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted mb-2 flex items-center gap-2">
                    <Wrench size={10} /> Tech Stack
                  </h4>
                  <p className="text-[11px] text-primary-muted font-mono leading-relaxed">{selectedProject.techStack}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest px-2 py-1 rounded-full font-bold border border-border text-primary-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
