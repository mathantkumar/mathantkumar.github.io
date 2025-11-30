import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type MediumPost = {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
  description: string;
};

const MEDIUM_RSS_URL = "https://medium.com/feed/@mathankumar.mkk29";
const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(RSS2JSON_API)
      .then((res) => {
        const data = res.data as { items: MediumPost[] };
        setPosts(data.items.slice(0, 6)); // Get latest 6 posts
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  // Helper to strip HTML tags and truncate
  function getMiniDescription(html: string, maxLength = 240) {
    const text = html.replace(/<[^>]+>/g, "").replace(/\n/g, " ").trim();
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  // Helper to extract first image from HTML
  function extractFirstImage(html: string): string | null {
    const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    return match ? match[1] : null;
  }
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
      image: 'Depmap',
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
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <hr className="border-t border-gray-300 mb-6 mx-auto w-72" />
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          Insightful &amp;&amp; helpful<br />
          <span className="block font-normal">content curated for you.</span>
        </motion.h1>
        <hr className="border-t border-gray-300 mb-10 mx-auto w-72" />
        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">No posts found. Please check your Medium feed or try again later.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden w-full max-w-m transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 40, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.9, delay: idx * 0.13, type: "spring", bounce: 0.18 }}
              >
                <div className="bg-white rounded-xl shadow border border-gray-200 p-2 mb-2">
                  <img
                    src={
                      post.thumbnail ||
                      extractFirstImage(post.description) ||
                      "https://placehold.co/400x200"
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover object-center rounded-lg"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-1">{post.title}</h2>
                  <p className="text-gray-600 text-xs mb-1">{getMiniDescription(post.description)}</p>
                  <div className="flex justify-end mt-2">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full border border-violet-600 text-violet-700 hover:bg-violet-50 hover:border-violet-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-sm group-hover:shadow-md"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 inline-block -rotate-[40deg] transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Newsletter/Contact Section */}
      {/* <section className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Subscribe to my newsletter</h2>
        <p className="text-gray-600 mb-6">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto text-gray-900 bg-gray-200" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
        </form>
        <div className="text-xs text-gray-400 mt-2">NO SPAM. You can unsubscribe at any time!</div>
      </section> */}
    </div>
  );
};

export default Blog; 