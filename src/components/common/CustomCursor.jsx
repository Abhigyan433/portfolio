import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the cursor
  const springX = useSpring(cursorX, { stiffness: 600, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Only show on devices with a pointing device (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Hover effect for interactive elements (computed on mouse move/over)
    const updateHoverState = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', updateHoverState);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center drop-shadow-md"
        style={{
          x: springX,
          y: springY,
          // Center the cursor to the mouse point
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* The grey circle from the user's image */}
        <motion.div
          animate={{
            width: isHovering ? 48 : 24,
            height: isHovering ? 48 : 24,
            backgroundColor: isHovering ? 'rgba(200, 200, 200, 1)' : 'rgba(180, 180, 180, 0.8)',
            borderWidth: isHovering ? 0 : 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.6,
          }}
          className="rounded-full flex items-center justify-center border-zinc-700"
          style={{ willChange: 'width, height' }}
        >
          {/* Optional: Add a small inner dot when not hovering for precision */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovering ? 0 : 1 }}
            className="w-1 h-1 bg-zinc-800 rounded-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
