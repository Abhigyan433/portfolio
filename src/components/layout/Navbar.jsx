import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { ThemeToggle } from '../common/ThemeToggle';
import { FileText, X, Download } from 'lucide-react';
import { createPortal } from 'react-dom';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showResume, setShowResume] = useState(false);
  const { name } = portfolioData.personalDetails;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['about', 'projects', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl py-3' : 'py-6 bg-transparent'}`}
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-display text-lg uppercase tracking-tight text-primary"
          >
            {name.split(' ')[0]}
            <span className="text-primary-muted">.</span>
          </motion.a>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors relative ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary'
                      : 'text-primary-muted hover:text-primary'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            <motion.button
              onClick={() => setShowResume(true)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-muted hover:text-primary transition-colors"
            >
              <FileText size={14} /> Resume
            </motion.button>

            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Resume Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showResume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setShowResume(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h3 className="font-display text-xl uppercase tracking-tight text-primary">Resume</h3>
                  <motion.button
                    onClick={() => setShowResume(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary-muted hover:text-primary transition-all"
                  >
                    <X size={14} />
                  </motion.button>
                </div>

                {/* Preview */}
                <div className="flex-1 overflow-auto p-1">
                  <iframe
                    src="/ABHIGYANDAS.pdf#toolbar=0"
                    className="w-full h-[60vh] rounded-lg border-0"
                    title="Resume Preview"
                  />
                </div>

                {/* Download */}
                <div className="px-6 py-4 border-t border-border">
                  <motion.a
                    href="/ABHIGYANDAS.pdf"
                    download
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-background rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    <Download size={14} /> Download Resume
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
