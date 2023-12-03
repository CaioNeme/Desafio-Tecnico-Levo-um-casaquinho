import React, { useContext } from 'react'
import styled from 'styled-components';
import { WeatherContext } from '../context/WeatherContext';

export default function Today(props) {
  const { weatherData } = useContext(WeatherContext)
  const { fahrenheit } = props

  return (
    <>
      <Metrics>
        <div>
          <p>Mínima</p>
          <h2>{fahrenheit ? (weatherData?.main?.temp_min * 1.8 + 32).toFixed(0) + "° F" : weatherData?.main?.temp_min.toFixed(0) + "° C"}</h2>
        </div>
        <div>
          <p>Máxima</p>
          <h2>{fahrenheit ? (weatherData?.main?.temp_max * 1.8 + 32).toFixed(0) + "° F" : weatherData?.main?.temp_max.toFixed(0) + "° C"}</h2>
        </div>
        <div>
          <p>Umidade</p>
          <h2>{weatherData?.main?.humidity}%</h2>
        </div>
        <div>
          <p>Velocidade do vento</p>
          <h2>{weatherData?.wind?.speed} m/s</h2>
        </div>
      </Metrics>
      {weatherData?.main?.temp_min > 17 ? <Jacket> Não, você não deve levar um casaquinho!</Jacket> : <Jacket>Sim, você deve levar um casaquinho!</Jacket>}
    </>
  )
}
const Metrics = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 1140px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  @media (max-width: 1440px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  div{
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    justify-content: center;
    box-sizing: border-box;
    padding: 50px;
    width: 450px;
    height: 180px;
    flex-shrink: 0;
    margin-top: 50px;
    border-radius: 32px;
    background: linear-gradient(117deg, #4D4494 22.83%, #4F43AE 90.03%);
    box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);
    p{
      color: #FFF;
      font-family: Poppins;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      margin-bottom:15px;
    }
    h2{
      color: #FFF;
      font-family: Poppins;
      font-size: 48px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px; 
    }
  }
`;
const Jacket = styled.p`
  margin-top: 15px;
  padding-left: 50px;
  color: #AFADAD;
  font-family: Poppins;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 48px;
  margin-bottom: 50px;
`;
