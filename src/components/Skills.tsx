'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    skills: ['Java', 'Axiom Framework', 'GraphQL', 'Node.js', 'Python', 'FastAPI'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Liquibase'],
  },
  {
    title: 'Tools & Monitoring',
    skills: ['JMX', 'ITRS Netprobe', 'Geneos', 'New Relic', 'Splunk', 'Git'],
  },
  {
    title: 'Emerging Tech',
    skills: ['Agentic AI', 'LangGraph', 'CrewAI', 'AutoGen', 'Blockchain'],
  },
];

export default function Skills() {
  return (
    <section className="py-24 bg-background text-foreground" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-2">Technical Proficiency</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Skills <span className="text-yellow-400">&amp;</span> Expertise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card border border-card-border hover:border-coral/30 transition-all"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-background border border-card-border rounded-xl text-sm font-medium text-muted hover:text-coral hover:border-coral/50 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
