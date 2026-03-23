import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  const MotionComponent = React.forwardRef(({ href, ...props }, ref) => {
    if (href) {
      return <motion.a href={href} ref={ref} {...props} />;
    }
    return <motion.button ref={ref} {...props} />;
  });

  return (
    <MotionComponent
      href={props.href}
      target={props.target}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={props.onClick}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
