import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import profileImg from './imgs/profile.jpg';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Blog', href: '#blog' },
  { name: 'Projects', href: '#projects' },
  { name: 'Toolbox', href: '#toolbox' },
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
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Experience</h2>
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
        <div className="font-semibold text-blue-700 text-lg">{item.year}</div>
        <div className="flex items-center justify-end gap-2 text-gray-700 text-base">
          {item.logo && <img src={item.logo} alt={item.company + ' logo'} className="w-6 h-6 rounded bg-white border" />}
          <span>{item.company}</span>
        </div>
      </div>
      {/* Center: Milestone Icon */}
      <div className="flex flex-col items-center">
        <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-blue-300 shadow-lg">
          <span className="text-2xl animate-pulse drop-shadow-lg">{item.icon}</span>
          <span className="absolute w-16 h-16 rounded-full bg-blue-300/30 blur-xl animate-pulse" />
        </span>
      </div>
      {/* Right: Role and Contributions */}
      <div className="flex-1 text-left pl-8">
        <div className="font-bold text-lg text-gray-900">{item.role}</div>
        <div className="text-gray-500 text-sm mt-1">{item.contributions}</div>
      </div>
      {/* For mobile: year/company above, role and contributions below */}
      <div className="md:hidden absolute left-0 right-0 top-full mt-2 flex flex-col items-center">
        <div className="font-semibold text-blue-700 text-base">{item.year}</div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          {item.logo && <img src={item.logo} alt={item.company + ' logo'} className="w-5 h-5 rounded bg-white border" />}
          <span>{item.company}</span>
        </div>
        <div className="font-bold text-base text-gray-900 mt-1">{item.role}</div>
        <div className="text-gray-500 text-sm mt-1">{item.contributions}</div>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      {/* Floating NavBar always visible */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full border border-gray-200 shadow-lg backdrop-blur-lg
        bg-white/90 px-4 py-2 flex items-center gap-3 min-h-[40px] w-auto max-w-full text-base">
        <div className="font-bold text-base">Mathan</div>
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
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- Home Page ---
function Home() {
  // Keep your current home page content as-is
  return (
    <>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* HERO */}
        <header id="home" className="flex flex-col items-center justify-center text-center py-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="relative flex items-center justify-center mb-6"
          >
            {/* Outer circle */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-blue-200"
            />
            {/* Inner circle */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="absolute w-34 h-34 md:w-42 md:h-42 rounded-full border-2 border-blue-100"
            />
            <motion.img
              src={profileImg}
              alt="Mathan headshot"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-200 shadow object-cover relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            />
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
            className="max-w-xl text-base md:text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
          >
            I'm a fullstack developer with a love for design and a knack for tinkering. This site is my playground for experimenting with new ideas and sharing what I learn!
          </motion.p>
        </header>

        {/* ABOUT */}
        <section id="about" className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What sets me apart</h2>
          <p className="text-lg text-gray-700 mb-6">I'm Mathan, a passionate fullstack developer with experience in building scalable web applications and modern user interfaces. I love solving problems and learning new technologies.</p>
          <a href="#contact" className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Learn more about me</a>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* projects data removed as per edit hint */}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* blogPosts data removed as per edit hint */}
          </div>
        </section>

        {/* TOOLBOX */}
        <section id="toolbox" className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Toolbox</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {/* toolbox data removed as per edit hint */}
          </div>
        </section>

        {/* NEWSLETTER/CONTACT */}
        <section id="contact" className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to my newsletter</h2>
          <p className="text-gray-600 mb-6">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto" />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
          </form>
          <div className="text-xs text-gray-400 mt-2">NO SPAM. You can unsubscribe at any time!</div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 mt-8 border-t text-center text-sm text-gray-500">
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
            <div className="mt-2">&copy; 2025 Mathan Kumar</div>
          </div>
        </footer>
      </div>
    </>
  );
}

// --- About Page ---
function About() {
  return (
    <div className="max-w-7xl mx-auto px-8 md:px-24 py-12">
      {/* Hero Section: Greeting, Heading, and Overlapping Images */}
      <div className="relative mt-4">
        <div className="relative space-y-8 md:space-y-12">
          <div className="space-y-8 relative w-full before:absolute before:top-0 before:h-px before:bg-gray-200 before:left-0 before:right-0 after:left-0 after:right-0 after:absolute after:bottom-0 after:h-px after:bg-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-24">
              {/* Left: Greeting and Heading */}
              <div className="flex-1 basis-1/2 order-2 mx-auto lg:order-1 lg:m-0 lg:pr-20">
                <div className="text-center text-sm font-medium text-indigo-600 lg:text-left mb-2 mt-8">
                  <span>Good morning!</span>
                </div>
                <h1 className="mx-auto max-w-2xl text-balance text-center text-2xl font-medium leading-tight tracking-tighter text-gray-900 md:text-3xl lg:text-left lg:text-4xl lg:leading-[48px] whitespace-nowrap">
                  I'm Mathan, a creative fullstack engineer.
                </h1>
                <p className="mt-4 mb-8 text-base md:text-lg text-gray-700 text-center lg:text-left">Here's a quick intro about me and what I love to do</p>
              </div>
              {/* Right: Overlapping Image Grid */}
              <div className="flex-1 basis-1/2 order-1 my-8 flex-shrink-0 lg:order-2 lg:my-0 flex justify-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add margin above 'My programming origins' */}
      <div className="mt-24" />

      {/* Programming Origins */}
      <section className="mb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-2">My programming origins</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <img src="https://placehold.co/200x200" alt="Programming origins" className="rounded-xl mb-4 md:mb-0" />
          <p className="text-gray-700 text-base md:text-lg">My journey in tech began with a curiosity for how things work and a love for building. I started by automating small tasks and creating simple games, which sparked my passion for software development. Over time, I taught myself to code and began freelancing, building everything from landing pages to full-stack apps.</p>
        </div>
      </section>

      {/* Finding My Way to Web */}
      <section className="mb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Finding My Way to Web</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <img src="https://placehold.co/200x200" alt="Web journey" className="rounded-xl mb-4 md:mb-0" />
          <p className="text-gray-700 text-base md:text-lg">After exploring mobile and desktop development, I found my true passion in web technologies. The creativity and rapid evolution of the web inspired me to dive deep into HTML, CSS, JavaScript, and frameworks like React. Building for the web became my playground for creativity and problem-solving.</p>
        </div>
      </section>

      {/* Life Beyond Code */}
      <section className="mb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Life Beyond Code</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <img src="https://placehold.co/200x200" alt="Life beyond code" className="rounded-xl mb-4 md:mb-0" />
          <p className="text-gray-700 text-base md:text-lg">When I'm not coding, I enjoy spending time with family, exploring new places, and tinkering with side projects. I believe in lifelong learning and maintaining a healthy balance between work and life. My curiosity drives me to keep learning and growing, both personally and professionally.</p>
        </div>
      </section>

      {/* Experience Timeline */}
      <Timeline />

      {/* Newsletter */}
      <section className="mt-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Subscribe to my newsletter</h2>
        <p className="text-gray-600 mb-6">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full sm:w-auto" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Subscribe</button>
        </form>
        <div className="text-xs text-gray-400 mt-2">NO SPAM. You can unsubscribe at any time!</div>
      </section>
    </div>
  );
}

export default App;