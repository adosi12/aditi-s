'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Deutsche Bank',
    role: 'Senior Analyst — Full Stack Developer',
    period: 'Jul 2023 — Present',
    location: 'Pune, India',
    description: 'Owned end-to-end development of full-stack financial applications — from Java microservices (Axiom framework) to React + TypeScript frontends. Designed and implemented GraphQL APIs with JMX runtime management and managed schema migrations using Liquibase. Received the "Rising Star" Award for outstanding contributions.',
    stack: {
      backend: ['Java', 'Axiom Framework', 'GraphQL', 'JMX', 'Liquibase'],
      frontend: ['React', 'TypeScript'],
      monitoring: ['ITRS Netprobe', 'Geneos', 'New Relic', 'Splunk']
    }
  },
  {
    company: 'SmartInternz',
    role: 'Salesforce Developer & Android Trainee',
    period: 'Apr 2022 – Oct 2022',
    description: 'Built Salesforce apps via Trailhead modules and developed an Android-based Emergency Alert App. Delivered end-to-end project including backend logic, frontend integration, and live deployment.',
  },
  {
    company: 'Persistent Systems',
    role: 'Martian Intern',
    period: 'Jan 2022 – Mar 2022',
    description: 'Gained foundational software engineering skills; contributed to team-oriented tasks and agile sprints.',
  },
  {
    company: 'Palo Alto Networks',
    role: 'CyberSecurity Intern',
    period: 'Oct 2021 – Dec 2021',
    description: 'Studied network security fundamentals, threat detection, and Palo Alto NGFW capabilities.',
  },
];

export default function Experience() {
  return (
    <section className="py-24 bg-background text-foreground" id="experience">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-coral font-mono text-sm uppercase tracking-widest block mb-2">Work Experience</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Where I've <span className="text-yellow-400">Worked</span>
          </h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative grid md:grid-cols-[1fr_2.5fr] gap-8 p-8 rounded-3xl bg-card border border-card-border hover:border-yellow-400/30 transition-all"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted mb-2">{exp.period}</p>
                <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{exp.company}</h3>
                <p className="text-lg font-medium text-foreground mb-2">{exp.role}</p>
                {exp.location && <p className="text-sm text-muted">📍 {exp.location}</p>}
              </div>
              <div>
                <p className="text-lg text-muted leading-relaxed mb-6">{exp.description}</p>
                
                {exp.stack && (
                  <div className="flex flex-wrap gap-2">
                    {Object.values(exp.stack).flat().map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-background border border-card-border rounded-full text-xs font-medium text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
