import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SnowDustBackground from './components/SnowDustBackground';
import MovingStarsBackground from './components/MovingStarsBackground';
import SnowMoundsFooter from './components/SnowMoundsFooter';
import ThemeToggle from './components/ThemeToggle';
import ThemedButton from './components/ThemedButton';
import { motion, useInView } from 'framer-motion';

// Theme context
const ThemeContext = createContext<{ theme: 'dark' | 'light'; toggle: () => void }>({ theme: 'dark', toggle: () => {} });
export function useTheme() { return useContext(ThemeContext); }

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const projects = [
  {
    title: 'Personal Portfolio Website',
    headline: 'Showcasing My Work and Skills',
    description: 'A modern, responsive portfolio built with React and Tailwind CSS.',
    results: ['React', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'E-commerce Platform',
    headline: 'Fullstack MERN Application',
    description: 'A scalable e-commerce platform with user authentication, cart, and payment integration.',
    results: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    title: 'Blog Engine',
    headline: 'Content Management System',
    description: 'A CMS for creating and managing blog posts with markdown support.',
    results: ['Next.js', 'Prisma', 'PostgreSQL'],
  },
  {
    title: 'Chat Application',
    headline: 'Real-time Messaging',
    description: 'A real-time chat app with WebSocket and group chat support.',
    results: ['Socket.io', 'React', 'Node.js'],
  },
  {
    title: 'Task Manager',
    headline: 'Productivity Tool',
    description: 'A Kanban-style task manager for teams and individuals.',
    results: ['React', 'Redux', 'Firebase'],
  },
  {
    title: 'API Integrations',
    headline: 'Connecting Services',
    description: 'Projects integrating third-party APIs for weather, news, and more.',
    results: ['REST', 'GraphQL', 'OAuth'],
  },
];

const footerMenu = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

function Home() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'text-[#232946]' : 'text-[#232946]';
  return (
    <header className="relative flex flex-col items-center justify-center py-24 mt-24 bg-transparent overflow-visible w-full">
      <div className="relative w-full max-w-screen-2xl mx-auto rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md px-2 sm:px-6 py-16 sm:py-20 flex flex-col items-center z-10 animate-fadeinup shadow-black/20">
        <h1 className={`heading-unbounded text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-center ${textColor}`}>hi, 
          im Mathan</h1>
        <h2 className={`heading-unbounded text-2xl md:text-4xl font-semibold mb-8 text-center ${textColor}`}>Fullstack Developer</h2>
        <p className="max-w-2xl text-xl sm:text-2xl text-gray-600 font-light mb-10 text-center">
          I write code that sometimes works on the first try, drink more coffee than my laptop, and turn wild ideas into beautiful, functional web apps. Whether you need a bug squasher, a pixel pusher, or just someone who can Google really well, I'm your dev. Welcome to my digital playground!
        </p>
        <ThemedButton onClick={() => {}}>View My Projects</ThemedButton>
      </div>
    </header>
  );
}

