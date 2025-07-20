import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import profileImg from './imgs/profile.jpg';
import ScrollToTop from './ScrollToTop';
import HardwareSection from './HardwareSection';
import AboutPanels from './AboutPanels';
import Blog from './components/Blog';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Blog', to: '/blog' },
  { name: 'Projects', href: '#projects' },
  { name: 'Toolbox', to: '/toolbox' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mathan-kumar-mk/', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
  )},
];

const timeline = [
  { year: "2022 - 2024", company: "Tata Consultancy Services", logo: "https://placehold.co/32x32?text=TCS", role: "Junior Frontend Developer", icon: "💻", contributions: "Built and maintained UI components, collaborated with cross-functional teams, and improved code quality." },
  { year: "2024-present", company: "Nielsen", logo: "https://placehold.co/32x32?text=N", role: "Software Engineer", icon: "🚀", contributions: "Developing AI-driven features, optimizing performance, and mentoring junior developers." },
];

type TimelineItem = {
  year: string;
  company: string;
  logo: string;
  role: string;
  icon: string;
  contributions: string;
};

function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-16 px-2 sm:px-8 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">Experience</h2>
      <div ref={containerRef} className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Vertical animated line */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-blue-300 origin-top z-0"
        />
        <div className="flex flex-col gap-16 w-full z-10">
          {timeline.map((item, idx) => (
            <TimelineEntry key={item.year + item.company} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ item, idx }: { item: TimelineItem; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: isInView ? idx * 0.1 : 0, ease: 'easeOut' }}
      className="relative flex items-center w-full min-h-[100px]"
    >
      {/* Left: Year & Company */}
      <div className="flex-1 text-right pr-8 hidden md:block">
        <div className="font-semibold text-blue-700 text-lg text-gray-900">{item.year}</div>
        <div className="flex items-center justify-end gap-2 text-gray-700 text-base">
          {item.logo && <img src={item.logo} alt={item.company + ' logo'} className="w-6 h-6 rounded bg-white border" />}
          <span>{item.company}</span>
        </div>
      </div>
      {/* Center: Milestone Icon */}
      <div className="flex flex-col items-center">
        <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-blue-300 shadow-lg">
          <span className="text-2xl animate-pulse drop-shadow-lg text-gray-900">{item.icon}</span>
          <span className="absolute w-16 h-16 rounded-full bg-blue-300/30 blur-xl animate-pulse" />
        </span>
      </div>
      {/* Right: Role and Contributions */}
      <div className="flex-1 text-left pl-8">
        <div className="font-bold text-lg text-gray-900">{item.role}</div>
        <div className="text-gray-700 text-sm mt-1">{item.contributions}</div>
      </div>
      {/* For mobile: year/company above, role and contributions below */}
      <div className="md:hidden absolute left-0 right-0 top-full mt-2 flex flex-col items-center">
        <div className="font-semibold text-blue-700 text-base text-gray-900">{item.year}</div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          {item.logo && <img src={item.logo} alt={item.company + ' logo'} className="w-5 h-5 rounded bg-white border" />}
          <span>{item.company}</span>
        </div>
        <div className="font-bold text-base text-gray-900 mt-1">{item.role}</div>
        <div className="text-gray-700 text-sm mt-1">{item.contributions}</div>
      </div>
    </motion.div>
  );
}

