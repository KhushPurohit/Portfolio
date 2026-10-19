import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { FiSearch } from 'react-icons/fi';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const filteredCategories = skillCategories.filter(cat => activeTab === 'all' || cat.id === activeTab);

  return (
    <div>
      {/* Category filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        <button
          className={`neural-node-chip ${activeTab === 'all' ? 'active' : ''}`}
          style={{ background: activeTab === 'all' ? 'var(--cyan)' : undefined, color: activeTab === 'all' ? '#000' : undefined }}
          onClick={() => setActiveTab('all')}
        >
          All Synapses
        </button>
        {skillCategories.map(cat => (
          <button
            key={cat.id}
            className={`neural-node-chip ${activeTab === cat.id ? 'active' : ''}`}
            style={{ background: activeTab === cat.id ? 'var(--cyan)' : undefined, color: activeTab === cat.id ? '#000' : undefined }}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--cyan)' }} />
        <input
          style={{
            width: '100%',
            background: 'rgba(0, 240, 255, 0.04)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '2px',
            padding: '8px 12px 8px 36px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
          placeholder="Filter neural network nodes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Neural Graph Node Clusters */}
      <div className="neural-graph-container">
        {filteredCategories.map(cat => {
          const matchingSkills = cat.skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
          if (matchingSkills.length === 0) return null;

          return (
            <div key={cat.id} className="neural-node-group">
              <div className="neural-group-title">
                ⚡ Neural Cluster: {cat.title}
              </div>
              <div className="neural-nodes-row">
                {matchingSkills.map(skill => (
                  <div key={skill.name} className="neural-node-chip" title={`${skill.experience} exp | ${skill.desc}`}>
                    {skill.name} <span style={{ color: 'var(--cyan)', marginLeft: '4px', fontSize: '10px' }}>{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
