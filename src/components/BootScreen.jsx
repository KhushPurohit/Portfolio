import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const barRef = useRef(null);

  const LOGS = [
    '⚡ INITIALIZING DIGITAL TWIN...',
    '→ Loading Neural Network...',
    '→ Loading Research Database...',
    '→ Loading Engineering Modules...',
    '→ Synchronizing Knowledge...',
    '✓ Twin Status: ONLINE',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOGS.length) { setLines(prev => [...prev, LOGS[i++]]); }
      else clearInterval(interval);
    }, 320);

    const obj = { v: 0 };
    gsap.to(obj, {
      v: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(obj.v)),
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });
    if (barRef.current) {
      gsap.to(barRef.current, { width: '100%', duration: 2.2, ease: 'power2.inOut' });
    }

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="lab-boot-screen">
      <div className="lab-boot-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--cyan)', letterSpacing: '0.15em' }}>
            DIGITAL TWIN BOOT ENGINE v6.0
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>
            {progress}%
          </span>
        </div>

        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {lines.map((l, i) => (
            <div key={i} className="boot-log-line">{l}</div>
          ))}
        </div>

        <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.08)', marginTop: '20px' }}>
          <div ref={barRef} style={{ height: '100%', width: '0%', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }} />
        </div>

        <button
          onClick={onComplete}
          style={{
            marginTop: '20px',
            background: 'none',
            border: 'none',
            color: 'rgba(0, 240, 255, 0.4)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          [ INITIALIZATION BYPASS ]
        </button>
      </div>
    </div>
  );
}
