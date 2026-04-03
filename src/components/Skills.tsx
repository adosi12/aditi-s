'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Jenkins'],
  },
];

export default function Skills() {
  return (
    <section className="py-24 bg-[#0a0a0a] text-white" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter">
          Skills <span className="text-[#ff6b6b]">/</span> Expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium hover:bg-white/20 transition-all cursor-default"
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
