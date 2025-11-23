import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const standardsPath = path.join(process.cwd(), '../../standards/solar-index-v1.json');
    const schema = JSON.parse(fs.readFileSync(standardsPath, 'utf8'));

    const dataPath = path.join(process.cwd(), '../../data/si-latest.json');
    const latest = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    return NextResponse.json({
      version: schema.si_version,
      si_value: latest.si_value,
      components: latest.components,
      timestamp: latest.timestamp
    });
  } catch (err) {
    return NextResponse.json({ error: 'SI unavailable', details: String(err) }, { status: 500 });
  }
}
