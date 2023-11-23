import axios from "axios";
import dayjs from "dayjs";
import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [nextDaysData, setNextDaysData] = useState(null);
  const [city, setCity] = useState('Bauru');

  const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&APPID=${import.meta.env.VITE_API_KEY}&units=metric`;
    await axios.get(url).then((response) => {
      setWeatherData(response.data)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Confira se a cidade está digitada corretamente!")
      } else if (error.response.status === 401 || error.response.status === 400) {
        alert("Confira se suas credenciais de acesso estão corretas!")
      } else {
        alert("Algo de errado aconteceu!")
        console.error(error);
      }
    })

  }


  const getWeatherForecast = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pt_br&cnt=40&APPID=${import.meta.env.VITE_API_KEY}&units=metric`;
    await axios.get(url).then((response) => {
      const data = response.data.list.map(item => ({
        day: dayjs(item.dt_txt).format('(DD/MM), ddd'),
        Temperature: item.main.temp_max
      }));
      setNextDaysData(data);
    })
  };

  useEffect(() => {
    getWeatherData()
    getWeatherForecast()
  }, [city])

  return (
    <WeatherContext.Provider value={{ weatherData, nextDaysData, setCity }}>
      {children}
    </WeatherContext.Provider>
  )
}