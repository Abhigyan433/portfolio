import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Brain, Code2, Lightbulb, Wrench, Heart, X, Sparkles, Database, BarChart3 } from 'lucide-react';

/* ── Journey node data ── */
const journeyNodes = [
  {
    id: 'who',
    label: 'WHO',
    sketch: 'about me',
    icon: <Code2 size={22} />,
    color: '#a855f7',
    title: 'Who I Am',
    content: 'A software developer and data enthusiast who thrives on creative problem-solving. Proficient in C++, Java, Python, and JavaScript with strong leadership and teamwork skills.',
    tags: ['C++', 'Java', 'Python', 'JavaScript', 'Leadership', 'Problem Solver'],
  },
  {
    id: 'what',
    label: 'WHAT',
    sketch: 'projects',
    icon: <Sparkles size={22} />,
    color: '#3b82f6',
    title: 'What I Build',
    content: 'From interactive dashboards to ML-powered browser extensions, I build tools that solve real problems. My projects span full-stack web apps, data analysis pipelines, and AI-driven solutions.',
    tags: ['Dashboards', 'ML Extensions', 'Data Pipelines', 'Web Apps'],
  },
  {
    id: 'ai',
    label: 'AI',
    sketch: 'intelligence',
    icon: <Brain size={22} />,
    color: '#10b981',
    title: 'How I Use AI',
    content: 'I use AI tools to speed up development, explore patterns, and build smarter solutions. I work with Python (NumPy, Pandas, Scikit-learn), data visualization, and machine learning concepts to solve real-world problems efficiently.',
    tags: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Machine Learning'],
    featured: true,
    extraIcons: [
      <Brain key="b" size={16} className="text-emerald-400" />,
      <Database key="d" size={16} className="text-emerald-400" />,
      <BarChart3 key="c" size={16} className="text-emerald-400" />,
    ],
  },
  {
    id: 'how',
    label: 'HOW',
    sketch: 'process',
    icon: <Wrench size={22} />,
    color: '#06b6d4',
    title: 'My Toolkit',
    content: 'I leverage modern tools: VS Code for development, Figma for design, Power BI & Tableau for data visualization, and GitHub for version control. Every tool in my workflow is chosen for speed and quality.',
    tags: ['VS Code', 'Figma', 'Power BI', 'Tableau', 'GitHub', 'DBMS'],
  },
  {
    id: 'why',
    label: 'WHY',
    sketch: 'motivation',
    icon: <Heart size={22} />,
    color: '#ef4444',
    title: 'Why I Code',
    content: 'Passion for solving real-world problems using technology and AI. Every project is driven by curiosity and the desire to make complex things simple and accessible.',
    tags: ['Problem Solving', 'Innovation', 'Impact', 'Curiosity'],
  },
];

