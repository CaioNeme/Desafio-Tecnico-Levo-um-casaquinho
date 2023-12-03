import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styled from 'styled-components';

export default function NextDays(props) {
  const { nextDaysData } = useContext(WeatherContext)
  const { darkMode } = props
  const { mainColor } = props
  const { fahrenheit } = props

  return (
    <div>
      <>
        <Graphic>
          <LineChart
            width={1000}
            height={600}
            data={fahrenheit ? nextDaysData?.map((item) => ({ ...item, Temperature: (item.Temperature * 1.8 + 32).toFixed(0) })) : nextDaysData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="day" tick={{ fill: darkMode ? '#fff' : '#000' }} tickFormatter={(value) => value} tickCount={5} />
            <YAxis tick={{ fill: darkMode ? '#fff' : '#000' }} type="number" domain={fahrenheit ? [0, 120] : [0, 45]}
              tickCount={10}
              tickFormatter={(value) => fahrenheit ? `${value}°F` : `${value}°C`}
            />
            <Tooltip formatter={fahrenheit ? (value) => `${(value)}° F` : (value) => `${value}° C`} />
            <Line type="monotone" dataKey="Temperature" stroke={darkMode ? mainColor : '#000'} activeDot={{ r: 8 }} />
          </LineChart>
        </Graphic>
      </>
    </div>
  )
}
const Graphic = styled.div`
  width: 1150px;
  height: 100vh;
  margin-left: 50px;
  font-family: Poppins;

  @media (max-width: 1440px) {
    width: 100%;
    height: 600px;
    margin-left: 0;
    margin-top: 20px;
    margin-bottom: 100px;
  }
`;
