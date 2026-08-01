import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('2');
  const [currentLevel, setCurrentLevel] = useState('Beginner');
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleGenerateAIPlan = (e) => {
    e.preventDefault();
    if (!interest) return;
    setStep(2);
  };

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#091e3a', border: '1px solid #0284c7', padding: '10px', borderRadius: '12px', color: '#38bdf8', fontWeight: 'bold' }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', background: 'linear-gradient(to right, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HBTM AI AUTONOMOUS LEARNING ENGINE
            </h1>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>PREDICTIVE SCHEDULING & INTERACTIVE EMBEDDED TUTORING</div>
          </div>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', color: '#34d399', fontFamily: 'monospace' }}>
          ● AI MODEL: PREDICTIVE ACTIVE
        </div>
      </div>

      {step === 1 ? (
        /* STEP 1: DEEP AI PREDICTION INTAKE */
        <div style={{ maxWidth: '600px', margin: '30px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.7)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#f1f5f9' }}>Let AI Predict Your Optimal Path</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>Instead of static inputs, our engine analyzes your availability and automatically structures a top-tier roadmap with embedded videos and interactive testing.</p>

          <form onSubmit={handleGenerateAIPlan} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>1. What master topic do you want to conquer?</label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g., Advanced React & System Design / Cloud Architecture"
                style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>2. Daily Availability</label>
                select
                <select 
                  value={hoursPerDay} 
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="1">1 Hour / Day (Busy Schedule)</option>
                  <option value="3">3 Hours / Day (Optimal Pace)</option>
                  <option value="5">5+ Hours / Day (Immersive Sprint)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'monospace' }}>3. Current Proficiency</label>
                <select 
                  value={currentLevel} 
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  style={{ width: '100%', background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#38bdf8', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="Beginner">Absolute Beginner</option>
                  <option value="Intermediate">Intermediate Practitioner</option>
                  <option value="Advanced">Advanced / Gap Filler</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', color: '#fff', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' }}
            >
              ✨ AI, Predict & Generate Interactive Roadmap
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: IMMERSIVE ROADMAP, VIDEOS & LIVE QUIZ PLATFORM */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          
          {/* LEFT: AI Predicted Roadmap Modules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '18px' }}>
              <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', textTransform: 'uppercase' }}>AI Predicted Schedule ({hoursPerDay} hrs/day • {currentLevel})</div>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', margin: '5px 0 0 0' }}>Roadmap: {interest}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 1, title: 'Module 1: Core Architecture & Setup', duration: 'Day 1 - Day 3', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', quiz: { q: 'What is the primary entry point of this framework?', options: ['index.html / main.jsx', 'styles.css', 'README.md'], correct: 0 } },
                { id: 2, title: 'Module 2: Advanced State & Component Lifecycle', duration: 'Day 4 - Day 8', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', quiz: { q: 'Which hook handles side effects in React components?', options: ['useState', 'useEffect', 'useMemo'], correct: 1 } },
                { id: 3, title: 'Module 3: Autonomous Closed-Loop Integration', duration: 'Day 9 - Day 14', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', quiz: { q: 'How does the HBTM agent handle unexpected user dropouts?', options: ['Guilt trip the user', 'Contextual nudge & auto-adjust plan', 'Delete progress'], correct: 1 } }
              ].map((mod) => (
                <div 
                  key={mod.id} 
                  onClick={() => { setSelectedModule(mod); setQuizSubmitted(false); setQuizAnswer(null); }}
                  style={{ background: selectedModule?.id === mod.id ? '#1e1b4b' : '#0f172a', border: selectedModule?.id === mod.id ? '1px solid #6366f1' : '1px solid #1e293b', borderRadius: '14px', padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f1f5f9' }}>{mod.title}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px', fontFamily: 'monospace' }}>⏱️ Predicted Time: {mod.duration}</div>
                  </div>
                  <span style={{ fontSize: '12px', background: '#020617', padding: '6px 12px', borderRadius: '8px', color: '#38bdf8', border: '1px solid #334155' }}>Select & Learn ➔</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', marginTop: '10px' }}
            >
              ← Re-configure AI Parameters
            </button>
          </div>

          {/* RIGHT: Embedded Top Video & Interactive Embedded Quiz Engine */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {selectedModule ? (
              <>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
                  📺 Top Notch Curated Video: {selectedModule.title}
                </div>
                
                {/* Embedded Video Simulator Box */}
                <div style={{ width: '100%', height: '180px', background: '#020617', border: '1px solid #334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>▶️</div>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>Streaming Curated Expert Video</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '4px' }}>(AI Matched for {hoursPerDay}h daily pace)</div>
                  </div>
                </div>

                {/* Interactive Embedded Quiz Section */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '15px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fcd34d', marginBottom: '8px' }}>🧠 Live Embedded Quiz Check</div>
                  <div style={{ fontSize: '12px', color: '#f1f5f9', marginBottom: '12px' }}>{selectedModule.quiz.q}</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedModule.quiz.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuizAnswer(idx)}
                        style={{ background: quizAnswer === idx ? '#1e293b' : '#020617', border: quizAnswer === idx ? '1px solid #38bdf8' : '1px solid #334155', color: '#cbd5e1', padding: '10px', borderRadius: '8px', textAlign: 'left', fontSize: '11px', cursor: 'pointer' }}
                      >
                        {idx + 1}. {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setQuizSubmitted(true)}
                    style={{ width: '100%', background: '#0891b2', border: 'none', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' }}
                  >
                    Submit Answer & Update AI Confidence
                  </button>

                  {quizSubmitted && (
                    <div style={{ marginTop: '10px', padding: '8px', borderRadius: '6px', fontSize: '11px', background: quizAnswer === selectedModule.quiz.correct ? '#064e3b' : '#7f1d1d', color: '#fff', textAlign: 'center' }}>
                      {quizAnswer === selectedModule.quiz.correct ? '✅ Correct! AI Confidence Score Increased.' : '❌ Incorrect! Agent is scheduling a remedial recap.'}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#64748b', padding: '40px 0' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>👈</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#94a3b8' }}>Select a module from your AI roadmap</div>
                <div style={{ fontSize: '11px', marginTop: '4px' }}>To watch curated top videos and take interactive quizzes right here on the platform.</div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
