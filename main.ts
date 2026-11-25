#!/usr/bin/env node
import { execSync } from 'child_process';

// Fetch CoinGecko simple prices for BTC, ETH, SOL
const prices = {
  btc: execSync('curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"').toString().match(/"btc":"([^"]+)"/)[1],
  eth: execSync('curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"').match(/"ethereum":"([^"]+)"/)[1],
  sol: execSync('curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"').match(/"solana":"([^"]+)"/)[1],
};

// Calculate 24h change (assume prices are current)
const btc24h = parseFloat(prices.btc) / 1000000; // example conversion
const eth24h = parseFloat(prices.eth) / 1000000;
const sol24h = parseFloat(prices.sol) / 1000000;

// Determine top gainers/losers (mocked for demo)
const gainers = [
  { name: 'Bitcoin', change: btc24h, value: prices.btc },
  { name: 'Ethereum', change: eth24h, value: prices.eth },
  { name: 'Solana', change: sol24h, value: prices.sol }
];

// Find top 2 gainers and 2 losers by absolute change
gainers.sort((a, b) => b.change - a.change);
const topGainers = gainers.slice(0, 2);
const topLosers = gainers.slice(-2).reverse();

// Print results
console.log('Top Gainers (24h change):');
gainers.forEach(item => {
  console.log(`${item.name}: ${(item.change * 100).toFixed(2)}% (${item.value})`);
});

console.log('\nTop Losers (24h change):');
topLosers.forEach(item => {
  console.log(`${item.name}: ${(item.change * 100).toFixed(2)}% (${item.value})`);
});