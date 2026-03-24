import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

/* ── Credential Card with rainbow mesh ── */
function CredentialCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
      className="relative group"
    >
      <div className="relative rounded-3xl overflow-hidden cursor-pointer">
        {/* Animated rainbow border */}
        <div
          className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rainbow-border-glow"
        />

        {/* Card body */}
        <div className="relative rounded-3xl bg-surface/40 backdrop-blur-xl border border-white/[0.06] overflow-hidden p-8 md:p-10 min-h-[200px] flex flex-col justify-between transition-all duration-500 group-hover:bg-surface/60">

          {/* Rainbow mesh hover background */}
          <div className="absolute inset-0 rainbow-mesh-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full gap-5">
            {/* Organization */}
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-muted">
              {cert.organization}
            </span>

            {/* Title */}
            <h4 className="text-lg md:text-xl font-display uppercase tracking-tight text-primary leading-tight group-hover:rainbow-text transition-colors duration-300">
              {cert.title}
            </h4>

            {/* Period */}
            <div className="mt-auto">
              <span className="text-[10px] font-mono text-primary-muted/60 uppercase tracking-widest">{cert.period}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Certificates() {
  const certs = portfolioData.certificates;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const heading = "CREDENTIALS";

  return (
    <section
      ref={sectionRef}
      className="relative py-28 w-full overflow-hidden"
    >
      {/* ── Animated background blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]"
            style={{ animation: 'jFloat1 20s ease-in-out infinite' }}
          />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]"
            style={{ animation: 'jFloat2 25s ease-in-out infinite' }}
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Heading — unified with rest of site ── */}
        <div className="mb-16">
          <SectionHeader title="Credentials" />
        </div>

        {/* ── Cards Grid (2 columns for bigger cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {certs.map((cert, i) => (
            <CredentialCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
