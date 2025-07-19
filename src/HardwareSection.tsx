import React from 'react';
import { motion } from 'framer-motion';

const bestPractices = [
  {
    name: 'Automated testing & coverage',
    desc: 'Run automated tests to catch bugs early and ensure code reliability. High test coverage means fewer surprises.',
  },
  {
    name: 'Reduce code complexity',
    desc: 'Keep code simple and modular. Use small, focused functions for better readability and fewer bugs.',
  },
  {
    name: 'Carry out code reviews',
    desc: 'Peer reviews help catch issues, improve code quality, and share knowledge across the team.',
  },
  {
    name: 'Deploy in small batches',
    desc: 'Release changes incrementally to reduce risk and make rollbacks easier if issues arise.',
  },
  {
    name: 'Use feature flags',
    desc: 'Control new features with flags to test safely and roll out gradually.',
  },
  {
    name: 'Continuous integration & deployment',
    desc: 'Automate build, test, and deploy for faster, more reliable releases.',
  },
  {
    name: 'Use version control',
    desc: 'Track changes and collaborate easily with tools like Git.',
  },
  {
    name: 'Practice agile methodologies',
    desc: 'Work iteratively, adapt to change, and collaborate closely for better results.',
  },
  {
    name: 'Emphasize software ownership',
    desc: 'Encourage developers to take pride and responsibility in their code.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export default function HardwareSection() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
      }}
      className="bg-white py-12 px-2 md:px-8"
    >
      <motion.hr
        className="border-t border-gray-200 mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />
      <motion.h2
        className="text-2xl font-semibold text-center mb-2 bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
      >
        Hardware
      </motion.h2>
      <motion.h3
        className="text-xl font-bold text-center mb-10 text-gray-900"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28 }}
      >
        Best Practices I follow
      </motion.h3>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={containerVariants}
      >
        {bestPractices.map((item, i) => (
          <motion.div
            key={item.name}
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 24px 0 rgba(120, 80, 255, 0.10)' }}
            transition={{ duration: 0.18 }}
            className="relative flex flex-col justify-between rounded-2xl shadow-md p-6 min-h-[220px] bg-gradient-to-br from-violet-50 to-transparent border border-violet-100"
          >
            <div>
              <div className="font-bold text-lg text-gray-900 mb-2">{item.name}</div>
              <div className="text-sm text-gray-500 mb-8">{item.desc}</div>
            </div>
            <button
              type="button"
              className="absolute bottom-4 right-4 text-violet-500 font-medium text-sm hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
              tabIndex={0}
            >
              Learn more
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
} 