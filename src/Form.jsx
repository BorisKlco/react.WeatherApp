import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Item from './Item';
import fetchPlace from './fetchPlace';
import fetchWeather from './fetchWeather';
import './Form.css';

const Form = () => {
  const [location, setLocation] = useState({
    place: '',
    latitude: 48.1188551,
    longitude: 17.0997146,
  });

  const [selected, setSelected] = useState(false);

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
    });
  };

  const handlePlace = (index) => {
    setLocation({
      ...location,
      place: place[index].name,
      latitude: place[index].latitude,
      longitude: place[index].longitude,
    });
    setSelected(false);
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
              onClick={() => setSelected(true)}
              onChange={(e) => {
                setLocation({ ...location, place: e.target.value });
              }}
              type="text"
              placeholder="Search Location"
              value={location.place}
            />
            {selected && place.length > 0 && (
              <ul>
                {console.log(place)}
                {placeQuery.isLoading
                  ? ''
                  : place.map((item, index) => (
                      <div onClick={() => handlePlace(index)} key={item.id}>
                        <Item item={item} />
                      </div>
                    ))}
              </ul>
            )}
          </div>
          <button className="submit" onClick={getLocation}>
            Get Location
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
