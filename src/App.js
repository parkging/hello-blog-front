import { useEffect, useState } from "react";

const App = () => {
  const [loading, setloading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setloading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length}) </h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin, index) => (
          <li key={coin.id}>
            {index} {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
