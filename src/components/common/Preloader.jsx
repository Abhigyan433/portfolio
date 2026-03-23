import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const WRITE_DURATION = 2.0; // seconds for the ink-draw reveal of first name

export function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('writing'); // 'writing' | 'done' | 'exit'
  const [fontReady, setFontReady] = useState(false);

  // Wait for Great Vibes to load before starting the clip animation
  useEffect(() => {
    document.fonts.ready.then(() => setFontReady(true));
  }, []);

  useEffect(() => {
    if (!fontReady) return;
    const t1 = setTimeout(() => setPhase('done'), WRITE_DURATION * 1000 + 300);
    const t2 = setTimeout(() => setPhase('exit'), WRITE_DURATION * 1000 + 1200);
    const t3 = setTimeout(() => onComplete(),     WRITE_DURATION * 1000 + 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [fontReady, onComplete]);

  const ease = [0.25, 0.46, 0.45, 0.94];

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >

          {/* ── Corner frame lines ── */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => {
            const isRight  = pos.includes('right');
            const isBottom = pos.includes('bottom');
            return (
              <motion.div key={i} className={`absolute ${pos}`}>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={phase === 'done' ? { scaleX: 1, opacity: 0.2 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.4, ease }}
                  style={{ transformOrigin: isRight ? 'right' : 'left' }}
                  className="w-7 h-px bg-primary-muted"
                />
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={phase === 'done' ? { scaleY: 1, opacity: 0.2 } : {}}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.4, ease }}
                  style={{ transformOrigin: isBottom ? 'bottom' : 'top' }}
                  className="w-px h-7 bg-primary-muted"
                />
              </motion.div>
            );
          })}

          {/* ── Main name block ── */}
          <div className="relative flex flex-col items-center gap-0">

            {/* ── "Abhigyan" — cursive signature style, ink-draw reveal ── */}
            <div className="relative">
              {fontReady ? (
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: WRITE_DURATION, ease }}
                  className="font-signature text-primary select-none whitespace-nowrap"
                  style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', lineHeight: 1.2 }}
                >
                  Abhigyan
                </motion.div>
              ) : (
                <div
                  className="font-signature text-transparent select-none whitespace-nowrap"
                  style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', lineHeight: 1.2 }}
                >
                  Abhigyan
                </div>
              )}

              {/* Ink cursor dot — moves with the writing tip */}
              {phase === 'writing' && fontReady && (
                <motion.div
                  initial={{ left: '2%', opacity: 1 }}
                  animate={{ left: '100%', opacity: 0 }}
                  transition={{ duration: WRITE_DURATION, ease }}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_3px_var(--primary)]"
                  style={{ position: 'absolute' }}
                />
              )}
            </div>

            {/* ── Divider line that draws AFTER "Abhigyan" finishes ── */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.15 }}
              transition={{ delay: WRITE_DURATION, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left', width: '100%' }}
              className="h-px bg-primary"
            />

            {/* ── "DAS" — bold Anton display font, slides up after signature ── */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  delay: WRITE_DURATION + 0.1,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display uppercase text-primary-muted tracking-[0.5em] select-none"
                style={{ fontSize: 'clamp(1rem, 3.5vw, 2.2rem)', paddingLeft: '0.5em' }}
              >
                DAS
              </motion.div>
            </div>

            {/* ── Shimmer sweep when done ── */}
            {phase === 'done' && (
              <motion.div
                initial={{ x: '-115%' }}
                animate={{ x: '115%' }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(128,128,128,0.25) 50%, transparent 70%)',
                }}
              />
            )}
          </div>

          {/* ── Bottom label ── */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: WRITE_DURATION + 0.25, duration: 0.7 }}
            className="absolute bottom-10 text-[0.62rem] tracking-[0.45em] uppercase text-primary-muted font-sans"
          >
            Portfolio &nbsp;·&nbsp; Developer
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
