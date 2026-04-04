import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />

      {/* Resume & Resources Section */}
      <section className="py-24 bg-background border-y border-card-border" id="resume">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-2">Resume & Resources</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">
                Everything you need, <br />
                <span className="text-yellow-400">one click away.</span>
              </h2>
              <p className="text-lg text-muted mb-8 max-w-xl">
                My resume is a concise snapshot of my work as a Full Stack Developer at Deutsche Bank.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/AditiDosi_Resume2025.pdf"
                  download
                  className="bg-foreground text-background px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all shadow-xl shadow-foreground/5"
                >
                  Download Resume ↓
                </a>
              </div>
            </div>
            <div className="bg-card rounded-3xl p-8 border border-card-border">
              <ul className="space-y-4">
                {[
                  '2+ years at Deutsche Bank — Java, React, TypeScript',
                  'Agentic AI — learning LangGraph, CrewAI & AutoGen',
                  'Rising Star Award for project delivery',
                  'GCP Professional Developer certified',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-card text-foreground" id="contact">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">
            Let's <span className="text-coral">Talk</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:adosi12@gmail.com"
              className="bg-foreground text-background px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-foreground/5"
            >
              Send an Email
            </a>
            <a
              href="https://linkedin.com/in/aditidosi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0077b5] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#006da5] transition-all shadow-xl shadow-[#0077b5]/20"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-card-border text-center text-muted text-sm bg-background">
        <p>© 2026 Aditi Dosi. Built with Next.js 15 & Tailwind CSS.</p>
      </footer>
    </main>
  );
}
