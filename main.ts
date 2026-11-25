// Token radar: fetch CoinGecko simple price BTC/ETH/SOL,
// rank by 24h change, print top gainers + losers.
// Node 22 native fetch, no deps.

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';

async function fetchCoinData() {
  const params = new URLSearchParams({
    ids: 'bitcoin,ethereum,solana',
    vs_currencies: 'usd',
    include_24h_change: 'true',
  });
  const res = await fetch(`${COINGECKO_URL}?${params}`);
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  return res.json();
}

function rankByChange(data: any) {
  const coins: { id: string; price: number; change24h: number }[] = [];
  for (const [id, info] of Object.entries(data)) {
    coins.push({
      id,
      price: (info as any).usd,
      change24h: (info as any).usd_24h_change ?? 0,
    });
  }
  return coins.sort((a, b) => b.change24h - a.change24h);
}

async function main() {
  const data = await fetchCoinData();
  const ranked = rankByChange(data);
  const gainers = ranked.slice(0, 3);
  const losers = ranked.slice(-3).reverse();

  console.log('=== TOP GAINERS (24h) ===');
  for (const c of gainers) {
    console.log(`${c.id.padEnd(10)} $${c.price} (${c.change24h > 0 ? '+' : ''}${c.change24h.toFixed(2)}%)`);
  }
  console.log('\n=== TOP LOSERS (24h) ===');
  for (const c of losers) {
    console.log(`${c.id.padEnd(10)} $${c.price} (${c.change24h > 0 ? '+' : ''}${c.change24h.toFixed(2)}%)`);
  }
  const best = ranked[0], worst = ranked[ranked.length - 1];
  console.log(`\nLeader: ${best.id} (${best.change24h.toFixed(2)}%) | Laggard: ${worst.id} (${worst.change24h.toFixed(2)}%)`);
}

main().catch((e) => { console.error('Error:', e.message); process.exit(1); });
