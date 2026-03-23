import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Journey } from './components/sections/Journey';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { TechStack } from './components/sections/TechStack';
import { Certificates } from './components/sections/Certificates';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-primary tracking-wide">
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ── Global Animated Gradient Mesh & Noise Overlay ── */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
        {/* Animated Orbs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-[0.07] blur-[100px]"
          style={{ 
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            animation: 'jFloat1 25s ease-in-out infinite alternate' 
          }} 
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-[0.05] blur-[120px]"
          style={{ 
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            animation: 'jFloat2 30s ease-in-out infinite alternate-reverse' 
          }} 
        />
        {/* Fractal Noise */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' 
          }}
        />
      </div>

      <CustomCursor />
      <Navbar />
      
      <main className={`transition-all duration-700 ${isLoading ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'} w-full`}>
        <Hero />
        <About />
        <Journey />
        <Projects />
        
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <TechStack />
          <Experience />
        </div>

        <Certificates />
      </main>

      <Footer />
    </div>
  );
}

export default App;
