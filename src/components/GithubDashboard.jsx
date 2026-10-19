import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const generateGrid = () =>
  Array.from({ length: 140 }, () => {
    const r = Math.random();
    if (r > 0.85) return 4;
    if (r > 0.68) return 3;
    if (r > 0.48) return 2;
    if (r > 0.28) return 1;
    return 0;
  });

const STATS = [
  { num: 38,   suffix: '',      label: 'Research Repos' },
  { num: 1420, suffix: '+',     label: 'Code Commits' },
  { num: 124,  suffix: '★',    label: 'Telemetry Stars' },
  { num: 184,  suffix: ' Days', label: 'Continuous Streak' },
];

export default function GithubDashboard() {
  const containerRef = useRef(null);
  const [vals, setVals] = useState(STATS.map(() => 0));
  const cells = useRef(generateGrid());

  useEffect(() => {
    STATS.forEach(({ num }, i) => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: num,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          setVals(prev => { const n = [...prev]; n[i] = Math.floor(obj.v); return n; });
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Metric counters */}
      <div className="github-metrics-grid">
        {STATS.map((s, i) => (
          <div key={s.label} className="github-metric-item">
            <div className="github-metric-num" style={{ color: 'var(--cyan)' }}>
              {vals[i]}{s.suffix}
            </div>
            <div className="github-metric-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Simulated Heatmap */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
          52-Week Research Log Matrix
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(28, 1fr)', gap: '4px' }}>
          {cells.current.map((lvl, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: '1px',
                background: lvl === 4 ? 'var(--cyan)' : lvl === 3 ? 'rgba(0, 240, 255, 0.6)' : lvl === 2 ? 'rgba(0, 240, 255, 0.35)' : lvl === 1 ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                boxShadow: lvl === 4 ? '0 0 8px var(--cyan)' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
