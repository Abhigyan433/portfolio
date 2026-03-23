import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink } from 'lucide-react';

/* ── platform icons (inline SVG paths for perf) ── */
const platformIcons = {
  Forage: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  HackerRank: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-4h2v4zm4 0h-2v-6h2v6z"/>
    </svg>
  ),
  Udemy: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L1 7v2l11 5 11-5V7L12 2zm0 15L3 12.5V17c0 3 4 5 9 5s9-2 9-5v-4.5L12 17z"/>
    </svg>
  ),
  Coursera: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z"/>
    </svg>
  ),
};

/* ── 3D tilt card ── */
function CredentialCard({ cert, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showRipple, setShowRipple] = useState(null);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const glowOpacity = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -20);
    rotateY.set((x - 0.5) * 20);
    setTilt({ x: x * 100, y: y * 100 });
  }, [rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    scale.set(1.04);
    glowOpacity.set(1);
  }, [scale, glowOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowOpacity.set(0);
    setTilt({ x: 50, y: 50 });
  }, [rotateX, rotateY, scale, glowOpacity]);

  const handleClick = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setShowRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setShowRipple(null), 600);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
      className="relative group"
      style={{ perspective: '800px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden cursor-pointer will-change-transform"
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'conic-gradient(from 180deg, #a855f7, #3b82f6, #06b6d4, #10b981, #eab308, #ef4444, #a855f7)',
            animation: isHovered ? 'spin 3s linear infinite' : 'none',
          }}
        />

        {/* Card body */}
        <div className="relative rounded-2xl bg-zinc-950/70 backdrop-blur-xl p-5 h-full border border-white/[0.06] overflow-hidden">

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
          />

          {/* Cursor-following spotlight */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none"
            style={{
              opacity: glowOpacity,
              background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
              left: `${tilt.x}%`,
              top: `${tilt.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Light sweep */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)`,
              backgroundSize: '200% 100%',
              animation: isHovered ? 'sweep 1.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* Click ripple */}
          <AnimatePresence>
            {showRipple && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute w-16 h-16 rounded-full bg-white/10 pointer-events-none"
                style={{ left: showRipple.x - 32, top: showRipple.y - 32 }}
              />
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full gap-3" style={{ transform: 'translateZ(20px)' }}>
            {/* Top row: icon + badge */}
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                {platformIcons[cert.organization] || platformIcons.Coursera}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400/80">Verified</span>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-[13px] font-bold text-white/90 leading-tight tracking-tight line-clamp-2 group-hover:text-white transition-colors duration-300">
              {cert.title}
            </h4>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{cert.organization}</span>
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{cert.period}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Certificates() {
  const certs = portfolioData.certificates;
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

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
            style={{ animation: 'float1 20s ease-in-out infinite' }}
          />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]"
            style={{ animation: 'float2 25s ease-in-out infinite' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.02] blur-[150px]"
            style={{ animation: 'float3 30s ease-in-out infinite' }}
          />
        </motion.div>
      </div>

      {/* ── Global cursor spotlight ── */}
      <div
        className="fixed pointer-events-none z-[60] w-[300px] h-[300px] rounded-full mix-blend-screen opacity-[0.04] hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Heading with letter-by-letter reveal ── */}
        <div className="mb-16">
          <div className="flex flex-wrap">
            {heading.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="font-display text-5xl md:text-8xl uppercase tracking-tight text-primary inline-block"
                style={{ transformOrigin: 'bottom' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] mt-4 origin-left"
            style={{ background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4, transparent)' }}
          />
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certs.map((cert, i) => (
            <CredentialCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>

      {/* ── Keyframe animations (injected) ── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sweep {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.05); }
          66% { transform: translate(50px, -20px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </section>
  );
}
