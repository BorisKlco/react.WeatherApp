import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchWeather from './fetchWeather';
import fetchCity from './fetchCity';
import './Weather.css';

const Weather = ({ location }) => {
  const weatherQuery = useQuery(['weather', location], fetchWeather);
  const weather = weatherQuery?.data ?? [];

  const cityQuery = useQuery(['city', location], fetchCity);
  const city = cityQuery?.data?.city ?? [];

  if (weatherQuery.isLoading) return 'Loading...';

  const date = new Date();
  const h = date.getHours();

  return (
    <div>
      <h1>
        {location.place === 'My Location' ? city : location.place}
        <span> {weather.hourly.temperature_2m[h]}</span>
      </h1>
    </div>
  );
};

export default Weather;
