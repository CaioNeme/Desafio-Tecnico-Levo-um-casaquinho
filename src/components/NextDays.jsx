import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
            data={fahrenheit ? nextDaysData?.map((item) => ({ ...item, Temperature: (item.Temperature * 1.8 + 32).toFixed(2) })) : nextDaysData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: darkMode ? '#fff' : '#000' }} />
            <YAxis formatter={fahrenheit ? (value) => `${(value * 1.8 + 32).toFixed(2)}° F` : (value) => `${value}° C`} />
            <Tooltip formatter={fahrenheit ? (value) => `${(value * 1.8 + 32).toFixed(2)}° F` : (value) => `${value}° C`} />
            <Line type="monotone" dataKey="Temperature" stroke={darkMode ? mainColor : '#000'} activeDot={{ r: 8 }} />
          </LineChart>
        </Graphic>
      </>
    </div>
  )
}
const Graphic = styled.div`
  width: 1150px;
  height: 633px;
  margin-left: 50px;

`;
