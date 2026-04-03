'use client';

import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Financial Dashboard',
    description: 'A real-time dashboard for monitoring financial transactions and portfolio performance.',
    tech: ['Next.js', 'TypeScript', 'Chart.js', 'Tailwind'],
    image: '/assets/images/bhp_website.png',
    github: '#',
    live: '#',
  },
  {
    title: 'AI Face Recognition',
    description: 'Security system utilizing computer vision for real-time face identification.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'React'],
    image: '/assets/images/facerecognition.jpg',
    github: '#',
    live: '#',
  },
  {
    title: 'Power BI Analytics',
    description: 'Advanced data visualization and business intelligence for corporate reports.',
    tech: ['Power BI', 'SQL', 'Python'],
    image: '/assets/images/powerbi.jpg',
    github: '#',
    live: '#',
  },
];

export default function Projects() {
  return (
    <section className="py-24 bg-black text-white" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-right">
          Selected <span className="text-blue-500">/</span> Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <a href={project.github} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                    <GitBranch size={20} />
                  </a>
                  <a href={project.live} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/10 rounded font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
