import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { initMagneticEffect } from '../utils/magnetic';
import { FiCpu, FiDownload } from 'react-icons/fi';

export default function Hero({ onOpenModule }) {
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);

  useEffect(() => {
    const cleanup1 = initMagneticEffect(btn1Ref.current, 16);
    const cleanup2 = initMagneticEffect(btn2Ref.current, 16);
    return () => { cleanup1?.(); cleanup2?.(); };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 12, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 40px' }}>

      {/* Top Header Row — Decluttered & non-overlapping */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', pointerEvents: 'auto' }}>
        
        {/* Top Left: Brand / Name */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>
            AI DIGITAL TWIN v6.0
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
            {personalInfo.name}
          </h1>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {personalInfo.title} • Ahmedabad, Gujarat
          </div>
        </div>

        {/* Top Right: Clean Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button ref={btn1Ref} onClick={() => onOpenModule(0)} className="btn-lab-cyan" style={{ padding: '10px 20px', fontSize: '11px' }}>
            <span>Scan Identity</span> <FiCpu />
          </button>
          <a ref={btn2Ref} href={personalInfo.resumeUrl} download="Khush_Purohit_Resume.pdf" className="btn-lab-cyan" style={{ padding: '10px 20px', fontSize: '11px', borderColor: 'rgba(0, 240, 255, 0.3)', background: 'rgba(0, 240, 255, 0.05)' }}>
            <span>Decrypt Resume</span> <FiDownload />
          </a>
        </div>

      </div>

      {/* Bottom Status Prompt */}
      <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0, 240, 255, 0.1)', paddingTop: '10px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          CORE STATUS: ONLINE
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
          SELECT ANY ORBITAL CARD TO EXPAND MODULE
        </span>
      </div>

    </div>
  );
}
