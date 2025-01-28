# CoinRadar

CoinRadar is a lightweight application that allows users to search for cryptocurrency data either by name (e.g., "bitcoin") or by symbol (e.g., "BTC"). The app fetches live data from the [CoinGecko API](https://docs.coingecko.com/reference/introduction) and displays the current price and 24-hour percentage change.

![CoinRadar](/public/assets/coinradar.gif)

---

## How It's Made:

Tech used: HTML, CSS, and JavaScript.

This application was built from the ground up without frameworks to keep things simple and focused. It features:

- HTML for structuring
- Tailwindcss and Daisyui for simple styling
- JavaScript to handle API requests and dynamically update the DOM

Key features:

- Uses CoinGecko API to fetch cryptocurrency data
- Allows users to search for cryptocurrencies either by name or symbol
- Dynamically updates DOM to display search results, including price and 24-hour percentage change

---

## Optimizations

While this is an MVP, there are several areas for future improvement:

- Caching results: cache frequently searched results locally to minimize API calls
- Pagination/search suggestions: show a list of suggestions as users type to guide their searches
- For simplicity, I used a CDN to include Tailwind CSS and DaisyUI, but I would switch to npm for dependency management

---

## Lessons Learned:

- API integration: This MVP was an excellent opportunity to deepen my understanding of how to work with APIs and handle asynchronous requests with fetch
- Dynamic DOM manipulation: It was a good time to review DOM manipulation - dynamically updating the DOM in res to user input and API res
- Error Handling: Read the docs!! Reading through the docs allowed me to handle errors (e.g., invalid input, API failures, etc.)
