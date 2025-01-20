//fetch cryptocurrency data from the CoinGecko API

const fetchCryptoData = async (crypto) => {
  const url = `https://api.coingecko.com/api/v3/coins/${crypto}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Cryptocurrency not found: ${response.status}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      price: data.market_data.current_price.usd,
      change: data.market_data.price_change_percentage_24h,
    };
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

// Event Listener for form submission
document.getElementById("cryptoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const crypto = document.getElementById("cryptoInput").value.toLowerCase();
  const resultDiv = document.getElementById("cryptoResult");
  resultDiv.innerHTML = "Loading...";

  try {
    const { name, symbol, price, change } = await fetchCryptoData(crypto);
    resultDiv.innerHTML = `
    <h2>${name} (${symbol})</h2>
    <p>Price: $${price.toFixed(2)}</p>
    <p>24-hour change: ${change ? change.toFixed(2) : "N/A"}%</p>
  `;
  } catch (error) {
    console.log("Error: ", error);
    resultDiv.innerHTML = "Error fetching data. Cryptocurrency not found.";
  }
});
