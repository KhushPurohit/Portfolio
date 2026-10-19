import React, { useState, useRef, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import Footer from './Footer';

export default function TerminalContact() {
  const [history, setHistory] = useState([
    { text: 'AI Communication Terminal v6.0 — Online', type: 'system' },
    { text: "Type 'help' for available diagnostic commands.", type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const runCmd = cmd => {
    const t = cmd.trim().toLowerCase();
    const next = [...history, { text: `twin@lab:~$ ${cmd}`, type: 'input' }];
    switch (t) {
      case 'help':
        next.push({ text: 'Commands: help · projects · skills · resume · clear', type: 'output' }); break;
      case 'projects':
        next.push({ text: 'CO2 Digital Twin · Cloud Threat Detection · OpenDK — inspect Quantum Cubes.', type: 'output' }); break;
      case 'skills':
        next.push({ text: 'Python · Java · C/C++ · JS · React · Node · Flask · AWS · SQL', type: 'output' }); break;
      case 'resume':
        next.push({ text: 'Decrypting classified resume document...', type: 'system' });
        window.open(personalInfo.resumeUrl, '_blank');
        break;
      case 'clear':
        setHistory([]); return;
      default:
        next.push({ text: `Unknown transmission: '${t}'. Try 'help'.`, type: 'output' });
    }
    setHistory(next);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setHistory(prev => [...prev,
        { text: `✓ AI Transmission from ${formData.name} synchronized to laboratory core.`, type: 'system' }
      ]);
    }, 1800);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Terminal */}
        <div className="lab-terminal-shell">
          <div className="lab-terminal-header">
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ fontSize: '10px', color: 'var(--cyan)', marginLeft: '6px' }}>twin@lab: ~/beacon</span>
          </div>
          <div className="lab-terminal-body">
            {history.map((line, i) => (
              <div key={i} style={{ color: line.type === 'system' ? 'var(--cyan)' : line.type === 'input' ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '3px' }}>
                {line.text}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <span style={{ color: 'var(--cyan)' }}>~$</span>
              <input
                style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '13px', flex: 1 }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && input.trim()) {
                    runCmd(input);
                    setInput('');
                  }
                }}
                placeholder="transmit signal..."
              />
            </div>
            <div ref={endRef} />
          </div>
        </div>

        {/* Transmission Form */}
        <div>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <FiCheckCircle style={{ fontSize: '42px', color: 'var(--cyan)', marginBottom: '12px' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)' }}>TRANSMISSION COMPLETE</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Digital twin will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="lab-form-field">
                <label>Operator Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="lab-form-field">
                <label>Signal Endpoint (Email)</label>
                <input
                  type="email"
                  placeholder="operator@domain.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="lab-form-field">
                <label>Transmission Payload</label>
                <textarea
                  rows={3}
                  placeholder="Your message payload..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-lab-cyan" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Transmit Payload</span> <FiSend />
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
