import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import profilePhoto from './assets/images/ProfilePhoto.JPG'
import project1 from './assets/images/project1.png'
import project2 from './assets/images/project2.png'
import project3 from './assets/images/project3.png'
import project4 from './assets/images/project4.png'

function App() {
  const [activeSection, setActiveSection] = useState('work')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: 'LastFM Song Recommender',
      category: 'Machine Learning',
      description: 'Music recommender that blends Last.fm data with tag-based vector embeddings and k-NN search for personalized track suggestions.',
      image: project1,
      link: 'https://github.com/pf48724/lastfm-recommendations'
    },
    {
      id: 3,
      title: 'Pattern Learning RPS',
      category: 'AI Game Development',
      description: 'A rock paper scissors opponent that learns from your moves using markov chains and pattern recognition',
      image: project2,
      link: 'https://github.com/pf48724/rps'
    },
    {
      id: 3,
      title: 'Chatbot',
      category: 'UI/UX Design',
      description: 'This ChatBot loves you',
      image: project3,
      link: 'https://github.com/pf48724/chatbot'
    },
    {
      id: 4,
      title: 'Rocket',
      category: 'Web Animation',
      description: 'Simple rocket animation made using p5.js.',
      image: project4,
      link: 'https://pf48724.github.io/Rocket/'
    }
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'work':
        return <WorkSection projects={projects} />
      case 'about':
        return <AboutSection />
      /*
      case 'etc':
        return <EtcSection />
      */
      default:
        return <WorkSection projects={projects} />
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className={`py-6 px-8 flex justify-between items-center border-b border-black sticky top-0 z-50 bg-white transition-all duration-300 ${scrollY > 20 ? 'shadow-sm' : ''}`}>
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PRINCE FODEKE
        </motion.h1>
        <nav className="flex space-x-8">
          <motion.button
            className={`nav-link ${activeSection === 'work' ? 'active font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('work')}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Work
 
          </motion.button>
          <motion.button
            className={`nav-link ${activeSection === 'about' ? 'active font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('about')}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            About
          </motion.button>
          {/* 
          <motion.button
            className={`nav-link ${activeSection === 'etc' ? 'active font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('etc')}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Etc.
          </motion.button>
          */}
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-8 py-6 min-h-[calc(100vh-80px)]"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function WorkSection({ projects }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-8 md:mb-0 overflow-y-auto h-[calc(100vh-120px)]">
        <motion.h2 
          className="text-xl mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Hi, I'm a Software Engineer passionate about building things that make a difference.
        </motion.h2>
        <motion.p 
          className="text-sm mb-6 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Currently working on interesting projects and exploring new technologies.
        </motion.p>
        <motion.div 
          className="social-links flex flex-wrap gap-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="mailto:fodekep@gmail.com" className="hover:text-blue-600">Email</a>
          <a href="https://github.com/pf48724/" className="hover:text-blue-600">GitHub</a>
          <a href="https://www.linkedin.com/in/prince-fodeke/" className="hover:text-blue-600">LinkedIn</a>
          <a href="https://open.spotify.com/user/9m1jz0rm9wxjbhkkb9nyj3d36?si=1f1bae0aa07446ff" className="hover:text-blue-600">Spotify</a>
          <a href="https://www.instagram.com/princefword?igsh=MWkxcHUwemt1bDFnag%3D%3D&utm_source=qr" className="hover:text-blue-600">Instagram</a>
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="border-t border-black my-8"></div>
          <h3 className="section-title">EXPERIENCE</h3>
          <div className="mb-6 hover-lift p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">May 2024 - August 2024</span>
            </div>
            <p className="text-sm">Worked with Spotify to analyze deeplinks for anomalies. Improved Spotify's anomaly detection by 25% through optimizing data pipelines and building predictive algorithms for link performance.</p>
          </div>
          <div className="mb-6 hover-lift p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Developer</h4>
              <span className="text-sm">August 2023 - February 2024</span>
            </div>
            <p className="text-sm">Contributed to designing and building a full-stack application to streamline the TA hiring process at Georgia Tech. Integrated tools and workflows to assist with resume parsing and candidate ranking, reducing hiring time by 40% and helping departments make more informed decisions, faster.</p>
          </div>
          <div className="mb-6 hover-lift p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">June 2023 - August 2023</span>
            </div>
            <p className="text-sm">Improved large-scale data validation workflows by developing efficient algorithms that increased processing speed and reliability. Worked closely with engineering and data stakeholders to ensure accuracy across critical datasets.</p>
          </div>
          <div className="mb-6 hover-lift p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">May 2022 - August 2022</span>
            </div>
            <p className="text-sm">Developed backend services on GCP to handle real-time messaging at scale. Refactored validation logic and streamlined API performance, leading to a 30% improvement in processing speed and reduced system latency.</p>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-2/3 overflow-y-auto h-[calc(100vh-120px)] pl-4 pr-2">
        <motion.h3 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          SELECTED WORK
        </motion.h3>
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex justify-between items-center hover-lift p-3 rounded-lg cursor-pointer ${index !== projects.length - 1 ? 'mb-2' : ''}`}
              whileHover={{ x: 5, backgroundColor: '#f9fafb' }}
              onClick={() => handleProjectClick(project)}
            >
              <span className="font-medium">{project.title}</span>
              <span className="text-gray-500 text-sm">{project.category}</span>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div 
              key={selectedProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="project-card"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{selectedProject.category}</p>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  {selectedProject.description}
                </p>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project →
                </a>
              </div>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden"
              >
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-8 md:mb-0 overflow-y-auto h-[calc(100vh-120px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={profilePhoto}
            alt="Prince Fodeke"
            className="aspect-square object-cover rounded-lg mb-4 w-full shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </motion.div>
      </div>

      <div className="w-full md:w-2/3 overflow-y-auto h-[calc(100vh-120px)] pl-4 pr-2">
        <motion.h2 
          className="text-3xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Hi, I'm Prince Fodeke.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="mb-6 text-gray-800 leading-relaxed">
            I recently graduated from the Georgia Institute of Technology where I studied Computer Science with a focus on Machine Learning and Human Computer Interaction. I am open to most things but I am particularly interested in working on projects that drive innovation in existing areas and look to offer new solutions to old problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
            <h3 className="font-medium mb-2">Things I'm exploring right now:</h3>
            <div className="flex flex-wrap gap-2 min-h-[120px]">
              <span className="inline-block px-2 py-1 bg-blue-50 rounded border border-gray-200 shadow-sm">Backend development</span>
              <span className="inline-block px-2 py-1 bg-green-50 rounded border border-gray-200 shadow-sm">Machine Learning</span>
              <span className="inline-block px-2 py-1 bg-purple-50 rounded border border-gray-200 shadow-sm">Full stack development</span>
              <span className="inline-block px-2 py-1 bg-yellow-50 rounded border border-gray-200 shadow-sm">Data Science</span>
              <span className="inline-block px-2 py-1 bg-pink-50 rounded border border-gray-200 shadow-sm">Human Computer Interaction</span>
              <span className="inline-block px-2 py-1 bg-orange-50 rounded border border-gray-200 shadow-sm">Frontend development</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
            <h3 className="font-medium mb-2">Things I enjoy:</h3>
            <div className="flex flex-wrap gap-2 min-h-[220px]">
              <span className="inline-block px-2 py-1 bg-green-50 rounded border border-gray-200 shadow-sm">Hanging out with friends</span>
              <span className="inline-block px-2 py-1 bg-blue-50 rounded border border-gray-200 shadow-sm">Changing my music taste</span>
              <span className="inline-block px-2 py-1 bg-yellow-50 rounded border border-gray-200 shadow-sm">Skateboarding</span>
              <span className="inline-block px-2 py-1 bg-red-50 rounded border border-gray-200 shadow-sm">Cooking</span>
              <span className="inline-block px-2 py-1 bg-purple-50 rounded border border-gray-200 shadow-sm">Horror movies</span>
              <span className="inline-block px-2 py-1 bg-indigo-50 rounded border border-gray-200 shadow-sm">Getting good at new things</span>
              <span className="inline-block px-2 py-1 bg-orange-50 rounded border border-gray-200 shadow-sm">Playing chess (poorly)</span>
              <span className="inline-block px-2 py-1 bg-teal-50 rounded border border-gray-200 shadow-sm">Playing the drums</span>
              <span className="inline-block px-2 py-1 bg-pink-50 rounded border border-gray-200 shadow-sm">Eating at new places</span>
              <span className="inline-block px-2 py-1 bg-amber-50 rounded border border-gray-200 shadow-sm">Cooking new things</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-medium mb-3">Current favorites:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
              <h4 className="font-bold mb-2">Books</h4>
              <div className="flex flex-wrap gap-2 min-h-[120px]">
                <span className="inline-block px-2 py-1 bg-indigo-50 italic rounded border border-gray-200 shadow-sm">Things Fall Apart</span>
                <span className="inline-block px-2 py-1 bg-indigo-50 italic rounded border border-gray-200 shadow-sm">God Emperor of Dune</span>
                <span className="inline-block px-2 py-1 bg-indigo-50 italic rounded border border-gray-200 shadow-sm">A Series of Unfortunate Events: The End</span>
                <span className="inline-block px-2 py-1 bg-indigo-50 italic rounded border border-gray-200 shadow-sm">All Tomorrows</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
              <h4 className="font-bold mb-2">Movies</h4>
              <div className="flex flex-wrap gap-2 min-h-[180px]">
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Akira</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">EEAO</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Parasite</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Kill Bill 1 & 2</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Spirited Away</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Eternal Sunshine of the Spotless Mind</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Us</span>
                <span className="inline-block px-2 py-1 bg-red-50 italic rounded border border-gray-200 shadow-sm">Inglorious Basterds</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
              <h4 className="font-bold mb-2">Games</h4>
              <div className="flex flex-wrap gap-2 min-h-[180px]">
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">The Last of Us</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Bioshock 2</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Hades</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">EtG</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Catan</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Slay the Spire</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Darkest Dungeon</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Astroneer</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Furi</span>
                <span className="inline-block px-2 py-1 bg-green-50 italic rounded border border-gray-200 shadow-sm">Have a Nice Death</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift">
              <h4 className="font-bold mb-2">TV Shows</h4>
              <div className="flex flex-wrap gap-2 min-h-[120px]">
                <span className="inline-block px-2 py-1 bg-blue-50 italic rounded border border-gray-200 shadow-sm">Breaking Bad</span>
                <span className="inline-block px-2 py-1 bg-blue-50 italic rounded border border-gray-200 shadow-sm">Snowfall</span>
                <span className="inline-block px-2 py-1 bg-blue-50 italic rounded border border-gray-200 shadow-sm">ATLA</span>
                <span className="inline-block px-2 py-1 bg-blue-50 italic rounded border border-gray-200 shadow-sm">Dexter</span>
                <span className="inline-block px-2 py-1 bg-blue-50 italic rounded border border-gray-200 shadow-sm">Invincible</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function EtcSection() {
  const galleryItems = [
    { id: 1, type: 'sketch', label: 'Sketch 1' },
    { id: 2, type: 'photo', label: 'Photo 1' },
    { id: 3, type: 'exploration', label: 'Exploration 1' },
    { id: 4, type: 'sketch', label: 'Sketch 2' },
    { id: 5, type: 'photo', label: 'Photo 2' },
    { id: 6, type: 'exploration', label: 'Exploration 2' },
    { id: 7, type: 'sketch', label: 'Sketch 3' },
    { id: 8, type: 'photo', label: 'Photo 3' },
    { id: 9, type: 'exploration', label: 'Exploration 3' }
  ];

  const colors = [
    'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 
    'bg-purple-50', 'bg-pink-50', 'bg-indigo-50',
    'bg-red-50', 'bg-orange-50', 'bg-teal-50'
  ];

  return (
    <div className="h-full overflow-y-auto pr-2">
      <motion.h2 
        className="text-2xl font-bold mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        A growing collection of personal sketches, explorations, and snapshots
      </motion.h2>
      
      <motion.p
        className="mb-8 text-gray-700 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        I wouldn't call myself an artist or photographer by any means, but documenting my life through various media is something that grounds me. Here are some personal projects and moments that I've captured.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, staggerChildren: 0.1 }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`aspect-square ${colors[index % colors.length]} rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 hover-lift p-4`}
            whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="text-center">
              <p className="text-gray-800 font-medium mb-2">{item.label}</p>
              <p className="text-gray-500 text-sm capitalize">{item.type}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default App
