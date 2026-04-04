'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { FileText, Video, ExternalLink, Download } from 'lucide-react';

import learningData from '@/data/learning.json';

const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'agentic-ai', name: 'Agentic AI' },
  { id: 'full-stack', name: 'Full Stack' },
  { id: 'blockchain', name: 'Blockchain' },
];

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-4">// knowledge base</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
              Learning <span className="text-coral">Space</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              A curated collection of resources, notes, and tutorials I've gathered while exploring new technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningData.courses.map((course: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-card border border-card-border rounded-3xl p-8 hover:border-coral/30 transition-all flex flex-col"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-background border border-card-border rounded-2xl text-coral group-hover:scale-110 transition-transform">
                    {course.type === 'Video' ? <Video size={24} /> : <FileText size={24} />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-background border border-card-border rounded-full text-muted">
                    {course.category}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold group-hover:text-coral transition-colors text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-muted text-sm mt-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <ExternalLink size={14} />
                    <span>Watch Now</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
