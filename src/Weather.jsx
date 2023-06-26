import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchWeather from './fetchWeather';
import './Weather.css';

const Weather = ({ location }) => {
  const weatherQuery = useQuery(['weather', location], fetchWeather);
  const weather = weatherQuery?.data ?? [];

  if (weatherQuery.isLoading) return 'Loading...';

  const date = new Date();
  const h = date.getHours();

  return (
    <div>
      <h1>
        {location.place} <span>{weather.hourly.temperature_2m[h]}</span>
      </h1>
    </div>
  );
};

export default Weather;
