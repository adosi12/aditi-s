'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { FileText, Video, ExternalLink, ArrowRight, Brain, Cpu, Code } from 'lucide-react';
import Link from 'next/link';

import { learningProjects } from '@/data/learningProjects';
import DevTerminal from '@/components/DevTerminal';

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-4">// knowledge base</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
              Learning <span className="text-coral">Space</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Detailed technical deep-dives, architectural breakdowns, and future roadmaps for my key projects.
            </p>
          </motion.div>

          {/* Interactive Playground Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-24"
          >
            <DevTerminal />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-card border border-card-border rounded-3xl p-8 hover:border-coral/30 transition-all flex flex-col"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-background border border-card-border rounded-2xl text-coral group-hover:scale-110 transition-transform">
                    {project.category.includes('ML') ? <Brain size={24} /> : project.category.includes('AI') ? <Cpu size={24} /> : <Code size={24} />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-background border border-card-border rounded-full text-muted">
                    {project.category}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold group-hover:text-coral transition-colors text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mt-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <Link
                    href={`/learning/${project.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <span>Read Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