/* ── Single Journey Node ── */
function JourneyNode({ node, index, total, activeId, handleSetHover }) {
  const isActive = activeId === node.id;
  const nodeRef = useRef(null);
  const glowSpring = useSpring(0, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 200, damping: 18 }}
      className="relative flex flex-col items-center gap-3 z-10"
    >
      {/* Sketch-style label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.3 }}
        className="text-[10px] italic text-primary-muted/50 tracking-wide"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {node.sketch}
      </motion.span>

      {/* Glow ring */}
      <div className="relative">
        {/* Outer pulse ring for active */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 20px ${node.color}40, 0 0 40px ${node.color}20`, background: `${node.color}10` }}
          />
        )}

        {/* The interactable node */}
        <motion.button
          onMouseEnter={() => { glowSpring.set(1); handleSetHover(node.id); }}
          onMouseLeave={() => { glowSpring.set(0); handleSetHover(null); }}
          onTouchStart={() => handleSetHover(isActive ? null : node.id)} // For mobile
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer border-2 ${
            isActive
              ? 'bg-zinc-900 text-white'
              : 'bg-surface text-primary-muted hover:text-primary border-border hover:border-primary/30'
          }`}
          style={{
            borderColor: isActive ? node.color : undefined,
            boxShadow: isActive ? `0 0 25px ${node.color}30, 0 0 50px ${node.color}10` : 'none',
          }}
        >
          {node.icon}
        </motion.button>
      </div>

      {/* Label */}
      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
        isActive ? 'text-primary' : 'text-primary-muted/60'
      }`}>
        {node.label}
      </span>

      {/* Floating Card Popup above the node */}
      <AnimatePresence>
        {isActive && (
          <JourneyCard node={node} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Floating Content Card ── */
function JourneyCard({ node }) {
  if (!node) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -25, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 20, rotateX: 15, scale: 0.95, filter: 'blur(8px)' }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 24, 
        mass: 0.8 
      }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-[280px] md:w-[350px] z-[100] pointer-events-none"
      style={{ perspective: 1200, transformOrigin: 'bottom center' }}
    >
      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-60"
          style={{
            background: `conic-gradient(from 0deg, ${node.color}, transparent 40%, ${node.color})`,
            animation: 'spin 4s linear infinite',
          }}
        />

        <div className="relative rounded-2xl bg-zinc-950/80 backdrop-blur-xl p-6 md:p-8 border border-white/[0.05]">
          {/* Noise */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-2xl"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />

          {/* AI featured glow */}
          {node.featured && (
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
              background: `radial-gradient(ellipse at center, ${node.color}08 0%, transparent 70%)`,
            }} />
          )}

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: `${node.color}20`, color: node.color }}>
                {node.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">{node.title}</h4>
                {node.featured && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {node.extraIcons.map((icon, i) => (
                      <span key={i}>{icon}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-sm text-zinc-400 leading-relaxed mb-5"
            >
              {node.content}
            </motion.p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {node.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.15 + i * 0.04, 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 20 
                  }}
                  className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border text-zinc-400"
                  style={{ borderColor: `${node.color}30`, background: `${node.color}08` }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Journey Section ── */
export function Journey() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleSetHover = (id) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (id === null) {
      // Add a small delay before hiding to prevent flicker
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveId(null);
      }, 150);
    } else {
      setActiveId(id);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'center center'],
  });

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  const activeNode = journeyNodes.find(n => n.id === activeId);

  /* Responsive: curved path for desktop, straight for mobile */
  const desktopPath = "M 50 200 C 200 50, 350 350, 500 200 C 650 50, 800 350, 950 200";
  const mobilePath = "M 50 50 L 50 500"; // vertical on mobile

  return (
    <section
      ref={sectionRef}
      className="relative py-28 w-full overflow-hidden"
    >
      {/* Background parallax blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[100px]" style={{ animation: 'jFloat1 22s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-cyan-500/[0.02] blur-[100px]" style={{ animation: 'jFloat2 28s ease-in-out infinite' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary">
            The Journey
          </h2>
          <p className="text-sm text-primary-muted mt-3 max-w-md">
            Tap a node to explore each chapter of my story.
          </p>
        </motion.div>

        {/* ── Desktop: Curved SVG path + nodes ── */}
        <div className="hidden md:block relative" style={{ height: '360px' }}>
          {/* SVG curved path */}
          <svg
            ref={pathRef}
            viewBox="0 0 1000 400"
            fill="none"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Background path (ghost) */}
            <motion.path
              d={desktopPath}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="text-border"
              fill="none"
            />
            {/* Animated drawn path */}
            <motion.path
              d={desktopPath}
              stroke="url(#journeyGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="journeyGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes placed along the path */}
          <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12">
            {journeyNodes.map((node, i) => (
              <JourneyNode
                key={node.id}
                node={node}
                index={i}
                total={journeyNodes.length}
                activeId={activeId}
                handleSetHover={handleSetHover}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile: Vertical layout ── */}
        <div className="md:hidden flex flex-col items-center gap-8 relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border" />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px origin-top"
            style={{
              scaleY: pathLength,
              background: 'linear-gradient(to bottom, #a855f7, #3b82f6, #10b981, #06b6d4, #ef4444)',
              height: '100%',
            }}
          />
          {journeyNodes.map((node, i) => (
            <JourneyNode
              key={node.id}
              node={node}
              index={i}
              total={journeyNodes.length}
              activeId={activeId}
              handleSetHover={handleSetHover}
            />
          ))}
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes jFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes jFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, 30px); }
        }
      `}</style>
    </section>
  );
}
