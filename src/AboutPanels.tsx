import React, { useState } from 'react';
import { motion } from 'framer-motion';
import modern from './imgs/modern.png';
import song from './imgs/song.jpg';
import book from './imgs/bookcover.jpeg';
import f1 from './imgs/f1.jpeg';
import g2 from './imgs/g2.png';

// --- Recent Favorite Card ---
function RecentFavoriteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <h3 className="font-bold text-xl text-gray-900 mb-4">Recent Favorite</h3>
      <div className="space-y-3">
       {/* <div className="text-lg font-bold text-gray-800">"The Sun Yet Shines"</div>
        <div className="text-base font-semibold text-gray-700">Bear McCreary</div>
        <div className="text-sm font-bold text-gray-600">The Lord of the Rings: The Rings of Power</div>*/}
        <div className="mt-4 relative group">
          <motion.img 
            src={song} 
            alt="Album Cover" 
            className="w-60 h-65 rounded-xl shadow-md object-cover cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Flying Music Notes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Music Note 1 */}
            <motion.div
              className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎵
            </motion.div>
            
            {/* Music Note 2 */}
            <motion.div
              className="absolute top-8 left-4 text-xl opacity-0 group-hover:opacity-100"
              animate={{
                y: [0, -15, 0],
                x: [0, -8, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              🎶
            </motion.div>
            
            {/* Music Note 3 */}
            <motion.div
              className="absolute bottom-4 right-6 text-lg opacity-0 group-hover:opacity-100"
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              🎼
            </motion.div>
            
            {/* Music Note 4 */}
            <motion.div
              className="absolute bottom-8 left-2 text-xl opacity-0 group-hover:opacity-100"
              animate={{
                y: [0, -18, 0],
                x: [0, -12, 0],
                rotate: [0, -180],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              🎤
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Scrapbook Card ---
function ScrapbookCard() {
  const stickers = [
    { src: 'https://placehold.co/80x80', label: 'Book Cover', color: 'bg-blue-100' },
    { src: 'https://placehold.co/80x80', label: 'Logo', color: 'bg-green-100' },
    { src: 'https://placehold.co/80x80', label: 'LOTR', color: 'bg-yellow-100' },
    { src: 'https://placehold.co/80x80', label: 'Code', color: 'bg-purple-100' },
    { src: 'https://placehold.co/80x80', label: 'Script', color: 'bg-pink-100' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
      style={{
        backgroundImage: `
          radial-gradient(circle, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      <h3 className="font-bold text-xl text-gray-900 mb-6">Scrapbook</h3>
      <div className="flex gap-4 justify-center items-center">
        {stickers.map((sticker, index) => (
          <motion.div
            key={index}
            className={`${sticker.color} rounded-xl p-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img 
              src={sticker.src} 
              alt={sticker.label}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="text-xs font-medium text-gray-600 mt-2 text-center">{sticker.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- My All Time Favs Card ---
function AllTimeFavsCard() {
  const favorites = [
    { src: g2, label: 'Movie', tooltip: 'GOT is the GOAT of all time!!' },
    { src: 'https://placehold.co/80x80', label: 'Book', tooltip: 'Sample book description\nSecond line of text\nThird line here' },
    { src: 'https://placehold.co/80x80', label: 'Game', tooltip: 'Sample game description\nSecond line of text\nThird line here' },
    { src: 'https://placehold.co/80x80', label: 'Album', tooltip: 'Sample album description\nSecond line of text\nThird line here' },
    { src: modern, label: 'Series', tooltip: 'Modern Family, epic Sitcom that I love watched N number of times and counting...' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 2px),
          linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <h3 className="font-bold text-xl text-gray-900 mb-6">My All Time Favs</h3>
      <div className="flex gap-12 justify-center items-center">
        {favorites.map((favorite, index) => (
          <div key={index} className="relative group cursor-pointer">
            <motion.img
              src={favorite.src}
              alt={favorite.label}
              className={`transition-all transform hover:-translate-y-1 hover:scale-105 ${index === 4 ? 'w-24 h-24' : 'w-16 h-16'}`}
              style={index === 4 ? { transform: 'rotate(30deg)' } : {}}
              whileHover={{ 
                scale: 1.05,
                rotate: index === 4 ? 70 : 0,
                y: [-5, 5, -5],
                transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
            {/* Tooltip */}
            <motion.div 
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-white text-gray-800 text-sm rounded-lg shadow-lg whitespace-pre-line z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-gray-200 min-w-[200px]"
              whileHover={{ 
                y: [-3, 3, -3],
                transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {favorite.tooltip}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Currently Reading Card ---
function CurrentlyReadingCard() {
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [isMovieHovered, setIsMovieHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <h3 className="font-bold text-xl text-gray-900 mb-4">Currently Reading/Watched</h3>
      <div className="flex items-center justify-center gap-0">
        {/* First image with floating words */}
        <div className="relative group"
          onMouseEnter={() => setIsBookHovered(true)}
          onMouseLeave={() => setIsBookHovered(false)}
        >
          <motion.img
            src={book}
            alt="Book Cover"
            className="w-24 h-40 object-cover rounded-lg shadow-md cursor-pointer"
            whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(120, 80, 255, 0.15)' }}
            transition={{ duration: 0.2 }}
          />
          {/* Floating Words Animation (only when hovered) */}
          {isBookHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Word 1 */}
              <motion.div
                className="absolute top-2 left-2 text-xs text-white font-bold drop-shadow-lg"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0, 8, 0],
                  x: [0, 8, 0, -8, 0],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                Epic
              </motion.div>
              {/* Word 2 */}
              <motion.div
                className="absolute top-8 right-4 text-xs text-white font-bold drop-shadow-lg"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, 8, 0, -8, 0],
                  x: [0, -8, 0, 8, 0],
                }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                Gripping
              </motion.div>
              {/* Word 3 */}
              <motion.div
                className="absolute bottom-6 left-6 text-xs text-white font-bold drop-shadow-lg"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, 10, 0, -10, 0],
                  x: [0, -10, 0, 10, 0],
                }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                Thriller
              </motion.div>
              {/* Word 4 */}
              <motion.div
                className="absolute bottom-2 right-2 text-xs text-white font-bold drop-shadow-lg"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0, 10, 0],
                  x: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                Bestseller
              </motion.div>
            </div>
          )}
        </div>
        {/* Vertical separator */}
        <div className="h-36 w-px bg-gray-200 mx-6" />
        {/* Second image with flying car emojis */}
        <div className="relative group"
          onMouseEnter={() => setIsMovieHovered(true)}
          onMouseLeave={() => setIsMovieHovered(false)}
        >
          <motion.img
            src={f1}
            alt="movie poster"
            className="w-24 h-40 object-cover rounded-lg shadow-md cursor-pointer"
            whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(120, 80, 255, 0.15)' }}
            transition={{ duration: 0.2 }}
          />
          {/* Flying Car Emojis Animation (only when hovered) */}
          {isMovieHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Car Emoji 1 */}
              <motion.div
                className="absolute top-2 left-2 text-2xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -20, -40],
                  x: [0, 10, 20],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                🏎️
              </motion.div>
              {/* Car Emoji 2 */}
              <motion.div
                className="absolute top-8 right-4 text-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -15, -30],
                  x: [0, -8, -16],
                }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                🚗
              </motion.div>
              {/* Car Emoji 3 */}
              <motion.div
                className="absolute bottom-6 left-6 text-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -18, -36],
                  x: [0, 12, 24],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                🏁
              </motion.div>
              {/* Car Emoji 4 */}
              <motion.div
                className="absolute bottom-2 right-2 text-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -12, -24],
                  x: [0, -10, -20],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                🚦
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- My Fav Quote Card ---
function FavQuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <h3 className="font-bold text-xl text-gray-900 mb-4">My Fav Quote of All Time</h3>
      <blockquote className="text-lg italic text-gray-700 text-center">
        "Making yourself happy again and creating the life you really want is the biggest comeback."
      </blockquote>
    </motion.div>
  );
}

// --- Currently Learning Card ---
function CurrentlyLearningCard() {
  const learnings = [
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      label: 'Next.js',
      desc: 'Building fast, modern web apps with server-side magic! ✨'
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      label: 'Docker',
      desc: 'Containerizing everything for smooth sailing deployments! 🐳'
    },
    {
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leaf/leaf-green.svg', // fallback to emoji if not found
      label: 'Gardening',
      desc: 'Growing little green friends and learning patience. 🌱'
    }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <h3 className="font-bold text-xl text-gray-900 mb-4">Currently Learning</h3>
      <div className="flex flex-col gap-4">
        {learnings.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            {item.icon.startsWith('http') ? (
              <img src={item.icon} alt={item.label} className="w-10 h-10 object-contain rounded-lg bg-gray-50 border" />
            ) : (
              <span className="text-3xl">{item.icon}</span>
            )}
            <div>
              <div className="font-semibold text-gray-800">{item.label}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPanels() {
  return (
    <section className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <RecentFavoriteCard />
          <div className="lg:col-span-2">
            <ScrapbookCard />
            <div className="mt-8">
              <AllTimeFavsCard />
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CurrentlyReadingCard />
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FavQuoteCard />
              <CurrentlyLearningCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 