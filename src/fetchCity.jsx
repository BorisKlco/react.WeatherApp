async function fetchCity({ queryKey }) {
  const { place, latitude, longitude } = queryKey[1];

  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );

  if (!res.ok) {
    throw new Error(`City search - Not ok `);
  }

  return res.json();
}

export default fetchCity;
