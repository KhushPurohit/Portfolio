import React, { useMemo } from 'react';

export default function WeatherSystem({ timeOfDay, currentBiome }) {
  // Fireflies — visible at night, mainly in forest/spawn biomes
  const fireflies = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 60}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: 3 + Math.random() * 3,
    }))
  , []);

  // Falling leaves — forest biome
  const leaves = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: 5 + Math.random() * 6,
      hue: Math.random() > 0.5 ? '#7a9a50' : '#a0864a',
    }))
  , []);

  const showFireflies = timeOfDay === 'night';
  const showLeaves = currentBiome === 2; // forest
  const showDust = currentBiome === 5 || currentBiome === 6; // mountain, path

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Fireflies at night */}
      {showFireflies && fireflies.map(f => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        />
      ))}

      {/* Falling leaves in forest */}
      {showLeaves && leaves.map(l => (
        <div
          key={l.id}
          className="falling-leaf"
          style={{
            left: l.left,
            width: l.size,
            height: l.size,
            background: l.hue,
            animationDelay: l.delay,
            animationDuration: l.duration,
          }}
        />
      ))}

      {/* Dust particles on mountains/path */}
      {showDust && Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${30 + Math.random() * 50}%`,
            width: 2,
            height: 2,
            background: 'rgba(200, 190, 170, 0.4)',
            boxShadow: 'none',
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}
