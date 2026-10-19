import React, { useMemo } from 'react';

export default function WorldScene({ timeOfDay, currentBiome }) {
  // Generate stars once
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
    }))
  , []);

  // Generate clouds once
  const clouds = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 120 - 10}%`,
      top: `${5 + Math.random() * 30}%`,
      width: 180 + Math.random() * 200,
      height: 40 + Math.random() * 40,
      duration: `${60 + Math.random() * 80}s`,
      delay: `${Math.random() * 40}s`,
    }))
  , []);

  return (
    <>
      {/* Stars (visible at night) */}
      <div className="world-stars" aria-hidden="true">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      {clouds.map(c => (
        <div
          key={c.id}
          className="world-cloud"
          style={{
            left: c.left,
            top: c.top,
            width: c.width,
            height: c.height,
            animationDuration: c.duration,
            animationDelay: c.delay,
          }}
        />
      ))}

      {/* Light rays (day only) */}
      {timeOfDay === 'day' && (
        <>
          <div className="light-ray" style={{ left: '15%', animationDelay: '0s' }} />
          <div className="light-ray" style={{ left: '55%', animationDelay: '3s', width: '80px' }} />
          <div className="light-ray" style={{ left: '80%', animationDelay: '6s', width: '100px' }} />
        </>
      )}
    </>
  );
}
