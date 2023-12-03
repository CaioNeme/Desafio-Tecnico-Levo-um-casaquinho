import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs'
import casaquinho from '../assets/images/casaquinho.png'
import search from '../assets/images/search.png'
import { WeatherContext } from '../context/WeatherContext';

export default function SidePanel(props) {

  const { weatherData, setCity } = useContext(WeatherContext)
  const { fahrenheit, setFahrenheit } = props
  const { darkMode, setDarkMode } = props
  const { mainColor } = props
  const [cityName, setCityName] = useState({
    city: ''
  })
  const [icon, setIcon] = useState(weatherData?.weather[0]?.icon)

  useEffect(() => {
    setIcon(weatherData?.weather[0]?.icon)
  }, [weatherData])

  function handleFahrenheit() {
    setFahrenheit(!fahrenheit)
  }

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }

  function handleChange(event) {
    const newCity = { ...cityName };
    newCity[event.target.name] = event.target.value;
    setCityName(newCity);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!cityName.city) {
      return
    }
    setCity(cityName.city)
  }

  function weekDay() {
    switch (dayjs().format('dddd')) {
      case 'Monday':
        return 'Segunda-feira';
      case 'Tuesday':
        return 'Terça-feira';
      case 'Wednesday':
        return 'Quarta-feira';
      case 'Thursday':
        return 'Quinta-feira';
      case 'Friday':
        return 'Sexta-feira';
      case 'Saturday':
        return 'Sabado';
      case 'Sunday':
        return 'Domingo';
      default:
        return '';
    }
  }

  return (
    <>
      <Panel style={{ backgroundColor: darkMode ? '#232526' : '#FFF' }}>
        <Header>
          <LittleJacket style={{ backgroundColor: darkMode ? '#232526' : '#FFF' }} src={casaquinho} alt="casaquinho" />
          <h1 style={{ color: darkMode ? '#EFEFEF' : '#222' }}>Levo um casaquinho?</h1>
        </Header>
        <Search style={{ backgroundColor: darkMode ? '#2c2f30' : '#EFEFEF' }} onSubmit={(event) => handleSubmit(event)}>
          <img src={search} alt="" />
          <input style={{ backgroundColor: darkMode ? '#2c2f30' : '#EFEFEF', color: darkMode ? '#EFEFEF' : '#222' }} autoComplete="off" placeholder={'Procure por uma cidade'} value={cityName.city} name="city" onChange={(event) => handleChange(event)} type="text" />
        </Search>
        <Temp>
          <div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <h1 style={{ color: mainColor }}>{fahrenheit ? (weatherData?.main?.temp * 1.8 + 32).toFixed(0) + "° F" : weatherData?.main?.temp.toFixed(0) + "° C"}</h1>
          </div>
          <p style={{ color: darkMode ? '#d4d0cb' : '#212324' }}>{weatherData ? weatherData?.weather[0]?.description.charAt(0).toUpperCase() + weatherData?.weather[0]?.description.slice(1) : ""}</p>
        </Temp>
        <Line />
        <Day>
          <p style={{ color: darkMode ? '#d4d0cb' : '#212324' }}>{dayjs().format('DD/MM/YYYY')}</p>
          <p style={{ color: darkMode ? '#d4d0cb' : '#212324' }}>{weekDay() + ', ' + dayjs().format('hh:mm')}</p>
        </Day>
        <Toggle>
          <div>
            <label className="switch">
              <input onClick={() => handleFahrenheit()} type="checkbox" />
              <span style={{ backgroundColor: darkMode ? '#464a4c' : '#d4d0cb' }} className="slider round" />
            </label>
            <p style={{ color: darkMode ? '#d4d0cb' : '#212324' }}>ºF</p>
          </div>
          <div>
            <label className="switch">
              <input onClick={() => handleDarkMode()} type="checkbox" />
              <span style={{ backgroundColor: darkMode ? '#464a4c' : '#d4d0cb' }} className="slider round" />
            </label>
            <p style={{ color: darkMode ? '#d4d0cb' : '#212324' }}>Dark Mode</p>
          </div>
        </Toggle>
        <Footer style={{ color: darkMode ? '#d4d0cb' : '#222' }}>Todos os direitos reservados. 2023.</Footer>
      </Panel>
    </>
  )
}

const Panel = styled.div`
  box-sizing: border-box;
  width: 35%;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen {
    @media (max-width: 1140px) {
      width: 100%;
    }

    @media (max-width: 1440px) {
      flex-direction: column;
      align-items: center;
    }
  }

  h1{
    color: #222;
    font-family: 'Poppins', sans-serif;
    font-size: 62px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
  }
`;
const LittleJacket = styled.img`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  margin-right: 10px;

  @media screen {
    @media (max-width: 1140px) {
      width: 80px;
    }

    @media (max-width: 1440px) {
      width: 100px;
      height: 100px;
    }
  }
`;
const Search = styled.form`
  width: 500px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #EDEDEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  img{
    width: 37px;
    height: 40px;
    flex-shrink: 0;
    padding:20px;
  }

  input{
    border-radius: 24px;
    background: #EDEDEF;
    color: #424243;
    font-family: Montserrat;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    width: 415px;
    height: 60px;
    flex-shrink: 0;
    background-color: #EDEDEF;
    border : none;
  }
  input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  @media (max-width: 1440px) {
    width: 400px;
    height: 60px;
    input{
      width: 300px;
    }
  }

`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1440px) {
    h1{
      font-size: 32px;

    }
  }
`;
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img{
    width: 150px;
    height: 150px;
    flex-shrink: 0;
  }

  div{
    display: flex;
    align-items: center;
    justify-content: center;

    margin:20px;

    h1{
      color: #EC6E4C;
      font-family: Poppins;
      font-size: 90px;
      font-style: normal;
      font-weight: 300;
      line-height: 48px;
    }
  }
  p{
    color: #222;
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }

  @media (max-width: 1440px) {
    div{
      h1{
        font-size: 45px;
      }
    }
  }


`;
const Line = styled.div`
  width: 395px;
  height: 5px;
  background-color: gray;
  margin: 15px;
`;
const Day = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  p{
    color: #222;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
    display: block;
    margin-block-start: -1em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;
const Toggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;

  div{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin:20px;    
  }

  p{
    margin-left: 40px;
    color: #222;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: gray;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  color: #222;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;

  @media screen {
    @media (max-width: 1440px) {
      display: none;
    }
  }
`;
