import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import SidePanel from '../components/SidePanel'
import Today from '../components/Today';
import NextDays from '../components/NextDays';
import { WeatherContext } from '../context/WeatherContext';

export default function HomePage() {
  const [today, setToday] = useState(true);
  const [nextDays, setNextDays] = useState(false);
  const [fahrenheit, setFahrenheit] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { weatherData } = useContext(WeatherContext)
  const [mainColor, setMainColor] = useState('grey')
  function weather() {
    switch (weatherData?.weather[0]?.main) {
      case 'Clear':
        return setMainColor('orange');
      case 'Clouds':
        return setMainColor('grey');
      case 'Rain':
        return setMainColor('#4B91E1');
      case 'Snow':
        return setMainColor('#A8A8A8');
      case 'Thunderstorm':
        return setMainColor('#aa00ff');
      case 'Drizzle':
        return setMainColor('#ACC5E6');
      case 'Mist':
        return setMainColor('#A8A8A8');
      default:
        return setMainColor('black');
    }
  }

  const selectToday = () => {
    setToday(true);
    setNextDays(false);
  }
  const selectNextDays = () => {
    setToday(false);
    setNextDays(true);
  }

  useEffect(() => {
    weather()
  }, [weatherData])

  return (
    <Conteiner>
      <SidePanel mainColor={mainColor} setMainColor={setMainColor} fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content style={{ backgroundColor: darkMode ? '#2c2f30' : '#EFEFEF' }}>
        <Menu>
          <h1 onClick={selectToday} style={{ color: darkMode ? today ? mainColor : '#C8C8C8' : today ? '#222' : '#C8C8C8' }}>Hoje</h1>
          <h1 onClick={selectNextDays} style={{ color: darkMode ? nextDays ? mainColor : '#C8C8C8' : nextDays ? '#222' : '#C8C8C8' }}>Próximos dias</h1>
        </Menu>
        <Current>
          <h1 style={{ color: darkMode ? '#d4d0cb' : '#222' }}>{weatherData?.name}</h1>
          <p style={{ color: darkMode ? '#d4d0cb' : '#222' }}>Lat:  {weatherData?.coord?.lat}  Long: {weatherData?.coord?.lon}</p>
        </Current>
        {today ? <Today fahrenheit={fahrenheit} darkMode={darkMode} /> : <NextDays fahrenheit={fahrenheit} darkMode={darkMode} mainColor={mainColor} />}
        <Font style={{ color: darkMode ? '#d4d0cb' : '#222' }}>Dados fornecidos pela <a style={{ color: darkMode ? mainColor : '#0364b8' }} target="_blank" href="https://openweathermap.org/api">Open Weather API</a></Font>
      </Content>
    </Conteiner>
  )
}
const Conteiner = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Content = styled.div`
  width: 65%;
  background-color:#EFEFEF;
  box-sizing: border-box;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 50px;
  margin-top: 40px;
  h1{
    color: #C8C8C8;
    font-family: Poppins;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px; 
    margin-right: 70px;
  }
`;
const Current = styled.div`
  padding-left: 50px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1{
    color: #222;
    font-family: Poppins;
    font-size: 90px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
  p{
    margin-top: 30px;
    margin-left: 15px;
    color: #222;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
`;
const Font = styled.p`
  padding-left: 50px;
  margin-top: 38px;
  margin-bottom: auto;
  color: #222;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
`;
