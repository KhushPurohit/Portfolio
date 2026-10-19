import React from 'react';
import { journeyTimeline } from '../data/portfolioData';

export default function Journey() {
  return (
    <div className="energy-timeline-beam">
      {journeyTimeline.map(item => (
        <div key={item.id} className="checkpoint-node">
          <div className="checkpoint-year">{item.period}</div>
          <div className="checkpoint-title">{item.title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)', marginTop: '2px' }}>
            {item.subtitle}
          </div>
          <div className="checkpoint-desc">{item.description}</div>
        </div>
      ))}
    </div>
  );
}
