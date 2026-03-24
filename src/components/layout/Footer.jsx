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

      {/* ─── MASSIVE TYPOGRAPHY ─── */}
      <div className="w-full px-4 pt-28 pb-8 overflow-hidden">
        <motion.h2
          style={{ y: bigTextY, opacity: bigTextOpacity, scale: bigTextScale }}
          className="font-display text-[18vw] md:text-[15vw] uppercase leading-[0.85] tracking-tighter text-primary/[0.06] text-center whitespace-nowrap select-none pointer-events-none"
        >
          Let's Talk
        </motion.h2>
      </div>

      {/* ─── CONTACT CONTENT (full width) ─── */}
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
                  className="w-11 h-11 border border-border hover:bg-primary hover:text-background hover:border-primary rounded-xl flex items-center justify-center transition-all duration-300 text-primary-muted"
                >
                  {s.icon}
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
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/50 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your message..."
                className="w-full bg-transparent border-b border-border px-1 py-3 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/50 transition-all resize-none"
              ></textarea>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-background rounded-lg text-xs font-bold uppercase tracking-widest transition-all mt-2"
              >
                <Send size={13} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-muted">
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