function ToolboxPage() {
  // Sample applications with placeholder icons or emoji
  const apps = [
    // Add requested dev tools
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { name: 'JavaScript (ES6)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'ASP.NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  ];
  // Animation variants for staggered cards
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { stiffness: 400, damping: 28, duration: 0.22 } }
  };
  // Replace NewsletterCard with new dark-themed newsletter section
  const NewsletterCard = () => (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Subscribe to my newsletter</h2>
      <p className="text-gray-600 mb-6 text-gray-300">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
      <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
        <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto text-gray-900 bg-gray-200" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
      </form>
      <div className="text-xs text-gray-400 mt-2 text-gray-300">NO SPAM. You can unsubscribe at any time!</div>
    </section>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-2 pt-0"
      style={{ paddingTop: 0, marginTop: '-1.5rem' }}
    >
      <motion.hr
        className="w-full max-w-lg border-t border-gray-200 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      />
      <motion.h1
        className="text-4xl font-bold text-center mb-4 text-gray-900"
        style={{ marginTop: 0 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
      >
        Softwares &amp;&amp; Hardwares<br />
        <span className="block text-4xl font-medium mt-1">I keep in my toolbox</span>
      </motion.h1>
      <motion.hr
        className="w-full max-w-lg border-t border-gray-200 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
        className="bg-white rounded-xl shadow max-w-screen-lg w-full mx-auto p-6 relative overflow-hidden"
      >
         {/* Dotted grid background for the big card */}
         <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true"
           style={{
             backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1.5px)',
             backgroundSize: '12px 12px',
             opacity: 0.5
           }}
         />
         <motion.h2
           className="text-xl font-bold text-center mb-6 text-blue-700 z-10"
           initial={{ opacity: 0, y: 16 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.38, ease: 'easeOut' }}
         >Applications</motion.h2>
         <motion.div
           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 py-6 z-10"
           variants={containerVariants}
           initial="hidden"
           animate="show"
         >
           {apps.map(app => (
             <motion.div
               key={app.name}
               variants={cardVariants}
               whileHover={{ scale: 1.10, boxShadow: '2px 4px 16px 2px rgba(80,120,255,0.10)' }}
               transition={{ type: 'spring', stiffness: 500, damping: 18, duration: 0.15 }}
               className="flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 ring-1 ring-gray-200 shadow-sm hover:shadow-md p-2 transition-all duration-250 cursor-pointer relative overflow-hidden"
               style={{ minHeight: 100 }}
             >
               <div className="flex items-center justify-center w-10 h-10 mb-1 text-2xl">
                 {app.icon.startsWith('http') ? (
                   <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain" />
                 ) : (
                   <span>{app.icon}</span>
                 )}
               </div>
               <div className="text-xs font-medium text-gray-600 text-center mt-1 z-10">{app.name}</div>
             </motion.div>
           ))}
         </motion.div>
       </motion.div>
      {/* HardwareSection above the newsletter card */}
      <HardwareSection />
      {/* Newsletter card below the HardwareSection */}
      <NewsletterCard />
    </motion.div>
  );
}

// Move homepage footer to a reusable Footer component
function Footer() {
  return (
    <footer className="py-8 mt-8 border-t text-center text-sm text-gray-500 bg-white">
      <div className="flex flex-col items-center gap-2">
        <div>I'm Mathan - a fullstack developer and lifelong learner. Thanks for visiting!</div>
        <div className="flex gap-4 justify-center mt-2">
          {socialLinks.map(link => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700" aria-label={link.name}>{link.icon}</a>
          ))}
        </div>
        <div className="flex gap-4 justify-center mt-2">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className="hover:underline">{item.name}</a>
          ))}
        </div>
        <div className="mt-2">&copy; {new Date().getFullYear()} Mathan Kumar</div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Floating NavBar always visible */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full border border-gray-200 shadow-lg backdrop-blur-lg
        bg-white/90 px-4 py-2 flex items-center gap-3 min-h-[40px] w-auto max-w-full text-base">
        {/* Icon + Brand */}
        {/* <div className="font-bold text-base">Mathan</div> */}
        <ul className="flex gap-2 md:gap-4 text-sm md:text-base font-medium">
          {navItems.map(item => (
            item.to ? (
              <li key={item.name}><Link to={item.to} className="hover:underline px-2 py-1">{item.name}</Link></li>
            ) : (
              <li key={item.name}><a href={item.href} className="hover:underline px-2 py-1">{item.name}</a></li>
            )
          ))}
        </ul>
        <div className="flex gap-2">
          {socialLinks.map(link => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700" aria-label={link.name}>{link.icon}</a>
          ))}
        </div>
      </nav>
      {/* Page content below nav */}
      <div className="pt-28 min-h-screen bg-white text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/toolbox" element={<ToolboxPage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

// --- Home Page Cards ---
function ProfileCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 16px 0 rgba(80, 120, 255, 0.10)', transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white/60 rounded-2xl shadow-lg backdrop-blur-lg p-6 flex flex-col items-center text-center h-full border border-white/30"
    >
      <div className="font-bold text-lg mb-2 text-gray-800">Learn more about me</div>
      <div className="text-sm mb-1 bg-gradient-to-r from-blue-500 to-orange-400 text-transparent bg-clip-text font-semibold">Good morning!</div>
      <div className="text-base font-medium mb-3 text-gray-700">I'm Mathan, an experienced fullstack developer.</div>
      <img src={profileImg} alt="Mathan headshot" className="w-20 h-20 rounded-full border-2 border-gray-800 shadow mb-2 object-cover" />
    </motion.div>
  );
}

function ToolboxCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  // Tech stack logos
  const techs = [
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { name: '.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
    { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  ];
  // Randomize start offset for seamless rotation
  const offset = Math.floor(Math.random() * techs.length * 2 * 80); // 80px per logo+gap
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 16px 0 rgba(80, 120, 255, 0.10)', transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white/60 rounded-2xl shadow-lg backdrop-blur-lg p-6 flex flex-col items-center text-center h-full border border-white/30"
    >
      <div className="font-bold text-lg mb-2 text-gray-800">Toolbox</div>
      <div className="text-base mb-4 text-gray-600">Check out my favorite tech stacks and tools.</div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-8 animate-marquee whitespace-nowrap py-2"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {techs.concat(techs).map((t, i) => (
            <img key={t.name + i} src={t.logo} alt={t.name} className="w-12 h-12 object-contain" />
          ))}
        </div>
      </div>
      <a href="#toolbox" className="flex items-center gap-1 text-blue-600 font-semibold hover:underline mt-4 group">
        Learn more
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </a>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

function ProjectsCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 16px 0 rgba(80, 120, 255, 0.10)', transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white/60 rounded-2xl shadow-lg backdrop-blur-lg p-4 flex flex-col text-left h-full gap-2 border border-white/30"
    >
      <div className="font-bold text-lg mb-1 text-gray-800">Projects</div>
      <div className="flex flex-row items-start gap-2">
        {/* Description */}
        <div className="flex-1">
          <div className="text-sm mb-1 text-gray-600">
            <div>A selection of my favorite web projects</div>
            <div>and experiments. I love building things</div>
            <div>that are useful, beautiful, and fun.</div>
            <div>From interactive dashboards to creative UI concepts,</div>
            <div>I focus on clean code, performance, and delightful user experiences.</div>
          </div>
        </div>
        {/* Mini project card with image */}
        <div className="bg-blue-50 rounded-xl p-2 shadow flex flex-col items-center min-w-[110px] max-w-[130px]">
          <img src="https://placehold.co/100x60" alt="Project" className="rounded w-full h-[60px] object-cover" />
        </div>
      </div>
      <a href="#projects" className="flex items-center gap-1 text-blue-600 font-semibold hover:underline mt-0 group text-sm">
        Learn more
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </a>
    </motion.div>
  );
}

function BookingCard() {
  // Calendar logic
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const grid = [
    ...Array(firstDay).fill(null),
    ...days
  ];
  while (grid.length % 7 !== 0) grid.push(null);
  // Animation: match ProjectsCard
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 16px 0 rgba(80, 120, 255, 0.10)', transition: { duration: 0.22, ease: 'easeOut' } }}
      className="bg-white/60 rounded-2xl shadow-lg backdrop-blur-lg p-6 flex flex-col items-center text-left h-full gap-4 border border-white/30 w-full relative overflow-hidden"
      style={{ boxShadow: '0 8px 32px 0 rgba(80,120,255,0.15)' }}
    >
      <div className="relative w-full flex items-center justify-between mb-1">
        <span className="font-bold text-lg text-gray-800">Book a call with me</span>
        <span className="text-sm text-gray-500 ml-2 bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">30 min call</span>
      </div>
      <div className="text-base mb-2 text-gray-600 w-full">I’d love to chat even if there’s no agenda!</div>
      {/* Calendar inside card (fuller, with border and bg) */}
      <div className="flex items-center justify-center w-full flex-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow w-full max-w-[380px] flex flex-col items-center p-2">
          <div className="grid grid-cols-7 gap-1 w-full mb-2 mt-2">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
              <div key={d} className="text-xs font-semibold text-gray-500 text-center py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 w-full">
            {grid.map((day, i) => (
              day ? (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded cursor-pointer hover:bg-blue-100 text-gray-800 text-base font-medium transition"
                  tabIndex={0}
                  aria-label={`Book for ${monthName} ${day}`}
                >
                  {day}
                </div>
              ) : (
                <div key={i} className="w-10 h-10" />
              )
            ))}
          </div>
        </div>
      </div>
      {/* Arrow link at bottom right, facing up (45deg) */}
      <a
        href="https://cal.com/mathankumar/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition transform -rotate-45"
        style={{ boxShadow: '0 2px 8px 0 rgba(80,120,255,0.15)' }}
        aria-label="Book now"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </motion.div>
  );
}

