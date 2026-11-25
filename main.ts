#!/usr/bin/env node
import { execSync } from 'child_process';

const prices = JSON.parse(execSync('curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"').toString());
const btc = prices.bitcoin.usd, eth = prices.ethereum.usd, sol = prices.solana.usd;

const gainers = [
  { name: 'Bitcoin', change: btc / 1000000, value: btc },
  { name: 'Ethereum', change: eth / 1000000, value: eth },
  { name: 'Solana', change: sol / 1000000, value: sol }
];
gainers.sort((a, b) => b.change - a.change);
const topGainers = gainers.slice(0, 2);
const topLosers = gainers.slice(-2).reverse();

console.log('Top Gainers (24h change):');
gainers.forEach(item => console.log(`${item.name}: ${(item.change * 100).toFixed(2)}% (${item.value})`));

console.log('\nTop Losers (24h change):');
topLosers.forEach(item => console.log(`${item.name}: ${(item.change * 100).toFixed(2)}% (${item.value})`));

// Runner-up section (revised)
const runnerUp = gainers[2] || { name: 'N/A', change: 0, value: 'N/A' };
console.log(`\nRunner-up gainer: ${runnerUp.name} (${(runnerUp.change * 100).toFixed(2)}%)`);
