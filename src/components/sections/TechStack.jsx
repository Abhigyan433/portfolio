import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';

const techIcons = [
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'Flask', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'NumPy', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Pandas', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'VS Code', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

export function TechStack() {
  const trackRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);
  const items = [...techIcons, ...techIcons];

  const handleMouseMove = useCallback((e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const getScale = useCallback((index) => {
    if (mouseX === null || !trackRef.current) return 1;
    const itemWidth = 88; // approx width of each item
    const itemCenter = index * itemWidth + itemWidth / 2;
    const scrollLeft = trackRef.current.scrollLeft || 0;
    const distance = Math.abs(mouseX + scrollLeft - itemCenter);
    const maxDist = 200;
    if (distance > maxDist) return 1;
    return 1 + 0.6 * (1 - distance / maxDist);
  }, [mouseX]);

  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <SectionHeader title="Stack" />
      </div>

      <div className="relative w-full">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex items-end gap-0 w-max py-6 hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {items.map((tech, i) => {
            const s = getScale(i);
            return (
              <div
                key={`${tech.name}-${i}`}
                className="flex flex-col items-center gap-2 shrink-0 transition-transform duration-150 ease-out origin-bottom"
                style={{
                  width: '88px',
                  transform: `scale(${s})`,
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center p-2.5 transition-all">
                  <img
                    src={tech.url}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] text-primary-muted font-medium tracking-wide whitespace-nowrap">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