function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* HERO */}
        <header id="home" className="relative flex flex-col md:flex-row items-center justify-center text-center py-10 px-4 gap-8 overflow-hidden">
          {/* Dotted grid background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none select-none"
            aria-hidden="true"
            style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1.5px)',
              backgroundSize: '18px 18px',
              opacity: 0.5
            }}
          />
          <div className="relative z-10 w-full">
            {/* Decorative computer-related emojis (near border) */}
            <span className="hidden md:block absolute left-2 top-2 text-4xl opacity-30 select-none pointer-events-none">💻</span>
            <span className="hidden md:block absolute right-2 top-4 text-3xl opacity-20 blur-sm select-none pointer-events-none">🖥️</span>
            <span className="hidden md:block absolute left-12 bottom-4 text-3xl opacity-20 blur-sm select-none pointer-events-none">🖱️</span>
            <span className="hidden md:block absolute right-12 bottom-2 text-4xl opacity-30 select-none pointer-events-none">⌨️</span>
            <span className="hidden md:block absolute left-[60%] top-1/4 text-3xl opacity-20 blur-sm select-none pointer-events-none">🧑‍💻</span>
            {/* Hero content (image + text) */}
            <div className="flex flex-col items-center justify-center text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="relative flex items-center justify-center mb-6"
              >
                {/* Outer circle */}
                <span className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-blue-200" />
                {/* Inner circle */}
                <span className="absolute w-34 h-34 md:w-42 md:h-42 rounded-full border-2 border-blue-100" />
                <img src={profileImg} alt="Mathan headshot" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-200 shadow object-cover relative z-10" />
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              >
                Hey, I'm Mathan!
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-6 text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
              >
                Welcome to my corner of the internet!
              </motion.p>
              <motion.p
                className="max-w-xl text-base md:text-lg text-gray-600 mb-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
              >
                I'm a fullstack developer with a love for design and a knack for tinkering. This site is my playground for experimenting with new ideas and sharing what I learn!
              </motion.p>
            </div>
          </div>
        </header>
        {/* 2-COLUMN GRID CARDS */}
        <section className="relative max-w-6xl mx-auto px-2 md:px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Profile + Toolbox */}
          <div className="flex flex-col gap-8 h-full z-10">
            <ProfileCard />
            <ToolboxCard />
          </div>
          {/* Right column: Projects + Booking */}
          <div className="flex flex-col gap-8 h-full z-10">
            <ProjectsCard />
            <BookingCard />
          </div>
        </section>
        {/* NEWSLETTER/CONTACT */}
        <section id="contact" className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Subscribe to my newsletter</h2>
          <p className="text-gray-600 mb-6 text-gray-300">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto text-gray-900 bg-gray-200" />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
          </form>
          <div className="text-xs text-gray-400 mt-2 text-gray-300">NO SPAM. You can unsubscribe at any time!</div>
        </section>
      </div>
    </>
  );
}

