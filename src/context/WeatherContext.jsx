import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('Bauru')

  const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},br&lang=pt_br&APPID=${import.meta.env.VITE_API_KEY}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  }

  useEffect(() => {
    getWeatherData()
  }, [city])

  return (
    <WeatherContext.Provider value={{ weatherData, setCity }}>
      {children}
    </WeatherContext.Provider>
  )
}