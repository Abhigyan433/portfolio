import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, Send, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function Footer() {
  const { name, email, github, linkedin, location } = portfolioData.personalDetails;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const bigTextY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bigTextScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={sectionRef} id="contact" className="relative bg-background overflow-hidden">

      {/* ─── Rainbow Divider Line ─── */}
      <div className="w-full h-[2px] rainbow-line" />

      {/* ─── MASSIVE TYPOGRAPHY ─── */}
      <div className="w-full px-4 pt-28 pb-8 overflow-hidden">
        <motion.h2
          style={{ y: bigTextY, opacity: bigTextOpacity, scale: bigTextScale }}
          className="font-display text-[18vw] md:text-[15vw] uppercase leading-[0.85] tracking-tighter text-center whitespace-nowrap select-none pointer-events-none rainbow-text"
        >
          Let's Talk
        </motion.h2>
      </div>

      {/* ─── CONTACT CONTENT ─── */}
      <div className="w-full px-6 md:px-16 lg:px-24 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 lg:gap-24 mb-20">

          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-primary mb-6 leading-[0.9]">
              Get in<br />Touch
            </h3>
            <div className="h-[2px] w-20 rainbow-line mb-8" />
            <p className="text-primary-muted text-sm leading-relaxed mb-10 max-w-md">
              Open for new opportunities, freelance projects, and interesting conversations. Don't hesitate to reach out.
            </p>

            <div className="flex flex-col gap-3 text-sm mb-10">
              <motion.a
                href={`mailto:${email}`}
                className="text-primary-muted hover:text-primary transition-colors flex items-center gap-3 group"
                whileHover={{ x: 6 }}
              >
                <Mail size={16} className="group-hover:rotate-12 transition-transform" /> {email}
              </motion.a>
              <motion.span
                className="text-primary-muted flex items-center gap-3"
                whileHover={{ x: 6 }}
              >
                <MapPin size={16} /> {location}
              </motion.span>
            </div>

            <div className="flex gap-3">
              {[
                { href: github, icon: <Github size={18} />, ext: true },
                { href: linkedin, icon: <Linkedin size={18} />, ext: true },
                { href: `mailto:${email}`, icon: <Mail size={18} />, ext: false },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.ext ? "_blank" : undefined}
                  rel={s.ext ? "noreferrer" : undefined}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 text-primary-muted hover:text-primary overflow-hidden group"
                >
                  {/* Rainbow border on hover */}
                  <div className="absolute inset-0 rounded-xl border border-border group-hover:border-transparent transition-colors duration-300" />
                  <div className="absolute -inset-[1px] rounded-xl rainbow-border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-[1px] rounded-[10px] bg-background z-[1]" />
                  <span className="relative z-[2]">{s.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Compact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none transition-all"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] rainbow-line origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none transition-all"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] rainbow-line origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
              <div className="relative group">
                <textarea
                  rows="4"
                  placeholder="Your message..."
                  className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none transition-all resize-none"
                ></textarea>
                <div className="absolute bottom-0 left-0 w-full h-[2px] rainbow-line origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
              </div>
              
              {/* Rainbow-bordered submit button */}
              <div className="relative inline-flex mt-2 group">
                <div className="absolute -inset-[1px] rounded-xl rainbow-border-glow opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2 px-8 py-3 bg-background rounded-xl text-xs font-bold uppercase tracking-widest text-primary transition-all z-[1]"
                >
                  <Send size={13} /> Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="h-[1px] rainbow-line mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-muted">
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:text-primary hover:bg-surface transition-colors"
          >
            Back to top <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
