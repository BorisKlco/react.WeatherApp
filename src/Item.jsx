const Item = ({ img, country, itemName, itemSec }) => {
  return (
    <button className="link">
      <img
        height="24"
        src={`https://open-meteo.com/images/country-flags/${img}.svg`}
        title={country}
      />
      <li>
        {itemName} <span>{itemSec}</span>
      </li>
    </button>
  );
};

export default Item;
