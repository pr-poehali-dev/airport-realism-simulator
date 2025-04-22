
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AirportSceneProps {
  onApproachCounter: () => void;
}

const AirportScene = ({ onApproachCounter }: AirportSceneProps) => {
  const [position, setPosition] = useState({ x: 50, y: 80 });
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  // Имитация перемещения к стойке
  const approachCounter = () => {
    setIsMoving(true);
    setPosition({ x: 50, y: 30 });
    
    setTimeout(() => {
      setIsMoving(false);
      setShowPrompt(true);
    }, 1000);
  };

  return (
    <div className="w-full h-full relative bg-[url('/placeholder.svg')] bg-cover bg-center">
      {/* Наложение аэропорта */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/50"></div>
      
      {/* Интерьер аэропорта */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-200 rounded-t-3xl">
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[80%] h-16 bg-gray-800 rounded-xl flex items-center justify-center">
          <div className="text-white text-xl font-bold">Стойка регистрации рейсов</div>
        </div>
        
        {/* Кассир */}
        <div className="absolute left-1/2 -translate-x-1/2 top-32 w-24 h-24 bg-blue-600 rounded-full border-4 border-blue-800 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-3xl">👩‍✈️</div>
            <div className="text-xs mt-1">Кассир</div>
          </div>
        </div>
      </div>
      
      {/* Игрок */}
      <div 
        className={`absolute w-16 h-16 bg-purple-600 rounded-full border-4 border-purple-800 flex items-center justify-center text-white z-10 ${isMoving ? 'transition-all duration-1000' : ''}`}
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
        }}
      >
        <div className="text-center">
          <div className="text-2xl">👤</div>
          <div className="text-xs mt-1">Вы</div>
        </div>
      </div>
      
      {/* Кнопка подхода к стойке */}
      {!showPrompt && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button size="lg" className="animate-pulse" onClick={approachCounter}>
            Подойти к стойке регистрации
          </Button>
        </div>
      )}
      
      {/* Диалог с кассиром */}
      {showPrompt && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg bg-white rounded-xl p-6 shadow-2xl z-20">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">👩‍✈️</div>
            <p className="text-lg font-medium mb-4">Здравствуйте! Куда бы вы хотели отправиться сегодня?</p>
            <Button size="lg" className="w-full" onClick={onApproachCounter}>
              Показать карту направлений
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportScene;
