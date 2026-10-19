import React, { useState } from 'react';
import { aboutCards, personalInfo } from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['overview', 'ethos', 'specs'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 16px',
              background: activeTab === tab ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
              border: '1px solid',
              borderColor: activeTab === tab ? 'var(--cyan)' : 'rgba(0, 240, 255, 0.1)',
              borderRadius: '2px',
              color: activeTab === tab ? 'var(--white)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '28px' }}>
          {personalInfo.bio} Maintaining a 9.13 CGPA at GLS University in Computer Science & Engineering. Specializing in machine learning models, cloud security threat detection, and 3D digital twins.
        </p>
      )}

      {activeTab === 'ethos' && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {['Predictive neural anomaly detection', 'Robust microservice architectures (Node / Flask / AWS)', 'Low latency 3D geospatial rendering (CesiumJS)'].map((e, i) => (
            <li key={i} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--cyan)' }}>✦</span> {e}
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'specs' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
          {[
            ['Subject Name', personalInfo.name],
            ['Current Role', personalInfo.title],
            ['Location Scan', personalInfo.socials.location],
            ['Academic Track', 'B.Tech CSE (2023-2027)'],
            ['Academic CGPA', '9.13 (Merit Scholar)'],
            ['System Status', 'Open to Opportunities'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(0, 240, 255, 0.03)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(0,240,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Identity Scan Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', borderTop: '1px solid rgba(0, 240, 255, 0.1)', paddingTop: '24px' }}>
        {aboutCards.map((card, idx) => (
          <div key={card.id} style={{ border: '1px solid rgba(0, 240, 255, 0.12)', padding: '16px', borderRadius: '4px', background: 'rgba(0,240,255,0.02)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', marginBottom: '4px' }}>
              DIAGNOSTIC NODE 0{idx + 1}
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {card.description}
            </p>
            <span style={{ display: 'inline-block', marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)' }}>
              ↳ {card.metric}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
