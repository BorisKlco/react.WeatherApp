async function fetchWeather({ queryKey }) {
  const { place, latitude, longitude } = queryKey[1];

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=Europe%2FBerlin`
  );

  if (!res.ok) {
    throw new Error(`Weather search - Not ok`);
  }

  return res.json();
}

export default fetchWeather;
