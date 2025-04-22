import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AirportScene from "@/components/AirportScene";
import WorldMap from "@/components/WorldMap";
import { Button } from "@/components/ui/button";

type Destination = { name: string; duration: number; coordinates: [number, number] } | null;

const Index = () => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination>(null);

  const handleApproachCounter = () => {
    setShowMap(true);
  };

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const startFlight = () => {
    if (selectedDestination) {
      navigate("/flight", { state: { destination: selectedDestination } });
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 overflow-hidden relative">
      {!showMap ? (
        // Сцена аэропорта
        <AirportScene onApproachCounter={handleApproachCounter} />
      ) : (
        // Карта мира
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative">
            <WorldMap 
              onSelectDestination={handleSelectDestination}
              selectedDestination={selectedDestination}
            />
          </div>
          
          {/* Панель выбора направления */}
          <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div>
                {selectedDestination ? (
                  <div>
                    <h2 className="text-xl font-bold">Выбрано направление:</h2>
                    <p className="text-2xl text-blue-400">
                      {selectedDestination.name} ({selectedDestination.duration} ч)
                    </p>
                  </div>
                ) : (
                  <p>Выберите направление на карте</p>
                )}
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMap(false)}
                >
                  Вернуться к стойке
                </Button>
                
                <Button 
                  disabled={!selectedDestination}
                  onClick={startFlight}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                >
                  {selectedDestination ? "Начать полёт ✈️" : "Выберите направление"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
