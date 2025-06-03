import { useState, useEffect, useRef } from 'react';

function DraggableTag({ children, id, className, index = 0 }) {
  const tagRef = useRef(null);
  const tagId = `tag-${id}`;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    try {
      const savedPosition = localStorage.getItem(tagId);
      if (savedPosition) {
        return JSON.parse(savedPosition);
      } else {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return { 
          x: col * 20, 
          y: row * 30 
        };
      }
    } catch (error) {
      console.error("Error loading position from localStorage:", error);
      return { x: index * 10, y: index * 10 };
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(tagId, JSON.stringify(position));
    } catch (error) {
      console.error("Error saving position to localStorage:", error);
    }
  }, [position, tagId]);
  
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
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {children}
    </div>
  );
}

export default DraggableTag;
