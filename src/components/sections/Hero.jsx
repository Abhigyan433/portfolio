import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';

const letterVariants = {
  initial: { y: '100%', opacity: 0 },
  animate: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 22,
      delay: i * 0.03,
    },
  }),
  exit: (i) => ({
    y: '-120%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 22,
      delay: i * 0.015,
    },
  }),
};

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const titles = ["FULL STACK DEV", "DATA ANALYST", "ABHIGYAN DAS"];
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = titles[textIndex];

  return (
    <section ref={sectionRef} id="home" className="relative pt-32 pb-12 w-full flex flex-col items-center overflow-hidden min-h-[85vh] justify-center">
      
      {/* Massive Typography — Slot Machine Letter Stagger */}
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="w-full px-4 text-center z-0 relative flex items-center justify-center overflow-hidden h-[18vw] sm:h-[15vw]"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={textIndex}
            className="font-display text-[15vw] leading-[0.85] tracking-[-0.02em] uppercase whitespace-nowrap flex rainbow-text"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentTitle.split('').map((char, i) => (
              <motion.span
                key={`${textIndex}-${i}`}
                custom={i}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      {/* Main Avatar Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        style={{ y: avatarY }}
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] aspect-[3/4] z-10 pointer-events-none"
      >
        <img src="avatar.png" alt="Avatar" className="w-full h-full object-contain" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </motion.div>
      
    </section>
  );
}
