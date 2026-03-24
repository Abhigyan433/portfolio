import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const letterVariants = {
  initial: { y: '100%', opacity: 0 },
  animate: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 22,
      delay: i * 0.05 + 0.2, // staggered entrance
    },
  }),
  exit: (i) => ({
    y: '-120%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 22,
      delay: i * 0.03, // staggered exit
    },
  }),
};

export function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exit'
  const text = "PORTFOLIO";

  useEffect(() => {
    // Stay loading for 2.2 seconds to let the slot machine fully render, then switch to exit
    const t1 = setTimeout(() => setPhase('exit'), 2200);
    // Unmount completely from App after exit animation completes
    const t2 = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="preloader"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            // Delay backdrop fade out by 0.5s to let the letters run their 'exit' animations first
            exit: { opacity: 0, transition: { duration: 0.6, delay: 0.5, ease: [0.76, 0, 0.24, 1] } },
          }}
          className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Main Slot Machine Text */}
          <div className="overflow-hidden flex items-center justify-center px-4 w-full h-[20vw] sm:h-[15vw]">
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="font-display text-[15vw] sm:text-[12vw] leading-[0.85] tracking-[-0.02em] uppercase text-primary inline-block rainbow-text"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Underline separator */}
          <motion.div
            variants={{
              initial: { scaleX: 0 },
              animate: { scaleX: 1, transition: { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
              exit: { scaleX: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
            }}
            className="h-[2px] mt-6 origin-center rainbow-line w-[80vw] sm:w-[50vw] max-w-sm"
          />

          {/* Subtitle */}
          <motion.p
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 0.4, y: 0, transition: { duration: 0.6, delay: 0.8 } },
              exit: { opacity: 0, y: -10, transition: { duration: 0.4 } },
            }}
            className="absolute bottom-12 text-[0.65rem] tracking-[0.4em] uppercase text-primary-muted font-sans"
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
