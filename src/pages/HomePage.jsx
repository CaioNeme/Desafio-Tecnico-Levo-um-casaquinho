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
  const { weatherData, nextDaysData } = useContext(WeatherContext)
  const [mainColor, setMainColor] = useState('grey')
  function weather() {
    switch (weatherData?.weather[0]?.main) {
      case 'Clear':
        return setMainColor('orange');
      case 'Clouds':
        return setMainColor('#616161');
      case 'Rain':
        return setMainColor('#4B91E1');
      case 'Snow':
        return setMainColor('#A8A8A8');
      case 'Thunderstorm':
        return setMainColor('#AA00FF');
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
    <>
      {weatherData && nextDaysData ?
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
            <Font className='copyright' style={{ color: darkMode ? '#d4d0cb' : '#222' }}>Todos os direitos reservados. 2023.</Font>
          </Content>
        </Conteiner>
        :
        <Loading>
          <h1>Carregando...</h1>
        </Loading>}
    </>
  )
}
const Conteiner = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;

  .copyright{
    display: none;
  }

  @media screen {
    @media (max-width: 1140px) {
      flex-direction: column;
      justify-items: center;
      align-items: center;
      .copyright{
        display: block;
      } 
    }
    @media (max-width: 1440px) {
      .copyright{
        display: block;
      }
    }
  }
`;
const Content = styled.div`
  width: 65%;
  height: 100vh;
  background-color:#EFEFEF;
  box-sizing: border-box;

  @media screen {
    @media (max-width: 1140px) {
      width: 100%;
    }
    @media (max-width: 1440px) {
      width: 100%;
      height: 100%;
    }
  }
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

  @media screen {
    @media (max-width: 1140px) {
      justify-content: center;
      h1{
        margin-right: 30px;
      }
    }
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

  @media screen {
    @media (max-width: 1140px) {
      justify-content: center;
      align-items: center;
      h1{
        margin-right: 30px;
      }
    }
  }
`;
const Font = styled.p`
  padding-left: 50px;
  margin-bottom: auto;
  color: #222;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
`;
const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1{
    color: #222;
    font-family: Poppins;
    font-size: 90px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  p{
    color: #222;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
`;