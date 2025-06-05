import { useState, useEffect, useRef } from 'react';

const API_URL = '/.netlify/functions';

function DraggableTag({ children, id, className, index = 0 }) {
  const tagRef = useRef(null);
  const tagId = `tag-${id}`;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/getPositions`);
        if (!response.ok) {
          throw new Error('Failed to fetch positions');
        }
        
        const data = await response.json();
        
        if (data[tagId]) {
          setPosition(data[tagId]);
        } else {
          const row = Math.floor(index / 3);
          const col = index % 3;
          setPosition({ 
            x: col * 20, 
            y: row * 30 
          });
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
        const row = Math.floor(index / 3);
        const col = index % 3;
        setPosition({ 
          x: col * 20, 
          y: row * 30 
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPositions();
  }, [tagId, index]);
  
  useEffect(() => {
    const savePosition = async () => {
      if (isLoading || isDragging) return;
      
      try {
        const response = await fetch(`${API_URL}/updatePosition/${tagId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ position }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save position');
        }
      } catch (error) {
        console.error('Error saving position:', error);
        try {
          localStorage.setItem(tagId, JSON.stringify(position));
        } catch (localError) {
          console.error('Error saving to localStorage:', localError);
        }
      }
    };
    
    savePosition();
  }, [position, tagId, isLoading, isDragging]);
  
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault();
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    };
    
    const parent = tagRef.current.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const tagRect = tagRef.current.getBoundingClientRect();
    
    const maxX = parentRect.width - tagRect.width;
    const maxY = parentRect.height - tagRect.height;
    
    newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
    newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));
    
    setPosition(newPosition);
    e.preventDefault();
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);
  
  return (
    <div
      ref={tagRef}
      className={`inline-block px-2 py-1 ${className} rounded mr-1 mb-1 cursor-move z-10 absolute`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: 'none',
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {children}
    </div>
  );
}

export default DraggableTag;
