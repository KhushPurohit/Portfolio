import React, { useState } from 'react';
import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import LabBackground from './components/LabBackground';
import DigitalTwinAvatar from './components/DigitalTwinAvatar';
import OrbitalNavigation from './components/OrbitalNavigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubDashboard from './components/GithubDashboard';
import Achievements from './components/Achievements';
import Journey from './components/Journey';
import TerminalContact from './components/TerminalContact';
import AIAssistant from './components/AIAssistant';
import { FiX } from 'react-icons/fi';

const MODULES = [
  { id: 'about',        name: 'About Me',      label: 'Identity Scan',      icon: '🧬', title: 'Personal Identity Scan', component: About },
  { id: 'skills',       name: 'Skills',        label: 'Neural Network',     icon: '⚡', title: 'AI Neural Network Graph', component: Skills },
  { id: 'projects',     name: 'Projects',      label: 'Quantum Cubes',      icon: '🧊', title: 'Holographic Quantum Cubes', component: Projects },
  { id: 'github',       name: 'GitHub',        label: 'Research Archive',   icon: '🔭', title: 'Starlight Research Archive', component: GithubDashboard },
  { id: 'achievements', name: 'Achievements',  label: 'Trophy Chambers',    icon: '🏆', title: 'Suspended Trophy Chambers', component: Achievements },
  { id: 'journey',      name: 'Experience',    label: 'Energy Timeline',     icon: '❇️', title: 'Energy Beam Timeline', component: Journey },
  { id: 'contact',      name: 'Contact',       label: 'AI Terminal',         icon: '🛰', title: 'AI Communication Terminal', component: TerminalContact },
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  const ActiveComponent = activeModule !== null ? MODULES[activeModule]?.component : null;

  return (
    <>
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <div className="lab-app-wrapper">
          {/* Scanline overlay */}
          <div className="scanline-overlay" />

          {/* 3D Lab Background Grid & Motes */}
          <LabBackground />

          {/* Central 3D Holographic Digital Twin Avatar */}
          <div className="central-avatar-container">
            <DigitalTwinAvatar activeModule={activeModule} />
          </div>

          <CustomCursor />

          {/* Top Header & HUD */}
          {activeModule === null && (
            <Hero onOpenModule={(index) => setActiveModule(index)} />
          )}

          {/* Orbital Node Navigation Ring (Spacious & Decluttered) */}
          <OrbitalNavigation
            modules={MODULES}
            activeModule={activeModule}
            onSelectModule={(index) => setActiveModule(index)}
          />

          {/* Holographic Glass Panel Overlay (When a module is selected) */}
          <div className={`hologram-panel ${activeModule !== null ? 'active' : ''}`}>
            {ActiveComponent && (
              <>
                <div className="panel-hud-bar">
                  <div className="panel-hud-title">
                    <span className="panel-hud-dot" />
                    TELEMETRY MODULE 0{activeModule + 1} — {MODULES[activeModule].name.toUpperCase()}
                  </div>
                  <button onClick={() => setActiveModule(null)} className="panel-close-btn" title="Close Module">
                    <FiX />
                  </button>
                </div>

                <h2 className="panel-heading">
                  {MODULES[activeModule].title.split(' ')[0]} <span className="cyan-glow">{MODULES[activeModule].title.split(' ').slice(1).join(' ')}</span>
                </h2>

                <ActiveComponent />
              </>
            )}
          </div>

          {/* AI Core Oracle Assistant */}
          <AIAssistant />
        </div>
      )}
    </>
  );
}
