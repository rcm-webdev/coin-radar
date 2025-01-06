//fetch cryptocurrency data from the CoinGecko API

const fetchCryptoData = async (crypto) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Cryptocurrency not found: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
    const data = await fetchCryptoData(crypto);
    if (data[crypto]) {
      resultDiv.innerHTML = `
          <h2>${crypto.toUpperCase()}</h2>
          <p>Price: ${data[crypto].usd}</p>
          <p>24-hour change: ${data[crypto].usd_24h_change.toFixed(2)}%</p>
        `;
    } else {
      resultDiv.innerHTML = "Cryptocurrency not found";
    }
  } catch (error) {
    console.log("Error: ", error);
    resultDiv.innerHTML = "Error fetching data";
  }
});
