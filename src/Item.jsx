const Item = ({ item }) => {
  return (
    <li className="link">
      <img
        height="24"
        src={`https://open-meteo.com/images/country-flags/${item.country_code}.svg`}
        title={item.country}
      />
      {item.name} <span>{item.admin1}</span>
    </li>
  );
};

export default Item;
