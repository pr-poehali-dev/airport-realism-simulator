import { useLocation, useNavigate } from "react-router-dom";
import FlightSimulator from "@/components/FlightSimulator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Flight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const destination = location.state?.destination;

  // Защита от прямого доступа без выбора направления
  useEffect(() => {
    if (!destination) {
      navigate("/");
    }
  }, [destination, navigate]);

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
        <h1 className="text-2xl mb-4">Направление не выбрано</h1>
        <Button onClick={() => navigate("/")}>Вернуться в аэропорт</Button>
      </div>
    );
  }

  // Показываем интро перед полетом
  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white">
        <div className="max-w-md text-center p-8 bg-black/30 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6">Подготовка к вылету</h1>
          <p className="text-xl mb-4">
            Ваш рейс в {destination.name} готов к отправлению
          </p>
          <p className="mb-6">
            Расчетное время полета: {destination.duration} часов
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowIntro(false)}
            >
              Взлетаем! ✈️
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Отменить полет
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <FlightSimulator destination={destination} />;
};

export default Flight;
