import React from 'react';
import { achievementsData } from '../data/portfolioData';

export default function Achievements() {
  return (
    <div className="chamber-grid">
      {achievementsData.map(award => (
        <div key={award.id} className="chamber-cell">
          <div className="chamber-icon">{award.icon}</div>
          <div className="chamber-issuer">{award.issuer}</div>
          <div className="chamber-title">{award.title}</div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '4px' }}>
            {award.description}
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>
            CHAMBER REGISTRY: {award.year}
          </div>
        </div>
      ))}
    </div>
  );
}
