//fetch cryptocurrency data from the CoinGecko API
const fetchCryptoId = async (query) => {
  const url = `https://api.coingecko.com/api/v3/search?query=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    const data = await response.json();

    // Find a matching ID for the query
    const result = data.coins.find(
      (coin) =>
        coin.id.toLowerCase() === query.toLowerCase() ||
        coin.symbol.toLowerCase() === query.toLowerCase()
    );

    if (result) {
      return result.id; // Return the CoinGecko ID for the cryptocurrency
    } else {
      throw new Error("Cryptocurrency not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

const fetchCryptoData = async (id) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

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
  const query = document.getElementById("cryptoInput").value.toLowerCase();
  const resultDiv = document.getElementById("cryptoResult");
  resultDiv.innerHTML = "Loading...";

  try {
    const cryptoId = await fetchCryptoId(query);
    const { name, symbol, price, change } = await fetchCryptoData(cryptoId);
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
