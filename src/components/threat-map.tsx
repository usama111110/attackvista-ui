
import { useState, useEffect } from "react";

export function ThreatMap() {
  const [attackPoints, setAttackPoints] = useState<Array<{x: number, y: number, size: number}>>([]);
  
  // Simulate random attack points
  useEffect(() => {
    // Initial points
    const initialPoints = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.2, // Size between 0.2 and 1
    }));
    
    setAttackPoints(initialPoints);
    
    // Add new points periodically
    const interval = setInterval(() => {
      setAttackPoints(prev => {
        // Remove some old points
        const filtered = prev.filter(() => Math.random() > 0.3).slice(-10);
        
        // Add a new point
        if (Math.random() > 0.5) {
          return [
            ...filtered, 
            {
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 0.8 + 0.2,
            }
          ];
        }
        
        return filtered;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-[300px] bg-world-map bg-no-repeat bg-center bg-contain">
      {/* Render attack points */}
      {attackPoints.map((point, i) => (
        <div 
          key={i}
          className="absolute w-3 h-3 rounded-full animate-ping"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            left: `${point.x}%`,
            top: `${point.y}%`,
            opacity: 0.7,
            transform: `scale(${point.size})`,
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
          }}
        />
      ))}
      
      {/* Placeholder world map image */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
        [World map visualization - Points represent attack origins]
      </div>
    </div>
  );
}
