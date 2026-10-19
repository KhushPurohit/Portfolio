import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const socials = [
    { label: 'GitHub',   href: personalInfo.socials.github },
    { label: 'LinkedIn', href: personalInfo.socials.linkedin },
    { label: 'Email',    href: `mailto:${personalInfo.socials.email}` },
  ];

  return (
    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)' }}>
        DIGITAL TWIN LAB v6.0
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        {socials.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textDecoration: 'none', textTransform: 'uppercase' }}>
            {s.label}
          </a>
        ))}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
        © 2026 Khush Purohit — AI Core Edition
      </div>
    </div>
  );
}
