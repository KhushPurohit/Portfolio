import React, { useState, useEffect } from 'react';

export default function OrbitalNavigation({ modules, activeModule, onSelectModule }) {
  const [radius, setRadius] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(180);
      } else if (window.innerWidth < 1100) {
        setRadius(260);
      } else {
        setRadius(340);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="orbital-nav-ring" aria-label="Orbital Navigation">
      {modules.map((mod, index) => {
        const total = modules.length;
        const angle = (index * (2 * Math.PI / total)) - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = activeModule === index;

        return (
          <div
            key={mod.id}
            className={`orbital-node ${isActive ? 'active' : ''}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            onClick={() => onSelectModule(isActive ? null : index)}
            title={mod.name}
          >
            <span style={{ fontSize: '20px' }}>{mod.icon}</span>
            <span className="orbital-node-label-permanent">
              {mod.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
