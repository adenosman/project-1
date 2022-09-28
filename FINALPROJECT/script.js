var baseUrl = "https://api.coinranking.com/v2/coins?limit=100";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "coinranking699908fedaf2648612b22af9ea0451135db57764abbe0082";
// https://cors-anywhere.herokuapp.com/corsdemo Request Temporary Access

const coinList = document.getElementById("data")
const filterInput = document.getElementById("filter")

let coinsData = []
let filteredCoins = []

// Formatting for market cap

var formatCash = n => {
  if (n < 1e3) return n;
  if (n >= 1e4) return + (n / 1e9).toFixed(2) + " billion"
}

// Event Listener for input search 

filterInput.addEventListener('keyup', (e) => {
  const inputValue = e.target.value.toLowerCase();

  filteredCoins = coinsData.filter(coin => {
    return coin.name.toLowerCase().includes(inputValue)
  })
  displayCoins(filteredCoins)
})

var apiUrl = `${proxyUrl}${baseUrl}`;

// Async function loads coins

const loadCoins = async () => {
  try {
    const res = await fetch(apiUrl)
    const dataResponse = await res.json()
    coinsData = dataResponse.data.coins
    console.log(dataResponse)
    displayCoins(dataResponse.data.coins)
  } catch (error) {
    console.log(error)
  }
}

// Display Coins on Page

const displayCoins = (coins) => {
  const htmlString = coins.map((coin) => {

    let trend = ''
    if (coin.change > 0) {
      trend = `<td class="green">+${coin.change}%</td>`;
    }
    else {
      trend = `<td class="red">${coin.change}%</td>`;
    }
    return (`
    <tr>
      <td>${coin.rank}</td>
      <td>${coin.name}</td>
      <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coin.price)}</td>
      <td>${formatCash(coin.marketCap)}</td>
      <td>${coin.symbol}</td>
      <td><img src="${coin.iconUrl}" height="25" width="25" /></td>
      ${trend}
      <td>
      <a href="${coin.coinrankingUrl}" target="_blank">
      <i class="fas fa-chart-line"></i>
      </a>
      </td>
    </tr>
    `)
  })
    .join('');
  coinList.innerHTML = htmlString
}
loadCoins()