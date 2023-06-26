import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchPlace from './fetchPlace';
import fetchWeather from './fetchWeather';
import './Form.css';

const Form = () => {
  const [location, setLocation] = useState({
    place: 'Bratislava',
    latitude: 48.1188551,
    longitude: 17.0997146,
  });

  const weatherQuery = useQuery(['weather', location], {
    fetchWeather,
    enabled: false,
  });
  const weather = weatherQuery?.data ?? [];
  const placeQuery = useQuery(['place', location.place], fetchPlace);
  const place = placeQuery?.data?.results ?? [];

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ ...location, latitude: latitude, longitude: longitude });
      console.log(location);
    });
  };

  return (
    <>
      <p>Place: {location.place}</p>
      <p>Lat: {location.latitude}</p>
      <p>Lon: {location.longitude}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search">
          <div className="searchInput">
            <input
              onChange={(e) => {
                setLocation({ ...location, place: e.target.value });
              }}
              type="text"
              placeholder="Search Location"
              value={location.place}
            />
            <ul>
              {placeQuery.isLoading
                ? ''
                : place.map((item) => <li key={item.name}>{item.name}</li>)}
            </ul>
          </div>
          <button onClick={getLocation}>Get Location</button>
        </div>
      </form>
    </>
  );
};

export default Form;
