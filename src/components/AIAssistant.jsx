import React, { useState, useRef, useEffect } from 'react';
import { aiAssistantQA } from '../data/portfolioData';
import { FiX, FiSend } from 'react-icons/fi';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState([
    { sender: 'bot', text: "AI Core Online. Query me for telemetry on Khush's projects, skills, education, or achievements." }
  ]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const sendMsg = txt => {
    if (!txt.trim()) return;
    setMsgs(prev => [...prev, { sender: 'user', text: txt }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const q = txt.toLowerCase();
      const found = aiAssistantQA.find(item => item.keywords.some(k => q.includes(k)));
      const reply = found?.answer ?? "Query unindexed. Try asking about 'projects', 'skills', 'education', or 'contact'.";
      setMsgs(prev => [...prev, { sender: 'bot', text: reply }]);
      setTyping(false);
    }, 700);
  };

  const chips = ['Projects?', 'Tech Stack?', 'Contact Signal?'];

  return (
    <>
      <button
        className="wisp-fab"
        onClick={() => setOpen(v => !v)}
        title="Invoke AI Core Oracle"
      >
        {open ? <FiX /> : '🤖'}
      </button>

      {open && (
        <div className="wisp-chat">
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ✦ AI Core Oracle
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px' }}
            >
              <FiX />
            </button>
          </div>

          <div className="wisp-chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`wisp-msg ${m.sender}`}>{m.text}</div>
            ))}
            {typing && (
              <div className="wisp-msg bot" style={{ fontStyle: 'italic', opacity: 0.6 }}>Querying neural database…</div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ padding: '0 12px 6px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
            {chips.map(c => (
              <button
                key={c}
                onClick={() => sendMsg(c)}
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(0, 240, 255, 0.04)',
                  border: '1px solid rgba(0, 240, 255, 0.12)',
                  color: 'var(--cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  padding: '3px 8px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0, 240, 255, 0.1)', display: 'flex', gap: '8px' }}>
            <input
              style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', padding: '4px 0', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
              placeholder="Query AI Core..."
            />
            <button
              onClick={() => sendMsg(input)}
              style={{
                background: 'rgba(0, 240, 255, 0.2)',
                border: '1px solid var(--cyan)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cyan)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <FiSend size={12} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
