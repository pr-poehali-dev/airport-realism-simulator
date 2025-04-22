import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FlightSimulatorProps {
  destination: { name: string; duration: number } | null;
}

const FlightSimulator = ({ destination }: FlightSimulatorProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [cloudPosition, setCloudPosition] = useState<number[]>([]);
  
  // Генерация случайного положения облаков
  useEffect(() => {
    const clouds = Array.from({ length: 15 }, () => 
      Math.floor(Math.random() * 100)
    );
    setCloudPosition(clouds);
  }, []);

  // Имитация прогресса полёта
  useEffect(() => {
    if (!destination) return;
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 0.1;
        // Конвертируем время полета из часов в минуты для демонстрации
        const simulatedDuration = destination.duration * 6; // 6 секунд вместо часа для демо
        
        if (newTime >= simulatedDuration) {
          clearInterval(interval);
          return simulatedDuration;
        }
        return newTime;
      });
      
      setProgress(prev => {
        const newProgress = prev + (100 / (destination.duration * 60));
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [destination]);

  // Движение облаков
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCloudPosition(prev => 
        prev.map(pos => (pos <= 0 ? 100 : pos - 0.2))
      );
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, []);

  // Форматирование времени
  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours}ч ${minutes}м`;
  };

  if (!destination) {
    return <div className="flex items-center justify-center h-full">Загрузка...</div>;
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-400 to-blue-700 overflow-hidden">
      {/* Иллюминатор */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[90vw] h-[70vh] max-w-3xl rounded-full bg-gray-900 flex items-center justify-center">
          <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-8 border-gray-800">
            {/* Небо и горизонт */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700"></div>
            
            {/* Облака */}
            {cloudPosition.map((pos, index) => (
              <div 
                key={index}
                className="absolute bg-white rounded-full opacity-80 animate-float"
                style={{
                  width: `${30 + Math.random() * 50}px`,
                  height: `${20 + Math.random() * 30}px`,
                  left: `${pos}%`,
                  top: `${40 + Math.random() * 30}%`,
                  filter: "blur(4px)",
                  zIndex: Math.floor(Math.random() * 5),
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
                  transform: `translateY(${Math.random() * 10}px)`,
                }}
              />
            ))}
            
            {/* Крыло самолета */}
            <div className="absolute bottom-[30%] left-0 w-[40%] h-[10%] bg-gradient-to-r from-gray-400 to-gray-300 shadow-md z-20">
              <div className="absolute top-0 left-[50%] w-[50%] h-full bg-gradient-to-r from-gray-300 to-gray-200 transform -skew-x-12"></div>
            </div>
          </div>
          
          {/* Детали иллюминатора */}
          <div className="absolute inset-0 rounded-full border-[16px] border-gray-700 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full border-[2px] border-gray-800 pointer-events-none"></div>
        </div>
      </div>
      
      {/* Информационная панель */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-full max-w-lg bg-gray-900/80 text-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs uppercase">Направление</div>
            <div className="text-lg font-bold">{destination.name}</div>
          </div>
          <div>
            <div className="text-xs uppercase">Общее время полёта</div>
            <div className="text-lg font-bold">{destination.duration} ч</div>
          </div>
          <div>
            <div className="text-xs uppercase">Прошло времени</div>
            <div className="text-lg font-bold">{formatTime(timeElapsed * 60)}</div>
          </div>
        </div>
        
        {/* Индикатор прогресса */}
        <div className="h-2 bg-gray-700 rounded-full mt-2 mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-2 text-white hover:bg-white hover:text-black transition-all"
          onClick={() => navigate("/")}
        >
          Завершить полёт
        </Button>
      </div>
    </div>
  );
};

export default FlightSimulator;
