import { NextResponse } from 'next/server';

const SOLAR_KWH = 4913;
const ELECTRICITY_COST_PER_KWH = 0.12;

interface PriceCache {
  btc: { price: number; timestamp: number } | null;
  brent: { price: number; timestamp: number } | null;
}

const priceCache: PriceCache = { btc: null, brent: null };
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchBTCPrice(): Promise<number | null> {
  if (priceCache.btc && Date.now() - priceCache.btc.timestamp < CACHE_DURATION) {
    return priceCache.btc.price;
  }
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 300 } }
    );
    if (!response.ok) return priceCache.btc?.price || 97500;
    const data = await response.json();
    const price = data?.bitcoin?.usd;
    if (price) priceCache.btc = { price, timestamp: Date.now() };
    return price || priceCache.btc?.price || 97500;
  } catch {
    return priceCache.btc?.price || 97500;
  }
}

async function fetchBrentPrice(): Promise<number> {
  if (priceCache.brent && Date.now() - priceCache.brent.timestamp < CACHE_DURATION) {
    return priceCache.brent.price;
  }
  return priceCache.brent?.price || 73.50;
}

export async function GET() {
  try {
    const [btcPrice, brentPrice] = await Promise.all([fetchBTCPrice(), fetchBrentPrice()]);
    const solarUsdValue = SOLAR_KWH * ELECTRICITY_COST_PER_KWH;
    
    const fiatIndex = 100;
    const btcIndex = btcPrice ? Math.round((btcPrice / 1000) * 1.2) : null;
    const solarIndex = Math.round((solarUsdValue / 10) * 1.5);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      prices: {
        btc: { price: btcPrice, currency: 'USD', symbol: 'BTC', name: 'Bitcoin' },
        brent: { price: brentPrice, currency: 'USD', unit: 'barrel', symbol: 'RBRTE', name: 'Brent Crude Oil' },
        solar: { kwhValue: SOLAR_KWH, usdValue: solarUsdValue.toFixed(2), name: 'Solar Token' }
      },
      indices: {
        fiat: { name: 'Fiat (USD)', value: fiatIndex, unit: '' },
        btc: { name: 'Crypto (BTC)', value: btcIndex, unit: '' },
        solar: { name: 'Solar Index', value: solarIndex, unit: '%' },
        brent: { name: 'Brent Crude', value: Math.round(brentPrice * 1.3), unit: '' }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch market prices' }, { status: 500 });
  }
}
