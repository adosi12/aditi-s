'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  GitBranch, 
  Database, 
  Cpu, 
  Layout, 
  Cloud, 
  Brain, 
  Image as ImageIcon, 
  Mic, 
  Shield,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { learningProjects } from '@/data/learningProjects';
import { notFound } from 'next/navigation';

const iconMap = {
  database: Database,
  cpu: Cpu,
  layout: Layout,
  cloud: Cloud,
  brain: Brain,
  image: ImageIcon,
  voice: Mic,
  shield: Shield,
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = learningProjects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 print:pt-0">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-12 print:hidden">
          <Link 
            href="/learning"
            className="inline-flex items-center gap-2 text-muted hover:text-coral transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-mono text-sm uppercase tracking-widest">Back to Space</span>
          </Link>
          
          <div className="flex gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border border-card-border rounded-2xl text-foreground hover:border-coral/30 transition-all"
              >
                <GitBranch size={20} />
              </a>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-coral/20"
            >
              <Download size={18} />
              <span>Export to PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-4">
            // {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-foreground print:text-4xl">
            {project.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl print:text-lg">
            {project.description}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-20 print:mb-10">
          {project.techStack.map((tech) => (
            <span 
              key={tech}
              className="px-4 py-2 bg-card border border-card-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted print:border-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-24 print:space-y-12">
          {/* System Flow Diagram */}
          <section className="print:break-inside-avoid">
            <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <div className="w-8 h-1 bg-coral rounded-full" />
              System Architecture Flow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {project.flowSteps.map((step, index) => {
                const Icon = iconMap[step.icon];
                return (
                  <div key={index} className="relative group">
                    <div className="bg-card border border-card-border p-6 rounded-3xl hover:border-coral/30 transition-all h-full print:border-gray-300">
                      <div className="mb-4 text-coral group-hover:scale-110 transition-transform">
                        <Icon size={32} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                    {index < project.flowSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-card-border group-hover:text-coral/50 transition-colors">
                        <ArrowRight size={24} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* What we used */}
          <section className="print:break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <div className="w-8 h-1 bg-coral rounded-full" />
              What we have used
            </h2>
            <ul className="grid gap-4">
              {project.whatWeUsed.map((item, index) => (
                <li key={index} className="flex gap-4 p-4 bg-card/50 border border-card-border rounded-2xl print:border-gray-200">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                  <p className="text-muted leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Uses & Impact */}
          <section className="print:break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <div className="w-8 h-1 bg-coral rounded-full" />
              Uses & Applications
            </h2>
            <ul className="grid gap-4">
              {project.uses.map((item, index) => (
                <li key={index} className="flex gap-4 p-4 bg-card/50 border border-card-border rounded-2xl print:border-gray-200">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                  <p className="text-muted leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Future Work */}
          <section className="pb-12 print:break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <div className="w-8 h-1 bg-coral rounded-full" />
              Future Roadmap
            </h2>
            <ul className="grid gap-4">
              {project.futureWork.map((item, index) => (
                <li key={index} className="flex gap-4 p-4 bg-card/50 border border-card-border rounded-2xl print:border-gray-200">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                  <p className="text-muted leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
