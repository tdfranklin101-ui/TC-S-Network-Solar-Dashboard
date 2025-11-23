'use client';
import { useEffect, useState } from 'react';

interface SIData {
  version: string;
  si_value: number;
  components: any;
  timestamp: string;
  error?: boolean;
}

export default function SIHeader() {
  const [si, setSi] = useState<SIData | null>(null);

  useEffect(() => {
    fetch('/api/si/latest')
      .then(r => r.json())
      .then(setSi)
      .catch(() => setSi({ version: '', si_value: 0, components: {}, timestamp: '', error: true }));
  }, []);

  if (!si) return <div className="text-gray-400 font-mono text-sm">Loading Solar Index…</div>;
  if (si.error) return <div className="text-red-500 font-mono text-sm">SI unavailable</div>;

  const value = (si.si_value * 100).toFixed(1);

  return (
    <div className="p-4 bg-black/60 rounded-lg border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.1)] backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-yellow-400/70 uppercase tracking-wider mb-1">Global Stability Metric</div>
          <h2 className="text-3xl font-display font-bold text-yellow-300">
            SI: {value}%
          </h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-gray-400 mb-1">UPDATED</div>
          <p className="text-xs font-mono text-gray-300">
            {new Date(si.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
