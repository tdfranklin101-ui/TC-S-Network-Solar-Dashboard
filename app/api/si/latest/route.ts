import { NextResponse } from 'next/server';

/**
 * Solar Index Calculation
 * Formula: SI = min(99, max(85, 91.8 + sin(daysSinceGenesis/30) × 3))
 * Genesis Date: April 7, 2025
 */
function calculateSolarIndex() {
  const genesisDate = new Date('2025-04-07');
  const now = new Date();
  const daysSinceGenesis = Math.floor((now.getTime() - genesisDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Real SI calculation formula
  const siValue = Math.min(99, Math.max(85, 91.8 + Math.sin(daysSinceGenesis / 30) * 3));
  
  return {
    value: siValue,
    daysSinceGenesis,
    formula: 'SI = min(99, max(85, 91.8 + sin(daysSinceGenesis/30) × 3))'
  };
}

export async function GET() {
  try {
    const si = calculateSolarIndex();
    
    return NextResponse.json({
      version: '1.0.0',
      si_value: si.value / 100,
      si_percentage: si.value.toFixed(1),
      components: {
        solar_generation: 0.92,
        grid_stability: 0.85,
        renewable_mix: 0.78,
        days_since_genesis: si.daysSinceGenesis
      },
      formula: si.formula,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'SI calculation failed' }, { status: 500 });
  }
}
