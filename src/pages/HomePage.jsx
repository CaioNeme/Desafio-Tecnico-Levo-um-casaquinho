import React, { useContext, useState } from 'react'
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

  const handleToday = () => {
    setToday(true);
    setNextDays(false);
  }
  const handleNextDays = () => {
    setToday(false);
    setNextDays(true);
  }

  return (
    <Conteiner>
      <SidePanel fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content>
        <Menu>
          <h1 onClick={handleToday} style={{ color: today ? '#222' : '#C8C8C8' }}>Hoje</h1>
          <h1 onClick={handleNextDays} style={{ color: nextDays ? '#222' : '#C8C8C8' }}>Próximos dias</h1>
        </Menu>
        <Local>
          <h1>{weatherData?.name}</h1>
          <p>Lat:  {weatherData?.coord?.lat}  Long: {weatherData?.coord?.lon}</p>
        </Local>
        {today ? <Today fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} darkMode={darkMode} setDarkMode={setDarkMode} /> : <NextDays fahrenheit={fahrenheit} setFahrenheit={setFahrenheit} darkMode={darkMode} setDarkMode={setDarkMode} />}
      </Content>
    </Conteiner>
  )
}
//?Conteiner
const Conteiner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
`;
//?Content
const Content = styled.div`
  width: 65%;
  height: 100vh;
  background-color:#EFEFEF;
  box-sizing: border-box;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 50px;
  
  h1{
    color: #C8C8C8; // #222
    font-family: Poppins;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px; 
    margin-right: 70px;
  }
`;
const Local = styled.div`
  padding-left: 50px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1{
    color: #222;
    font-family: Poppins;
    font-size: 150px;
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