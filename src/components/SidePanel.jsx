import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs'
import casaquinho from '../assets/images/casaquinho.png'
import search from '../assets/images/search.png'
import sol from '../assets/images/sol.png'
import { WeatherContext } from '../context/WeatherContext';

export default function SidePanel(props) {

  const { weatherData, setCity } = useContext(WeatherContext)
  const { fahrenheit, setFahrenheit } = props
  const { darkMode, setDarkMode } = props
  const [cityName, setCityName] = useState({
    city: ''
  })

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

  return (
    <>
      <Panel>
        <Header>
          <Casaquinho src={casaquinho} alt="casaquinho" />
          <h1>Levo um casaquinho?</h1>
        </Header>
        <Search onSubmit={(event) => handleSubmit(event)}>
          <img src={search} alt="" />
          <input autoComplete="off" placeholder={'Procure por uma cidade'} value={cityName.city} name="city" onChange={handleChange} type="text" />
        </Search>
        <Temp>
          <div>
            <img src={sol} alt="" />
            <h1>{fahrenheit ? (weatherData?.main?.temp * 1.8 + 32).toFixed(2) : weatherData?.main?.temp.toFixed(2)}</h1>
          </div>
          <p>{weatherData ? weatherData?.weather[0]?.description.charAt(0).toUpperCase() + weatherData?.weather[0]?.description.slice(1) : ""}</p>
        </Temp>
        <Line />
        <Day>
          <p>{dayjs().format('DD/MM/YYYY')}</p>
          <p>{dayjs().format('dddd') + ', ' + dayjs().format('hh:mm')}</p>
        </Day>
        <Toggle>
          <div>
            <label className="switch">
              <input onClick={() => handleFahrenheit()} type="checkbox" />
              <span className="slider round" />
            </label>
            <p>ºF</p>
          </div>
          <div>
            <label className="switch">
              <input onClick={() => handleDarkMode()} type="checkbox" />
              <span className="slider round" />
            </label>
            <p>Dark Mode</p>
          </div>
        </Toggle>
        <Footer>
          <p>Todos os direitos reservados. 2023.</p>
        </Footer>
      </Panel>
    </>
  )
}

const Panel = styled.div`
  width: 35%;
  height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  padding: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    color: #222;
    font-family: 'Poppins', sans-serif;
    font-size: 62px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
  }
`;
const Casaquinho = styled.img`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  margin-right: 10px;
`;
const Search = styled.form`
  width: 500px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #EDEDEF;
  box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  img{
    width: 37px;
    height: 40px;
    flex-shrink: 0;
    padding:20px;
  }

  input{
    border-radius: 24px;
    background: #EDEDEF;
    box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);

    color: #424243;
    font-family: Montserrat;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;

    width: 415px;
    height: 80px;
    flex-shrink: 0;
    background-color: #EDEDEF;

    border : none;
  }
  input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
} 
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
      font-size: 150px;
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


`;
const Line = styled.div`
  width: 395px;
  height: 5px;
  background-color: gray;
  margin: 35px;
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
  margin-top: 50px;

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
    line-height: 48px; /* 200% */
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
    background-color: white;
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
  height: 100%;
  p{
    color: #222;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
`;
