import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('landing');
  const [course, setCourse] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [totalDays, setTotalDays] = useState('30');
  const [plannedExams, setPlannedExams] = useState('2');
  const [unplannedMissed, setUnplannedMissed] = useState('1');

  const titleLine1 = "BAND OF AGENTS".split("");
  const titleLine2 = "HACKATHON".split("");

  return (
    <div style={{ 
      backgroundColor: '#fbf9f1', 
      color: '#111827', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      boxSizing: 'border-box', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      border: '8px solid #111827', 
      margin: '16px', 
      borderRadius: '24px', 
      overflow: 'hidden',
      boxShadow: '12px 12px 0px #111827'
    }}>
      
      <style>{`
        @keyframes dropLetter {
          0% { opacity: 0; transform: translateY(-40px) scale(0.8); }
          60% { opacity: 1; transform: translateY(4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .retro-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .retro-card:hover {
          transform: translateY(-4px);
          box-shadow: 6px 6px 0px #111827 !important;
        }
      `}</style>

      {view === 'landing' ? (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          
          {/* HEADER / PARTNERS BAR */}
          <div style={{ padding: '30px 50px', borderBottom: '3px solid #111827', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 'bold', fontFamily: 'monospace', color: '#374151', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#111827', color: '#fff', padding: '8px 14px', borderRadius: '8px' }}>
                <span>⬡</span> <strong>BAND</strong>
              </div>
              <span>×</span>
              <span style={{ border: '2px solid #111827', padding: '6px 10px', borderRadius: '6px', background: '#fef3c7' }}>LV</span>
              <span>×</span>
              <span style={{ border: '2px solid #111827', padding: '6px 10px', borderRadius: '6px' }}>LABLAB</span>
              <span>×</span>
              <span style={{ background: '#f3f4f6', padding: '6px 10px', borderRadius: '6px', border: '2px solid #111827' }}>Featherless</span>
              <span>×</span>
              <span style={{ background: '#f3f4f6', padding: '6px 10px', borderRadius: '6px', border: '2px solid #111827' }}>AI/ML API</span>
            </div>

            <button 
              onClick={() => setView('setup')}
              style={{ background: '#059669', color: '#fff', border: '3px solid #111827', padding: '10px 24px', borderRadius: '10px', fontWeight: '900', fontSize: '13px', cursor: 'pointer', boxShadow: '4px 4px 0px #111827' }}
              className="retro-card"
            >
              QUICK LAUNCH ⚡
            </button>
          </div>

          {/* HERO SECTION WITH BREATHING ROOM */}
          <div style={{ padding: '60px 50px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '60px', alignItems: 'center', flex: 1 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'inline-block', background: '#fef08a', border: '2px solid #111827', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '900', width: 'fit-content', boxShadow: '3px 3px 0px #111827' }}>
                🚀 AUTONOMOUS AGENT HACKATHON
              </div>

              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', lineHeight: '1.05', margin: 0, letterSpacing: '-2px', textTransform: 'uppercase' }}>
                
                {/* Line 1 */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {titleLine1.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${index * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>

                {/* Line 2 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', color: '#059669', marginTop: '4px' }}>
                  {titleLine2.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block', animation: 'dropLetter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both', animationDelay: `${(titleLine1.length + index) * 0.03}s`, whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>

              </h1>

              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', maxWidth: '500px', fontWeight: '500', margin: 0 }}>
                Build enterprise multi-agent systems with Band and Codeband. Unleash autonomous workflow generators, real-time telemetry, and closed-loop learning.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                <button 
                  onClick={() => setView('setup')}
                  style={{ background: '#111827', color: '#fff', border: '3px solid #111827', padding: '18px 36px', borderRadius: '14px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', boxShadow: '6px 6px 0px #059669' }}
                  className="retro-card"
                >
                  ENTER APP & BUILD ROADMAP 🚀
                </button>
              </div>
            </div>

            {/* ARTWORK CARD */}
            <div style={{ background: '#064e3b', border: '4px solid #111827', borderRadius: '24px', padding: '40px', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '12px 12px 0px #111827', animation: 'floatCard 4s ease-in-out infinite' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#34d399', background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '8px', border: '1px solid #059669' }}>AGENT_KERNEL_v2.6</span>
                <span style={{ fontSize: '24px' }}>🤖⚡</span>
              </div>
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', color: '#fff', fontFamily: 'monospace', letterSpacing: '-1px' }}>FEED UR POTENTIAL</div>
                <div style={{ fontSize: '13px', color: '#a7f3d0', marginTop: '8px' }}>Autonomous YouTube Matching & Day-Wise Tracking</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6ee7b7', fontFamily: 'monospace', borderTop: '1px dashed rgba(52, 211, 153, 0.3)', paddingTop: '16px' }}>
                <span>STATUS: ONLINE</span>
                <span>CLOSED-LOOP ACTIVE</span>
              </div>
            </div>

          </div>

          {/* SPACIOUS METRICS FOOTER */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '3px solid #111827', background: '#fff' }}>
            
            <div style={{ padding: '30px 40px', borderRight: '3px solid #111827', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📅</span> DATES
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#111827' }}>JUNE 12–19, 2026</div>
            </div>

            <div style={{ padding: '30px 40px', borderRight: '3px solid #111827', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> LOCATION
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#111827' }}>ONLINE (GLOBAL)</div>
            </div>

            <div style={{ padding: '30px 40px', background: '#111827', color: '#fff', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🏆</span> PRIZE POOL
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#34d399' }}>$ 10,000+</div>
            </div>

          </div>

        </div>
      ) : (
        /* SETUP CONFIG VIEW */
        <div style={{ maxWidth: '600px', margin: '60px auto', background: '#fff', border: '4px solid #111827', borderRadius: '24px', padding: '50px', boxShadow: '12px 12px 0px #111827', width: '100%', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>CONFIGURE ROADMAP</h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>Set your parameters to generate the agent engine.</p>
            </div>
            <button onClick={() => setView('landing')} style={{ background: '#f3f4f6', border: '2px solid #111827', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', boxShadow: '3px 3px 0px #111827' }} className="retro-card">← BACK</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>COURSE / TOPIC</label>
              <input type="text" value={course} onChange={e => setCourse(e.target.value)} placeholder="e.g. Full Stack Web Dev / AI Agent Systems" style={{ width: '100%', padding: '16px', border: '3px solid #111827', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', background: '#fbf9f1', fontWeight: '600' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>DAILY HOURS</label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} style={{ width: '100%', padding: '16px', border: '3px solid #111827', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', background: '#fbf9f1', fontWeight: '600' }}>
                  <option value="1">1 Hour / Day</option>
                  <option value="2">2 Hours / Day</option>
                  <option value="3">3 Hours / Day</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>TOTAL DAYS</label>
                <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} style={{ width: '100%', padding: '16px', border: '3px solid #111827', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', background: '#fbf9f1', fontWeight: '600' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>PLANNED EXAMS</label>
                <input type="number" value={plannedExams} onChange={e => setPlannedExams(e.target.value)} style={{ width: '100%', padding: '16px', border: '3px solid #111827', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', background: '#fbf9f1', fontWeight: '600' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace', display: 'block', marginBottom: '8px' }}>UNPLANNED GAP</label>
                <input type="number" value={unplannedMissed} onChange={e => setUnplannedMissed(e.target.value)} style={{ width: '100%', padding: '16px', border: '3px solid #111827', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box', background: '#fbf9f1', fontWeight: '600' }} />
              </div>
            </div>

            <button onClick={() => alert(`Roadmap initialized for ${course || 'General Agent Mastery'} with strict ${totalDays}-day timeline!`)} style={{ background: '#059669', color: '#fff', border: '3px solid #111827', padding: '18px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '6px 6px 0px #111827' }} className="retro-card">
              GENERATE YOUTUBE ROADMAP & AGENT DASHBOARD 🚀
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
