import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { FiGithub, FiX } from 'react-icons/fi';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      {/* Holographic Cubes Grid */}
      <div className="project-cubes-grid">
        {projectsData.map(project => (
          <div
            key={project.id}
            className="project-cube-card"
            onClick={() => setSelectedProject(project)}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', marginBottom: '8px' }}>
              [ HOLOGRAPHIC CUBE ]
            </div>
            <div className="cube-card-title">{project.title}</div>
            <div className="cube-card-tagline">{project.tagline}</div>
            <p className="cube-card-desc">{project.overview.slice(0, 110)}…</p>
            <div style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>EXPAND CUBE TELEMETRY</span> ↳
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Holographic Analysis Overlay */}
      {selectedProject && (
        <div className="project-detail-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-detail-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  QUANTUM CUBE DECRYPTION — {selectedProject.category}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="panel-close-btn"
              >
                <FiX />
              </button>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {selectedProject.overview}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0, 240, 255, 0.03)', padding: '14px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.12)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>Problem Vector</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{selectedProject.problem}</div>
              </div>
              <div style={{ background: 'rgba(0, 240, 255, 0.03)', padding: '14px', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.12)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>Engineering Solution</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{selectedProject.solution}</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Impact &amp; Results</div>
              <div style={{ fontSize: '13px', color: 'var(--cyan)', fontWeight: '500' }}>{selectedProject.results}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-lab-cyan">
                <FiGithub /> Source Code
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
