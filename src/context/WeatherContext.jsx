import axios from "axios";
import dayjs from "dayjs";
import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [nextDaysData, setNextDaysData] = useState(null);
  const [city, setCity] = useState('Bauru');

  const getWeatherData = async () => {
    const urlTodayAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&APPID=${import.meta.env.VITE_API_KEY}&units=metric`;
    await axios.get(urlTodayAPI).then((response) => {
      setWeatherData(response.data)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Confira se a cidade está digitada corretamente!")
      } else if (error.response.status === 401 || error.response.status === 400) {
        alert("Confira se suas credenciais de acesso estão corretas!")
      } else if (error.response.status === 429) {
        alert("A API está com muitas requisições!")
      } else {
        alert("Algo de errado aconteceu!")
        console.error(error);
      }
    })
  }
  const getWeatherForecast = async () => {
    const urlForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pt_br&cnt=40&APPID=${import.meta.env.VITE_API_KEY}&units=metric`;
    await axios.get(urlForecastAPI).then((response) => {
      const data = [];
      for (let i = 0; i < 40; i += 5) {
        data.push({ Temperature: response.data.list[i].main.temp, day: dayjs(response.data.list[i].dt_txt).format(`DD/MM`) + `(${setDay(dayjs(response.data.list[i].dt_txt).format(`ddd`))})` });;
      }
      setNextDaysData(data);
    });
  }


  function setDay(day) {
    switch (day) {
      case 'Sun':
        return 'Dom';
      case 'Mon':
        return 'Seg';
      case 'Tue':
        return 'Ter';
      case 'Wed':
        return 'Qua';
      case 'Thu':
        return 'Qua';
      case 'Fri':
        return 'Sex';
      case 'Sat':
        return 'Sab';
      default:
        return '';
    }
  }

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
