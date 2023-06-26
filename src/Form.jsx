import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchPlace from './fetchPlace';
import './Form.css';

const Form = () => {
  const [location, setLocation] = useState({
    place: 'Bratislava',
    latitude: 48.1188551,
    longitude: 17.0997146,
  });

  const result = useQuery(['place', location.place], fetchPlace);
  const place = result?.data?.results ?? [];

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ ...location, latitude: latitude, longitude: longitude });
      console.log(location);
    });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            onChange={(e) => {
              setLocation({ ...location, place: e.target.value });
            }}
            type="text"
            placeholder="Search Location"
          />
          <button onClick={getLocation}>Get Location</button>
        </div>
      </form>
      <p>Place: {location.place}</p>
      <p>Lat: {location.latitude}</p>
      <p>Lon: {location.longitude}</p>

      <ul>
        {result.isLoading
          ? 'Loading...'
          : place.map((item) => 
              <li>{item.name}</li>
            )}
      </ul>
    </>
  );
};

export default Form;