function Projects() {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? '#232946' : '#e0e7ef';
  const textColor = theme === 'dark' ? 'text-[#232946]' : 'text-[#232946]';
  const badgeBg = theme === 'dark' ? 'bg-[#232946]/10' : 'bg-[#e0e7ef]';
  const cardLeftBg = theme === 'dark' ? 'bg-[#232946]/10' : 'bg-[#e0e7ef]';
  const iconColor = theme === 'dark' ? 'text-[#232946]' : 'text-[#232946]';

  // For staggered animation
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create a separate component for each project card
  const ProjectCard = ({ project, idx }: { project: any; idx: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80, scale: 0.85 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          delay: isInView ? idx * 0.15 : 0,
          ease: [0.34, 1.56, 0.64, 1], // bounce-like
        }}
        className={`flex flex-col md:flex-row rounded-3xl p-0 overflow-hidden w-full max-w-screen-2xl mx-auto backdrop-blur-xl border
          ${theme === 'dark' 
            ? 'bg-white/10 border-white/20 shadow-2xl shadow-black/30' 
            : 'bg-white/40 border-white/50 shadow-2xl shadow-blue-900/10'
          }
          hover:shadow-3xl transition-all duration-500 ease-out
        `}
        style={{ minHeight: '220px' }}
      >
        {/* Left: Image and Title */}
        <div className={`md:w-1/3 flex flex-col items-center justify-center p-8 min-h-[180px] backdrop-blur-sm
          ${theme === 'dark' 
            ? 'bg-white/5 border-r border-white/10' 
            : 'bg-white/30 border-r border-white/40'
          }
        `}>
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border
            ${theme === 'dark' 
              ? 'bg-white/10 border-white/20 shadow-lg' 
              : 'bg-white/50 border-white/60 shadow-lg'
            }
          `}>
            {/* Placeholder image */}
            <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#232946]'}`}>{project.title[0]}</span>
          </div>
          <div className={`heading-unbounded text-xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-[#232946]'}`}>{project.title}</div>
        </div>
        {/* Right: Summary and Tech Stack */}
        <div className="md:w-2/3 flex flex-col justify-center p-8">
          <h3 className={`heading-unbounded text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#232946]'}`}>{project.headline}</h3>
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-white/90' : 'text-[#232946]/80'}`}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.results.map((tech: string, i: number) => (
              <span key={i} className={`text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm border
                ${theme === 'dark' 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-white/60 text-[#232946]'
                }
              `}>
                {tech}
              </span>
            ))}
          </div>
          <button
            className={`mt-2 rounded-full font-semibold shadow-lg transition text-base px-8 py-3 w-max backdrop-blur-sm border
              ${theme === 'dark' 
                ? 'bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50' 
                : 'bg-white/60 border-white/70 text-[#232946] hover:bg-white/80 hover:border-white/90'
              }
            `}
          >
            Learn More
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="flex-1 w-full max-w-screen-2xl mx-auto px-1 sm:px-2 py-12 mt-24 space-y-8">
      <h2 className="heading-unbounded text-4xl md:text-5xl font-bold mb-8 text-center">Projects</h2>
      <div className="flex flex-col gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} idx={idx} />
        ))}
      </div>
    </main>
  );
}

function About() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 mt-24 text-center">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">I'm Mathan, a passionate fullstack developer with experience in building scalable web applications and modern user interfaces. I love solving problems and learning new technologies.</p>
    </section>
  );
}

function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 mt-24 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p className="text-lg text-gray-700 mb-6">Want to work together or have a question? Reach out!</p>
      <form className="space-y-4 max-w-md mx-auto">
        <input className="w-full border px-3 py-2 rounded" type="text" placeholder="Your Name" disabled />
        <input className="w-full border px-3 py-2 rounded" type="email" placeholder="Your Email" disabled />
        <textarea className="w-full border px-3 py-2 rounded" placeholder="Your Message" rows={4} disabled />
        <button className="bg-blue-600 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed" disabled>Send</button>
      </form>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <Router>
        <div className={`flex flex-col min-h-screen text-gray-900 relative overflow-hidden bg-transparent ${theme === 'dark' ? '' : 'bg-white'}`}>
          {/* Backgrounds */}
          <MovingStarsBackground />
          <SnowDustBackground />
          {/* Floating Navigation Bar */}
          <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full border border-gray-200 shadow-lg backdrop-blur-lg
            flex items-center gap-2
            ${theme === 'dark' ? 'bg-white/80' : 'bg-white/95'}
            px-10 py-5
            min-h-[64px]
            w-auto
          `}>
            <ul className="flex flex-wrap gap-4 md:gap-10 text-base md:text-lg font-semibold tracking-wide">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={`px-5 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400
                    ${theme === 'dark' ? 'text-[#232946] hover:bg-[#232946]/10' : 'text-[#232946] hover:bg-[#e0e7ef]'}
                  `}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>

          <Routes>
            <Route path="/" element={
              <>
                <Home />
                {theme === 'light' && <SnowMoundsFooter />}
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={
              <>
                <Projects />
                {theme === 'light' && <SnowMoundsFooter />}
              </>
            } />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* Footer */}
          <footer className={`py-10 mt-8 z-10 relative ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-[#e0f2ff] text-[#232946]'}`}>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-xl font-bold mb-2">Mathan Kumar © 2025</div>
                <div className="text-sm mb-2">Chennai, India</div>
                <div className="text-sm">mathan@email.com</div>
              </div>
              <div>
                <div className="font-semibold mb-2">Menu</div>
                <ul className="space-y-1">
                  {footerMenu.map((item) => (
                    <li key={item.name}><Link to={item.path} className="hover:underline">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Follow me:</div>
                <div className="flex space-x-3 mt-2">
                  <span className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">G</span>
                  <span className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">L</span>
                  <span className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">T</span>
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-8">© Mathan Kumar 2025</div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;