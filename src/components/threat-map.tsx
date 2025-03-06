import { useState, useEffect, useMemo } from "react";
import { Globe, Loader2 } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface AttackPoint {
  id: string;
  lat: number;
  lng: number;
  size: number;
  intensity: number;
  country: string;
}

// List of country coordinates for random attack generation
const COUNTRY_COORDINATES = [
  { country: "United States", lat: 37.0902, lng: -95.7129 },
  { country: "China", lat: 35.8617, lng: 104.1954 },
  { country: "Russia", lat: 61.5240, lng: 105.3188 },
  { country: "Brazil", lat: -14.2350, lng: -51.9253 },
  { country: "India", lat: 20.5937, lng: 78.9629 },
  { country: "United Kingdom", lat: 55.3781, lng: -3.4360 },
  { country: "Germany", lat: 51.1657, lng: 10.4515 },
  { country: "Australia", lat: -25.2744, lng: 133.7751 },
  { country: "Japan", lat: 36.2048, lng: 138.2529 },
  { country: "Canada", lat: 56.1304, lng: -106.3468 },
  { country: "South Korea", lat: 35.9078, lng: 127.7669 },
  { country: "Iran", lat: 32.4279, lng: 53.6880 },
  { country: "North Korea", lat: 40.3399, lng: 127.5101 },
  { country: "France", lat: 46.2276, lng: 2.2137 },
  { country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { country: "Ukraine", lat: 49.2827, lng: 31.2719 },
  { country: "Israel", lat: 31.0461, lng: 34.8516 },
  { country: "Romania", lat: 45.9432, lng: 24.9668 },
  { country: "Indonesia", lat: -0.7893, lng: 113.9213 },
  { country: "Nigeria", lat: 9.0820, lng: 8.6753 },
];

export function ThreatMap() {
  const { isDarkMode } = useTheme();
  const [attackPoints, setAttackPoints] = useState<AttackPoint[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Creates threat marker points with randomization
  const generateRandomAttackPoints = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const randomCountry = COUNTRY_COORDINATES[Math.floor(Math.random() * COUNTRY_COORDINATES.length)];
      // Add some randomness to the coordinates to spread attacks
      const latVariance = (Math.random() - 0.5) * 10;
      const lngVariance = (Math.random() - 0.5) * 10;
      
      return {
        id: `attack-${Date.now()}-${i}`,
        lat: randomCountry.lat + latVariance,
        lng: randomCountry.lng + lngVariance,
        size: Math.random() * 0.8 + 0.2, // Size between 0.2 and 1
        intensity: Math.random(),
        country: randomCountry.country
      };
    });
  };
  
  // Convert geo coordinates to x,y position in the map container
  const geoToPixel = (lat: number, lng: number, width: number, height: number) => {
    // Simple Mercator projection
    const x = (lng + 180) * (width / 360);
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const y = (height / 2) - (width * mercN / (2 * Math.PI));
    return { x, y };
  };
  
  // Simulate random attack points
  useEffect(() => {
    // Initial points
    const initialPoints = generateRandomAttackPoints(10);
    setAttackPoints(initialPoints);
    setLoading(false);
    
    // Add new points periodically
    const interval = setInterval(() => {
      setAttackPoints(prev => {
        // Remove some old points to keep the visualization clean
        const filtered = prev.filter(() => Math.random() > 0.3).slice(-15);
        
        // Add new points with varying probability
        if (Math.random() > 0.4) {
          const newPoints = generateRandomAttackPoints(Math.floor(Math.random() * 3) + 1);
          return [...filtered, ...newPoints];
        }
        
        return filtered;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // World regions for the map visualization
  const worldRegions = useMemo(() => [
    { name: "North America", x: 15, y: 30, width: 25, height: 15 },
    { name: "South America", x: 25, y: 55, width: 15, height: 20 },
    { name: "Europe", x: 45, y: 25, width: 15, height: 15 },
    { name: "Africa", x: 45, y: 45, width: 20, height: 25 },
    { name: "Asia", x: 65, y: 30, width: 25, height: 25 },
    { name: "Australia", x: 80, y: 60, width: 15, height: 10 },
  ], []);
  
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/40 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary/70" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Map background */}
          <div className="relative w-full h-full bg-world-map bg-no-repeat bg-center bg-contain">
            {/* World regions overlay */}
            {worldRegions.map((region, i) => (
              <div 
                key={i}
                className={`absolute rounded-md ${
                  isDarkMode ? 'bg-blue-500/5 border border-blue-500/10' : 'bg-blue-100/20 border border-blue-200/30'
                }`}
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.width}%`,
                  height: `${region.height}%`,
                }}
              />
            ))}
            
            {/* Attack points with animation */}
            {attackPoints.map((point, i) => {
              const pos = geoToPixel(point.lat, point.lng, 100, 100);
              return (
                <div 
                  key={point.id}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    zIndex: 10,
                  }}
                >
                  <div className="relative">
                    <div 
                      className="absolute rounded-full animate-ping"
                      style={{
                        backgroundColor: `rgba(239, 68, 68, ${0.2 + point.intensity * 0.6})`,
                        width: `${8 + point.size * 6}px`,
                        height: `${8 + point.size * 6}px`,
                        opacity: 0.7,
                        transform: `translate(-50%, -50%)`,
                        boxShadow: `0 0 10px rgba(239, 68, 68, ${0.3 + point.intensity * 0.3})`,
                      }}
                    />
                    <div 
                      className="absolute rounded-full"
                      style={{
                        backgroundColor: `rgba(239, 68, 68, ${0.5 + point.intensity * 0.5})`,
                        width: `${4 + point.size * 3}px`,
                        height: `${4 + point.size * 3}px`,
                        transform: `translate(-50%, -50%)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            {/* Map overlay with grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-gray-500/20"></div>
              ))}
            </div>
            
            {/* Decorative globe icon */}
            <div className="absolute left-4 top-4 flex items-center gap-2 text-primary/70">
              <Globe size={18} />
              <span className="text-xs font-medium">Global Threat Activity</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
