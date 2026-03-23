import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { portfolioData } from '../../data/portfolioData';

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
          className="text-primary-muted text-base max-w-xl leading-relaxed mb-10"
        >
          Currently open for new opportunities. Whether you have a specific inquiry or just want to connect, feel free to drop a message.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border p-5 rounded-xl flex items-start gap-4 transition-all hover:border-primary/20"
          >
            <Mail size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-xs font-bold mb-1 text-primary uppercase tracking-widest">Email</h4>
              <a href={`mailto:${email}`} className="text-primary-muted hover:text-primary transition-colors text-sm break-all">{email}</a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-surface border border-border p-5 rounded-xl flex items-start gap-4 transition-all hover:border-primary/20"
          >
            <MapPin size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-xs font-bold mb-1 text-primary uppercase tracking-widest">Location</h4>
              <span className="text-primary-muted text-sm">{location} (Remote Ready)</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface border border-border p-6 rounded-xl w-full"
        >
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary-muted">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-primary-muted/40 focus:outline-none focus:border-primary/40 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary-muted">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-primary-muted/40 focus:outline-none focus:border-primary/40 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-primary-muted">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-primary-muted/40 focus:outline-none focus:border-primary/40 transition-all resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary text-background rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
