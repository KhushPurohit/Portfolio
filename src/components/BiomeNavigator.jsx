import React from 'react';

export default function BiomeNavigator({ biomes, currentBiome, onNavigate, timeOfDay, onToggleTime }) {
  return (
    <nav className="navigator" role="navigation" aria-label="Biome Navigation">
      {biomes.map((b, i) => (
        <button
          key={b.id}
          className={`nav-biome-dot ${i === currentBiome ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={`Navigate to ${b.label}`}
          title={b.label}
        >
          {b.icon}
          <span className="tooltip">{b.label}</span>
        </button>
      ))}

      <button
        className="time-toggle"
        onClick={onToggleTime}
        aria-label={`Switch to ${timeOfDay === 'day' ? 'night' : 'day'} mode`}
        title={timeOfDay === 'day' ? 'Switch to Night' : 'Switch to Day'}
      >
        {timeOfDay === 'day' ? '☀' : '🌙'}
      </button>
    </nav>
  );
}