// --- About Page ---
function About() {
  // Animation refs for sections
  const originsRef = useRef(null);
  const originsInView = useInView(originsRef, { once: true, margin: '-80px' });
  const webRef = useRef(null);
  const webInView = useInView(webRef, { once: true, margin: '-80px' });
  const lifeRef = useRef(null);
  const lifeInView = useInView(lifeRef, { once: true, margin: '-80px' });
  const newsletterRef = useRef(null);
  const newsletterInView = useInView(newsletterRef, { once: true, margin: '-80px' });
  return (
    <div className="max-w-7xl mx-auto px-8 md:px-24 py-12">
      {/* Hero Section: Greeting, Heading, and Overlapping Images */}
      <div className="relative mt-4">
        <div className="relative space-y-8 md:space-y-12">
          <div className="space-y-8 relative w-full before:absolute before:top-0 before:h-px before:bg-gray-200 before:left-0 before:right-0 after:left-0 after:right-0 after:absolute after:bottom-0 after:h-px after:bg-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-24">
              {/* Left: Greeting and Heading */}
              <motion.div
                className="flex-1 basis-1/2 order-2 mx-auto lg:order-1 lg:m-0 lg:pr-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                <div className="text-center text-sm font-semibold bg-gradient-to-r from-blue-500 to-orange-400 text-transparent bg-clip-text lg:text-left mb-2 mt-8">
                  <span>Good morning!</span>
                </div>
                <motion.h1
                  className="mx-auto max-w-2xl text-balance text-center text-2xl font-medium leading-tight tracking-tighter text-gray-900 md:text-3xl lg:text-left lg:text-4xl lg:leading-[48px] whitespace-nowrap"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                >
                  I'm Mathan, a creative fullstack engineer.
                </motion.h1>
                <motion.p
                  className="mt-4 mb-8 text-base md:text-lg text-gray-700 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                >
                  Here's a quick intro about me and what I love to do
                </motion.p>
              </motion.div>
              {/* Right: Overlapping Image Grid */}
              <motion.div
                className="flex-1 basis-1/2 order-1 my-8 flex-shrink-0 lg:order-2 lg:my-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              >
                <div className="relative w-full max-w-[600px]">
                  <div className="relative grid grid-cols-3 gap-8">
                    <div className="relative z-20 -translate-y-4">
                      <div className="relative mx-auto shrink-0 rounded-2xl overflow-hidden border shadow bg-white cursor-grab active:cursor-grabbing" style={{ width: 200, height: 200, perspective: 400 }}>
                        <img src="https://placehold.co/200x200" alt="Sample 1" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="relative z-30">
                      <div className="relative mx-auto shrink-0 rounded-2xl overflow-hidden border shadow bg-white cursor-grab active:cursor-grabbing" style={{ width: 200, height: 200, perspective: 400 }}>
                        <img src="https://placehold.co/200x200" alt="Sample 2" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="relative z-20 translate-y-6">
                      <div className="relative mx-auto shrink-0 rounded-2xl overflow-hidden border shadow bg-white cursor-grab active:cursor-grabbing" style={{ width: 200, height: 200, perspective: 400 }}>
                        <img src="https://placehold.co/200x200" alt="Sample 3" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* Add margin above 'My programming origins' */}
      <div className="mt-24" />

      {/* Programming Origins */}
      <motion.section
        ref={originsRef}
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={originsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">My programming origins</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <motion.img
            src="https://placehold.co/200x200"
            alt="Programming origins"
            className="rounded-xl mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={originsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          />
          <p className="text-gray-700 text-base md:text-lg">My journey in tech began with a curiosity for how things work and a love for building. I started by automating small tasks and creating simple games, which sparked my passion for software development. Over time, I taught myself to code and began freelancing, building everything from landing pages to full-stack apps.</p>
        </div>
      </motion.section>

      {/* Finding My Way to Web */}
      <motion.section
        ref={webRef}
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={webInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Finding My Way to Web</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <motion.img
            src="https://placehold.co/200x200"
            alt="Web journey"
            className="rounded-xl mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={webInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          />
          <p className="text-gray-700 text-base md:text-lg">After exploring mobile and desktop development, I found my true passion in web technologies. The creativity and rapid evolution of the web inspired me to dive deep into HTML, CSS, JavaScript, and frameworks like React. Building for the web became my playground for creativity and problem-solving.</p>
        </div>
      </motion.section>

      {/* Life Beyond Code */}
      <motion.section
        ref={lifeRef}
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={lifeInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Life Beyond Code</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <motion.img
            src="https://placehold.co/200x200"
            alt="Life beyond code"
            className="rounded-xl mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={lifeInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          />
          <p className="text-gray-700 text-base md:text-lg">When I'm not coding, I enjoy spending time with family, exploring new places, and tinkering with side projects. I believe in lifelong learning and maintaining a healthy balance between work and life. My curiosity drives me to keep learning and growing, both personally and professionally.</p>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <Timeline />
      {/* About Panels Section */}
      <AboutPanels />
      {/* Newsletter */}
      <motion.section
        ref={newsletterRef}
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={newsletterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Subscribe to my newsletter</h2>
        <p className="text-gray-600 mb-6">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto text-gray-900 bg-gray-200" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
        </form>
        <div className="text-xs text-gray-400 mt-2">NO SPAM. You can unsubscribe at any time!</div>
      </motion.section>
    </div>
  );
}

export default App;