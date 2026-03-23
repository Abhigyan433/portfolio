import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { MagneticButton } from '../ui/MagneticButton';

export function Contact() {
  const { email, location } = portfolioData.personalDetails;

  return (
    <section id="contact" className="py-16 relative max-h-screen flex flex-col justify-center">
      <div className="relative z-10 w-full">
        <SectionHeader title="Contact" subtitle="Get in Touch" />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-primary-muted text-base max-w-xl leading-relaxed mb-16"
        >
          Currently open for new opportunities. Whether you have a specific inquiry or just want to connect, feel free to drop a message.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
          {/* Info Side */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                <Mail className="text-primary" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold mb-1 text-primary-muted uppercase tracking-[0.2em]">Email Me</h4>
                <a href={`mailto:${email}`} className="text-xl md:text-2xl font-display uppercase tracking-tight text-primary hover:text-blue-400 transition-colors break-all">
                  {email}
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold mb-1 text-primary-muted uppercase tracking-[0.2em]">Location</h4>
                <div className="text-xl md:text-2xl font-display uppercase tracking-tight text-primary">
                  {location}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-500 mt-2 block font-bold">Remote Ready</span>
              </div>
            </motion.div>
          </div>
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-surface/30 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-3xl w-full flex flex-col justify-center"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted ml-2 group-focus-within:text-primary transition-colors">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/40 focus:bg-background/80 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted ml-2 group-focus-within:text-primary transition-colors">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/40 focus:bg-background/80 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-muted ml-2 group-focus-within:text-primary transition-colors">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary placeholder:text-primary-muted/30 focus:outline-none focus:border-primary/40 focus:bg-background/80 transition-all resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              
              <div className="pt-4 flex justify-end">
                <MagneticButton className="px-10 py-4 bg-primary text-background rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
