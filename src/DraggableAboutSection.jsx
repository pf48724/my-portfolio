import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Draggable from 'react-draggable'
import profilePhoto from './assets/images/ProfilePhoto.JPG'

function DraggableAboutSection() {
  const [positions, setPositions] = useState({
    exploring: { x: 0, y: 0 },
    enjoy: { x: 0, y: 0 },
    books: { x: 0, y: 0 },
    movies: { x: 0, y: 0 },
    games: { x: 0, y: 0 },
    tvShows: { x: 0, y: 0 }
  });
  
  const gridRef = useRef(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateGridSize = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setGridSize({ width: rect.width, height: rect.height });
        setCellSize({ 
          width: rect.width / 2, 
          height: rect.height / 2 
        });
      }
    };
    
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    
    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, []);
  
  const handleGridDragStop = (e, data, item) => {
    const cellX = Math.round(data.x / cellSize.width) * cellSize.width;
    const cellY = Math.round(data.y / cellSize.height) * cellSize.height;
    
    const newX = Math.max(0, Math.min(cellX, cellSize.width));
    const newY = Math.max(0, Math.min(cellY, cellSize.height));
    
    setPositions(prev => ({
      ...prev,
      [item]: { x: newX, y: newY }
    }));
  };
  
  const handleVerticalDragStop = (e, data, item) => {
    // Only allow vertical movement
    const newY = Math.max(-100, Math.min(data.y, 100));
    
    setPositions(prev => ({
      ...prev,
      [item]: { x: 0, y: newY }
    }));
  };

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
            I recently graduated from the Georgia Institute of Technology where I studied Computer Science with a focus on Machine Learning and Human Computer Interaction.
          </p>
          <p className="mb-6 text-gray-800 leading-relaxed">
            I am open to most things but I am particularly interested in working on projects that drive innovation in existing areas and look to offer new solutions to old problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Draggable
            axis="y"
            bounds={{ top: -100, bottom: 100 }}
            position={positions.exploring}
            onStop={(e, data) => handleVerticalDragStop(e, data, 'exploring')}
          >
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
              <h3 className="font-medium mb-2">Things I'm exploring right now:</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="inline-block px-2 py-1 bg-blue-50 rounded mr-1 mb-1">Backend development</span>
                <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1">Machine Learning</span>
                <span className="inline-block px-2 py-1 bg-purple-50 rounded mr-1 mb-1">Full stack development</span>
                <span className="inline-block px-2 py-1 bg-yellow-50 rounded mr-1 mb-1">Data Science</span>
                <span className="inline-block px-2 py-1 bg-pink-50 rounded mr-1 mb-1">Human Computer Interaction</span>
              </p>
            </div>
          </Draggable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Draggable
            axis="y"
            bounds={{ top: -100, bottom: 100 }}
            position={positions.enjoy}
            onStop={(e, data) => handleVerticalDragStop(e, data, 'enjoy')}
          >
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
              <h3 className="font-medium mb-2">Things I enjoy:</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1">Hanging out with friends</span>
                <span className="inline-block px-2 py-1 bg-blue-50 rounded mr-1 mb-1">Changing my music taste</span>
                <span className="inline-block px-2 py-1 bg-yellow-50 rounded mr-1 mb-1">Skateboarding</span>
                <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1">Cooking</span>
                <span className="inline-block px-2 py-1 bg-purple-50 rounded mr-1 mb-1">Horror movies</span>
                <span className="inline-block px-2 py-1 bg-indigo-50 rounded mr-1 mb-1">Getting good at new things</span>
                <span className="inline-block px-2 py-1 bg-orange-50 rounded mr-1 mb-1">Playing chess (poorly)</span>
              </p>
            </div>
          </Draggable>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-medium mb-3">Current favorites:</h3>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <Draggable
              bounds="parent"
              position={positions.books}
              onStop={(e, data) => handleGridDragStop(e, data, 'books')}
              grid={[cellSize.width, cellSize.height]}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
                <h4 className="font-bold mb-2">Books</h4>
                <p className="text-gray-700">
                  <span className="inline-block px-2 py-1 bg-indigo-50 rounded mr-1 mb-1 italic">Things Fall Apart</span>
                  <span className="inline-block px-2 py-1 bg-indigo-50 rounded mr-1 mb-1 italic">God Emperor of Dune</span>
                  <span className="inline-block px-2 py-1 bg-indigo-50 rounded mr-1 mb-1 italic">A Series of Unfortunate Events: The End</span>
                  <span className="inline-block px-2 py-1 bg-indigo-50 rounded mr-1 mb-1 italic">All Tomorrows</span>
                </p>
              </div>
            </Draggable>
            
            <Draggable
              bounds="parent"
              position={positions.movies}
              onStop={(e, data) => handleGridDragStop(e, data, 'movies')}
              grid={[cellSize.width, cellSize.height]}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
                <h4 className="font-bold mb-2">Movies</h4>
                <p className="text-gray-700">
                  <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1 italic">Akira</span>
                  <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1 italic">EEAO</span>
                  <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1 italic">Parasite</span>
                  <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1 italic">Kill Bill 1 & 2</span>
                  <span className="inline-block px-2 py-1 bg-red-50 rounded mr-1 mb-1 italic">Spirited Away</span>
                </p>
              </div>
            </Draggable>
            
            <Draggable
              bounds="parent"
              position={positions.games}
              onStop={(e, data) => handleGridDragStop(e, data, 'games')}
              grid={[cellSize.width, cellSize.height]}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
                <h4 className="font-bold mb-2">Games</h4>
                <p className="text-gray-700">
                  <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1 italic">The Last of Us</span>
                  <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1 italic">Bioshock 2</span>
                  <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1 italic">Hades</span>
                  <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1 italic">EtG</span>
                  <span className="inline-block px-2 py-1 bg-green-50 rounded mr-1 mb-1 italic">Catan</span>
                </p>
              </div>
            </Draggable>
            
            <Draggable
              bounds="parent"
              position={positions.tvShows}
              onStop={(e, data) => handleGridDragStop(e, data, 'tvShows')}
              grid={[cellSize.width, cellSize.height]}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover-lift cursor-move">
                <h4 className="font-bold mb-2">TV Shows</h4>
                <p className="text-gray-700">
                  <span className="inline-block px-2 py-1 bg-blue-50 rounded mr-1 mb-1 italic">Breaking Bad</span>
                  <span className="inline-block px-2 py-1 bg-blue-50 rounded mr-1 mb-1 italic">Snowfall</span>
                  <span className="inline-block px-2 py-1 bg-blue-50 rounded mr-1 mb-1 italic">ATLA</span>
                </p>
              </div>
            </Draggable>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DraggableAboutSection
