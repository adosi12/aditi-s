'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { FileText, Video, ExternalLink, Download } from 'lucide-react';

import learningData from '@/data/learning.json';

const cheatsheets = learningData.cheatsheets;
const courses = learningData.courses;

export default function LearningSpace() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Learning <span className="text-coral-500" style={{ color: '#ff6b6b' }}>Space</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              My curated collection of technical resources, cheatsheets, and courses to help you level up your engineering skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Cheatsheets */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <FileText className="text-yellow-400" size={32} />
                <h2 className="text-3xl font-bold">Cheatsheets & PDFs</h2>
              </div>
              <div className="space-y-6">
                {cheatsheets.map((sheet, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors">
                        {sheet.title}
                      </h3>
                      <span className="text-[10px] uppercase bg-white/10 px-2 py-1 rounded font-bold tracking-widest">
                        {sheet.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">{sheet.description}</p>
                    <a
                      href={sheet.link}
                      className="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-yellow-400 transition-colors"
                    >
                      <Download size={16} />
                      <span>Download Resource</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <Video className="text-[#ff6b6b]" size={32} />
                <h2 className="text-3xl font-bold">Video Courses</h2>
              </div>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold group-hover:text-coral-400 transition-colors" style={{ color: 'inherit' }}>
                        {course.title}
                      </h3>
                      <span className="text-[10px] uppercase bg-white/10 px-2 py-1 rounded font-bold tracking-widest">
                        {course.platform}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{course.description}</p>
                    <p className="text-xs text-gray-500 mb-6">Duration: {course.duration}</p>
                    <a
                      href={course.link}
                      className="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-[#ff6b6b] transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Watch Now</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
