const cryptoContainer = document.getElementById('crypto-container');
const statusText = document.getElementById('status-text');

const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,ripple&order=market_cap_desc";

async function fetchCryptoData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        renderDashboard(data);
        
        const now = new Date();
        statusText.textContent = `Last updated at: ${now.toLocaleTimeString()}`;
    } catch (error) {
        statusText.textContent = "Error fetching data. Retrying...";
    }
}

function renderDashboard(coins) {
    cryptoContainer.innerHTML = "";
    
    coins.forEach(coin => {
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeClass = isPositive ? 'price-up' : 'price-down';
        const changeSign = isPositive ? '+' : '';

        const card = document.createElement('div');
        card.classList.add('crypto-card');
        
        card.innerHTML = `
            <div class="coin-info">
                <span class="coin-name">${coin.name}</span>
                <span class="coin-symbol">${coin.symbol}</span>
            </div>
            <div class="coin-stats">
                <span class="coin-price">$${coin.current_price.toLocaleString()}</span>
                <span class="price-change ${changeClass}">${changeSign}${coin.price_change_percentage_24h.toFixed(2)}%</span>
            </div>
        `;
        
        cryptoContainer.appendChild(card);
    });
}

fetchCryptoData();

setInterval(fetchCryptoData, 10000);