import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const siData = {
      version: '1.0.0',
      si_value: 0.847,
      components: {
        solar_generation: 0.92,
        grid_stability: 0.85,
        renewable_mix: 0.78
      },
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(siData);
  } catch (error) {
    return NextResponse.json({ error: 'SI calculation failed' }, { status: 500 });
  }
}
