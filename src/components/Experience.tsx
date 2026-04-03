'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Deutsche Bank',
    role: 'Full Stack Developer',
    period: '2023 - Present',
    description: 'Developing high-throughput financial trading systems using Java (Spring Boot) and React. Improved system performance by 30% through modular architecture.',
  },
  {
    company: 'Tech Intern (Previous)',
    role: 'Software Engineer Intern',
    period: '2022 - 2023',
    description: 'Built scalable web applications and worked with cloud-native technologies.',
  },
];

export default function Experience() {
  return (
    <section className="py-24 bg-black text-white" id="experience">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter">
          Experience <span className="text-yellow-400">/</span> History
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-8 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{exp.period}</p>
                <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{exp.company}</h3>
                <p className="text-lg font-medium text-gray-300">{exp.role}</p>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
