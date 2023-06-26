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
                : place.map((item) => (
                    <>
                      <a href="#" className="link" key={item.id}>
                        <img
                          height="24"
                          src={`https://open-meteo.com/images/country-flags/${item.country_code}.svg`}
                          title={item.country}
                        />
                        <li>
                          {item.name} <span>{item.admin1}</span>
                        </li>
                      </a>
                    </>
                  ))}
            </ul>
          </div>
          <button onClick={getLocation}>Get Location</button>
        </div>
      </form>
    </>
  );
};

export default Form;
