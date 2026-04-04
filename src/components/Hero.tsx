'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background text-foreground" id="about">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-card border border-card-border text-sm font-medium mb-6 backdrop-blur-sm">
            Full Stack Developer
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Hi, I'm <br />
            <span className="text-yellow-400">Aditi</span>{' '}
            <span className="text-coral">Dosi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-lg leading-relaxed">
            Full Stack Developer at <strong className="text-foreground">Deutsche Bank</strong>, building resilient
            financial systems with Java, React &amp; TypeScript. Passionate about clean architecture,
            developer tooling, and emerging tech like Agentic AI &amp; Blockchain.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/#contact"
              className="bg-foreground text-background hover:opacity-90 px-8 py-3 rounded-full font-bold transition-all shadow-xl shadow-foreground/5"
            >
              Get In Touch
            </Link>
            <a
              href="/AditiDosi_Resume2025.pdf"
              download
              className="bg-card text-foreground border border-card-border px-8 py-3 rounded-full font-bold transition-all backdrop-blur-sm hover:bg-card/80"
            >
              Download Resume ↓
            </a>
            <a
              href="https://github.com/adosi12"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card text-foreground border border-card-border px-8 py-3 rounded-full font-bold transition-all backdrop-blur-sm hover:bg-card/80"
            >
              GitHub →
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-muted mb-1">Location</span>
              <span className="font-semibold text-foreground">📍 Pune, India</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-muted mb-1">Company</span>
              <span className="font-semibold text-foreground">🏦 Deutsche Bank</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-muted mb-1">Availability</span>
              <span className="font-semibold text-foreground">⚡ Open to Connect</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-card-border shadow-2xl max-w-[450px] mx-auto">
            <img
              src="/assets/images/AditiProfile.jpg"
              alt="Aditi Dosi"
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-6 left-6 bg-card/60 backdrop-blur-md border border-card-border p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-foreground">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="text-[10px] uppercase text-muted tracking-wider">Graduated</p>
                <p className="font-bold text-sm">CS&E 2023</p>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 bg-card/60 backdrop-blur-md border border-card-border p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-foreground">
              <span className="text-2xl">💼</span>
              <div>
                <p className="text-[10px] uppercase text-muted tracking-wider">Currently At</p>
                <p className="font-bold text-sm">Deutsche Bank</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-sm animate-bounce bg-card/50 backdrop-blur-sm px-4 py-1 rounded-full border border-card-border">
        Scroll to explore
      </div>
    </section>
  );
}
