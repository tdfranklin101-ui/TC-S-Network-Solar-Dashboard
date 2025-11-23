document.getElementById("root").innerHTML = `
  <div style="max-width: 1200px; margin: 0 auto;">
    <h1 style="color: #fbbf24; font-size: 3rem; margin-bottom: 1rem;">☀️ Solar Dashboard</h1>
    <p style="color: #9ca3af; font-size: 1.2rem; margin-bottom: 2rem;">Real-time Solar Index & Reserve tracking</p>
    
    <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 8px; padding: 2rem;">
      <h2 style="margin-top: 0;">📊 Live Metrics</h2>
      <p>Solar Index (SI): <strong style="color: #fbbf24;">Loading...</strong></p>
      <p>Solar Reserve: <strong style="color: #fbbf24;">Loading...</strong></p>
      <p>Status: <strong style="color: #10b981;">OPERATIONAL</strong></p>
    </div>
    
    <p style="margin-top: 2rem; color: #6b7280; font-size: 0.875rem;">
      Part of the TC-S Network Constellation
    </p>
  </div>
`;

// Fetch real data
fetch('/api/solar-index')
  .then(r => r.json())
  .then(data => {
    console.log('Solar Index data:', data);
  })
  .catch(e => console.error('Failed to load Solar Index:', e));
