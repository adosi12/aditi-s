import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      
      {/* Contact Section */}
      <section className="py-24 bg-[#0a0a0a] text-white" id="contact">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">
            Let's <span className="text-coral-500" style={{ color: '#ff6b6b' }}>Talk</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:adosi12@gmail.com"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
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

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Aditi Dosi. Built with Next.js 15 & Tailwind CSS.</p>
      </footer>
    </main>
  );
}
