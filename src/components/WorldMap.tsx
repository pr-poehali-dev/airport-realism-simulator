
import { useState } from "react";

type Destination = { name: string; duration: number; coordinates: [number, number] } | null;

interface WorldMapProps {
  onSelectDestination: (destination: Destination) => void;
  selectedDestination: Destination;
}

const destinations = [
  { name: "Нью-Йорк", duration: 9, coordinates: [74.8, 40.7] },
  { name: "Токио", duration: 11, coordinates: [139.7, 35.7] },
  { name: "Париж", duration: 4, coordinates: [2.3, 48.9] },
  { name: "Сидней", duration: 18, coordinates: [151.2, -33.9] },
  { name: "Рио-де-Жанейро", duration: 12, coordinates: [-43.2, -22.9] },
  { name: "Москва", duration: 2, coordinates: [37.6, 55.8] },
  { name: "Дубай", duration: 5, coordinates: [55.3, 25.3] },
  { name: "Кейптаун", duration: 14, coordinates: [18.4, -33.9] },
];

const WorldMap = ({ onSelectDestination, selectedDestination }: WorldMapProps) => {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative bg-blue-900 overflow-hidden">
      {/* Карта мира (заглушка изображения) */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-80"></div>
      
      {/* Наложение для лучшей видимости точек */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
      
      {/* Название "Карта мира" */}
      <div className="absolute top-4 left-4 text-2xl font-bold text-white drop-shadow-lg">
        Карта мира
      </div>
      
      {/* Пункты назначения */}
      <div className="absolute inset-0">
        {destinations.map((dest) => {
          const isSelected = selectedDestination?.name === dest.name;
          const isHovered = hoveredDestination === dest.name;
          
          // Рассчет позиции на основе координат
          const leftPos = `${((180 + dest.coordinates[0]) / 360) * 100}%`;
          const topPos = `${((90 - dest.coordinates[1]) / 180) * 100}%`;
          
          return (
            <div 
              key={dest.name}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group`}
              style={{ left: leftPos, top: topPos }}
              onClick={() => onSelectDestination(dest)}
              onMouseEnter={() => setHoveredDestination(dest.name)}
              onMouseLeave={() => setHoveredDestination(null)}
            >
              <div className={`
                w-4 h-4 rounded-full 
                ${isSelected ? 'bg-red-500 ring-4 ring-red-300 ring-opacity-60' : 'bg-yellow-400'}
                ${isHovered ? 'scale-150' : 'scale-100'}
                transition-all duration-300
              `}></div>
              
              <div className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 
                bg-black/80 text-white rounded text-sm whitespace-nowrap
                ${(isHovered || isSelected) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                transition-all duration-200 z-10
              `}>
                <p className="font-bold">{dest.name}</p>
                <p className="text-xs">Время: {dest.duration} ч</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldMap;
