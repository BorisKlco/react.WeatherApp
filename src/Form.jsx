import { useState } from 'react';

const Form = () => {
  const [location, setLocation] = useState({
    latitude: 48.1188551,
    longitude: 17.0997146,
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });
      console.log(location);
    });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input type="text" placeholder="Location" />
          <button onClick={getLocation}>Browser Localization</button>
        </div>
      </form>
      <p>Lat: {location.latitude}</p>
      <p>Lon: {location.longitude}</p>
    </>
  );
};

export default Form;
