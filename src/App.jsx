import { useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import profilePhoto from './assets/images/ProfilePhoto.JPG'
import project1 from './assets/images/project1.png'
import project2 from './assets/images/project2.png'
import project3 from './assets/images/project3.png'
import project4 from './assets/images/project4.png'

function App() {
  const [activeSection, setActiveSection] = useState('work')

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
      link: 'https://chatbotlove.netlify.app/'
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
      <header className="py-6 px-8 flex justify-between items-center border-b border-black">
        <h1 className="text-2xl font-bold">PRINCE FODEKE</h1>
        <nav className="flex space-x-8">
          <button
            className={`${activeSection === 'work' ? 'font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('work')}
          >
            Work
          </button>
          <button
            className={`${activeSection === 'about' ? 'font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('about')}
          >
            About
          </button>
          {/* 
          <button
            className={`${activeSection === 'etc' ? 'font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveSection('etc')}
          >
            Etc.
          </button>
          */}
        </nav>
      </header>

      <div className="px-8 py-6 h-[calc(100vh-80px)]">
        {renderSection()}
      </div>
    </div>
  )
}

function WorkSection({ projects }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-8 md:mb-0 overflow-y-auto h-full">
        <h2 className="text-lg mb-4">
          Hi, I'm a Software Engineer interested in building things that make a difference.
        </h2>
        <p className="text-sm mb-6">
          Currently working on interesting projects and exploring new technologies.
        </p>
        <div className="flex space-x-4 text-sm text-gray-500">
          <a href="mailto:fodekep@gmail.com" className="hover:text-black">Email</a>
          <a href="https://github.com/pf48724/" className="hover:text-black">GitHub</a>
          <a href="https://www.linkedin.com/in/prince-fodeke/" className="hover:text-black">LinkedIn</a>
          <a href="https://open.spotify.com/user/9m1jz0rm9wxjbhkkb9nyj3d36?si=1f1bae0aa07446ff" className="hover:text-black">Spotify</a>
          <a href="https://www.instagram.com/princefword?igsh=MWkxcHUwemt1bDFnag%3D%3D&utm_source=qr" className="hover:text-black">Instagram</a>
        </div>

        <div className="mt-12">
          <div className="border-t border-black my-8"></div>
          <h3 className="section-title">ROLES</h3>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">May 2024 - August 2024</span>
            </div>
            <p className="text-sm">Worked with Spotify to analyze deeplinks for anomalies. Improved Spotify’s anomaly detection by 25% through optimizing data pipelines and building predictive algorithms for link performance.</p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Developer</h4>
              <span className="text-sm">August 2023 - February 2024</span>
            </div>
            <p className="text-sm">Contributed to designing and building a full-stack application to streamline the TA hiring process at Georgia Tech. Integrated tools and workflows to assist with resume parsing and candidate ranking, reducing hiring time by 40% and helping departments make more informed decisions, faster.</p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">June 2023 - August 2023</span>
            </div>
            <p className="text-sm">Improved large-scale data validation workflows by developing efficient algorithms that increased processing speed and reliability. Worked closely with engineering and data stakeholders to ensure accuracy across critical datasets.</p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">Software Engineer Intern</h4>
              <span className="text-sm">May 2022 - August 2022</span>
            </div>
            <p className="text-sm">Developed backend services on GCP to handle real-time messaging at scale. Refactored validation logic and streamlined API performance, leading to a 30% improvement in processing speed and reduced system latency.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 overflow-y-auto h-full pl-4 pr-2">
        <h3 className="section-title">Selected Work</h3>
        <div className="mb-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex justify-between items-center hover-lift ${index !== projects.length - 1 ? 'py-4 border-b border-gray-200' : 'pt-4 -mb-4'}`}
              whileHover={{ x: 5 }}
              onClick={() => handleProjectClick(project)}
            >
              <span className="font-medium cursor-pointer">{project.title}</span>
              <span className="text-gray-500 text-sm">{project.category}</span>
            </motion.div>
          ))}
        </div>

        {selectedProject && (
          <div className="">
            <div className="section-divider"></div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="mb-6 text-gray-700 leading-relaxed">
                {selectedProject.description}
              </p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-8 md:mb-0 overflow-y-auto h-full">
        <img
          src={profilePhoto}
          alt="Prince Fodeke"
          className="aspect-square object-cover rounded-lg mb-4 w-full"
        />
      </div>

      <div className="w-full md:w-2/3 overflow-y-auto h-full pl-4 pr-2">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">Hi, I'm Prince Fodeke.</h2>
        <p className="mb-6">
          I recently graduated from the Georgia Institute of Technology where I studied Computer Science with a focus on Machine Learning and Human Computer Interaction.

          I am open to most things but I am particularly interested in working on projects that drive innovation in existing areas and look to offer new solutions to old problems.
        </p>

        <p className="mb-6">
          <span className="font-medium">Things I'm interested in right now:</span> Backend development, Machine Learning, Full stack development, Data Science, Human Computer Interaction
        </p>

        <p className="mb-6">
          <span className="font-medium">Things I enjoy:</span> Chilling with friends, Changing my music taste, Skateboarding, Cooking, Horror movies, Getting good at new things, Playing chess (poorly)
        </p>

        <p className="mb-6">
          <span className="font-medium">Current favorites:</span>
          <ul className="ml-4 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <span className="font-bold">Books</span>
                <span className="italic">: Things Fall Apart, God Emperor of Dune, A Series of Unfortunate Events: The End, All Tomorrows</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <span className="font-bold">Movies</span>
                <span className="italic">: Akira, EEAO, Parasite, Kill Bill 1 & 2, Spirited Away</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span className="font-bold">Games</span>
              <span className="italic">: The Last of Us, Bioshock 2, Hades, EtG, Catan</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span className="font-bold">TV Shows</span>
              <span className="italic">: Breaking Bad, Snowfall, ATLA </span>
            </li>
          </ul>

        </p>
      </div>
    </div>
  )
}

/*
function EtcSection() {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">
        These items are presented without comment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
          <motion.div
            key={item}
            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 hover-lift"
            whileHover={{ y: -4 }}
          >
            <p className="text-gray-600">Gallery Item {item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
*/

export default App
