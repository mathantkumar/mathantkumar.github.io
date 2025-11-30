import React from "react";
import { motion } from "framer-motion";
import Depmap from '../imgs/Depmap.png';

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
};

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Dependency Updater",
      description: "Designed to help an organization manage software libraries across many repositories by scanning for dependencies and automating version updates",
      image: Depmap,
      link: "#",
      tech: ["FastAPI", "Python3", "PyGithub", "Manifest Parsing", "Pydantic"],
    },
    {
      title: "Project Two",
      description: "An interactive dashboard for data visualization. Built with modern web technologies and includes advanced charting capabilities.",
      image: "https://placehold.co/600x400?text=Project+2",
      link: "#",
      tech: ["Next.js", "D3.js", "Tailwind CSS", "PostgreSQL"],
    },
    {
      title: "Project Three",
      description: "A mobile-first e-commerce platform with seamless checkout experience. Optimized for performance and user experience.",
      image: "https://placehold.co/600x400?text=Project+3",
      link: "#",
      tech: ["React Native", "Express.js", "Stripe", "Redis"],
    },
    {
      title: "Project Four",
      description: "A collaborative project management tool with real-time collaboration features. Includes task tracking, team chat, and analytics.",
      image: "https://placehold.co/600x400?text=Project+4",
      link: "#",
      tech: ["Vue.js", "Socket.io", "GraphQL", "AWS"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <hr className="border-t border-gray-300 mb-4 mx-auto w-72" />
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Fraunces', serif" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Selected Works
        </motion.h1>
        <hr className="border-t border-gray-300 mb-8 mx-auto w-72" />

        {/* Graph sheet background container */}
        <div
          className="relative pb-12"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 0.6px, transparent 0.6px),
              linear-gradient(to bottom, #e5e7eb 0.6px, transparent 0.6px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-20 px-4 sm:px-6 lg:px-8 py-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, x: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: idx * 0.13, type: "spring", bounce: 0.18 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-white rounded-xl shadow border border-gray-200 p-2 m-4 mb-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 sm:h-48 md:h-52 object-cover rounded-lg"
                />
              </div>
              <div className="px-5 pb-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:underline text-sm"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

