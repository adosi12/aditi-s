'use client';

import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Brain, Sprout, Newspaper, Mic, PenTool } from 'lucide-react';

const projects = [
  {
    title: 'Freehold Price Predictor',
    description: 'Full-stack real estate price prediction website with a Python/Flask backend serving an ML regression model.',
    tech: ['Python', 'Flask', 'ML', 'React'],
    image: '/assets/images/bhp_website.png',
    github: 'https://github.com/adosi12/Freehold-Price-Predict',
    live: '#',
  },
  {
    title: 'Contestant Disposer',
    description: 'Sports celebrity image classification using ML. Built a pipeline to classify sports personalities using CV algorithms.',
    tech: ['Python', 'ML', 'OpenCV'],
    image: '/assets/images/facerecognition.jpg',
    github: 'https://github.com/adosi12/contestantdisposer',
    live: '#',
  },
  {
    title: 'Power BI Analytics',
    description: 'End-to-end data analytics project transforming raw sales data into actionable business intelligence dashboards.',
    tech: ['Power BI', 'SQL', 'Analytics'],
    image: '/assets/images/powerbi.jpg',
    github: '#',
    live: '#',
  },
  {
    title: 'The Daily Dispatch',
    description: 'A React-powered newsletter web app — curated content delivered in a clean, readable format with smooth UX.',
    tech: ['React', 'JavaScript', 'Vercel'],
    image: '/assets/images/DailyDispatch.jpg',
    github: '#',
    live: 'https://my-newsletter-mauve.vercel.app/',
  },
  {
    title: 'Dev & Voice',
    description: 'A daily journaling platform combining developer reflections with voice. Supports audio recording and rich posts.',
    tech: ['JavaScript', 'HTML/CSS', 'Vercel'],
    image: '/assets/images/DevVoice.jpg',
    github: '#',
    live: 'https://dev-and-voice-5zmav8tvj-adosi12s-projects.vercel.app/',
  },
  {
    title: 'Believe In Yourself',
    description: 'A personal blog dedicated to self-improvement, technical reflections, and sharing creative ideas.',
    tech: ['WordPress', 'Blogging', 'Content'],
    image: '/assets/images/BelieveOnYourself.jpg',
    github: '#',
    live: 'https://believeonyourself.art.blog/',
  },
];

const hackathonProjects = [
  {
    title: 'AI Assistant for Dementia Patients',
    description: 'Voice & text AI assistant designed to support dementia patients with context-aware, empathetic interactions.',
    tech: ['AI', 'Voice', 'Text Interface'],
    icon: <Brain className="w-12 h-12 text-pink-500" />,
    color: 'bg-pink-500/10',
    github: 'https://github.com/adosi12/CogCrafters',
    live: '#',
  },
  {
    title: 'FarmerConnect — n8n AI Workflow Platform',
    description: 'End-to-end automated platform enabling farmers to apply for financial aid and receive personalised AI advice in any language.',
    tech: ['n8n', 'AI', 'Multilingual', 'Automation'],
    icon: <Sprout className="w-12 h-12 text-green-500" />,
    color: 'bg-green-500/10',
    github: '#',
    live: '#',
  },
];

export default function Projects() {
  return (
    <section className="py-24 bg-background text-foreground" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter text-right">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-card-border hover:border-blue-400/30 transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                    <GitBranch size={20} />
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors text-foreground">{project.title}</h3>
                <p className="text-muted text-sm mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-background border border-card-border rounded font-bold text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32">
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter">
            Hackathon <span className="text-coral">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-card border border-card-border hover:border-coral/30 transition-all flex flex-col"
              >
                <div className={`relative aspect-video flex items-center justify-center ${project.color} group-hover:scale-105 transition-transform duration-500`}>
                  {project.icon}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                      <GitBranch size={20} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-coral transition-colors text-foreground">{project.title}</h3>
                  <p className="text-muted text-sm mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-background border border-card-border rounded font-bold text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
