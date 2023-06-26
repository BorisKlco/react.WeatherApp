async function fetchPlace({ queryKey }) {
  const place = queryKey[1];

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${place}`
  );

  if (!res.ok) {
    throw new Error(`pet search - Not ok - ${place} `);
  }

  return res.json();
}

export default fetchPlace;
