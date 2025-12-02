'use client';
import { useState } from "react";

export function SIAlignmentTestButton() {
  const [status, setStatus] = useState<null | string>(null);
  const [running, setRunning] = useState(false);

  const runTest = async () => {
    setRunning(true);
    setStatus("Running SI alignment test…");

    try {
      const response = await fetch('/api/si/latest');
      const data = await response.json();
      
      if (data.si_percentage) {
        setStatus(`✅ Current Solar Index: ${data.si_percentage}% (Days since genesis: ${data.components?.days_since_genesis})`);
      } else {
        setStatus("❌ Could not parse SI from API.");
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err?.message ?? "Unknown error"}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-black/40 rounded-lg border border-emerald-400/30">
      <button
        onClick={runTest}
        disabled={running}
        className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
      >
        {running ? "Testing SI…" : "Run SI Test"}
      </button>
      {status && (
        <p className="text-xs text-gray-300 whitespace-pre-line">{status}</p>
      )}
    </div>
  );
}
