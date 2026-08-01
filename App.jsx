import React, { useState } from 'react';
import { Sparkles, BookOpen, Compass, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  // States
  const [step, setStep] = useState(1); // 1: Onboarding, 2: Dashboard
  const [goal, setGoal] = useState('');
  const [scheduleType, setScheduleType] = useState('planned'); // 'planned' or 'unplanned'
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'plan', 'track'
  const [completedItems, setCompletedItems] = useState([]);

  // Mock Curated Content Database based on goals
  const curatedFeed = [
    {
      id: 1,
      type: 'Podcast Clip',
      title: 'How Sam Altman Evaluates Founders in 5 Minutes',
      duration: '4 min watch',
      source: 'Y Combinator Podcast',
      tag: 'Startup & Mindset',
      summary: 'Learn the exact mental models top investors use to filter high-potential founders.'
    },
    {
      id: 2,
      type: 'Deep Dive Article',
      title: 'The Architecture of Autonomous AI Agents',
      duration: '7 min read',
      source: 'Substack Tech Brief',
      tag: 'Technology',
      summary: 'A breakdown of how multi-agent loops (Understand -> Plan -> Execute) work in real applications.'
    },
    {
      id: 3,
      type: 'Case Study',
      title: 'From Zero to 100k Users Without Paid Ads',
      duration: '5 min read',
      source: 'Indie Hackers',
      tag: 'Growth Strategy',
      summary: 'How community-driven content curation changed organic growth forever.'
    }
  ];

  const handleStartJourney = (e) => {
    e.preventDefault();
    if (!goal) return;
    setStep(2);
  };

  const toggleComplete = (id) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(item => item !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/55 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-indigo-400 w-6 h-6 animate-pulse" />
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            AuraCurate AI
          </span>
        </div>
        <span className="text-xs px-3 py-1 bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 rounded-full">
          Anti-Attention Economy Engine
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === 1 ? (
          /* STEP 1: ONBOARDING / GOAL SETTING */
          <div className="max-w-xl mx-auto mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold mb-3 tracking-tight">
                Design Your <span className="text-indigo-400">Future Self</span>
              </h1>
              <p className="text-slate-400 text-sm">
                Replace mindless scrolling with purposeful knowledge, stories, and ideas curated precisely for your journey.
              </p>
            </div>

            <form onSubmit={handleStartJourney} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  What is your primary aspiration right now?
                </label>
                <input
                  type="text"
                  placeholder="e.g., Become an AI Startup Founder, Master System Design..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  How is your schedule looking this week?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setScheduleType('planned')}
                    className={`p-4 rounded-xl border text-left transition ${
                      scheduleType === 'planned'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">Steady & Planned</div>
                    <div className="text-xs text-slate-500 mt-1">15-20 mins daily learning routine</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheduleType('unplanned')}
                    className={`p-4 rounded-xl border text-left transition ${
                      scheduleType === 'unplanned'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">Busy / Unpredictable</div>
                    <div className="text-xs text-slate-500 mt-1">Dynamic micro-nukes & adaptive catch-up</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
              >
                <span>Initialize Growth Agent</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: DASHBOARD & CURATED FEED */
          <div className="space-y-6">
            {/* Dynamic Nudge Banner */}
            <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/40 rounded-2xl p-5 flex items-start space-x-4 shadow-lg">
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl mt-1">
                {scheduleType === 'planned' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-indigo-200 text-sm">Agent Dynamic Adaptation Active</h3>
                  <span className="text-xs text-slate-400">Goal: {goal}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {scheduleType === 'planned'
                    ? "Your routine is optimized. Here is your high-value daily knowledge pack to prevent passive scrolling."
                    : "We noticed an irregular schedule gap. Your plan has been dynamically condensed into high-impact 5-minute micro insights."}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-2 ${
                  activeTab === 'feed' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Curated Growth Feed</span>
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-2 ${
                  activeTab === 'track' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Progress & Mastery ({completedItems.length}/3)</span>
              </button>
            </div>

            {/* Feed Content */}
            {activeTab === 'feed' ? (
              <div className="grid gap-4">
                {curatedFeed.map((item) => {
                  const isDone = completedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`bg-slate-900/60 border rounded-2xl p-6 transition backdrop-blur-sm flex flex-col justify-between ${
                        isDone ? 'border-emerald-600/40 bg-emerald-950/10' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-950 border border-indigo-800/40 text-indigo-300 rounded-lg">
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{item.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mt-1">{item.title}</h3>
                        <p className="text-sm text-slate-400 mt-2">{item.summary}</p>
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/60">
                        <span className="text-xs text-slate-500 font-medium">Source: {item.source}</span>
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`text-xs px-4 py-2 rounded-xl font-medium transition flex items-center space-x-1.5 ${
                            isDone
                              ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isDone ? 'Completed & Internalized' : 'Mark as Completed'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* PROGRESS TRACKER VIEW */
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Your Intentional Growth Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Knowledge Assimilation Rate</span>
                      <span className="font-mono text-indigo-400">{Math.round((completedItems.length / 3) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(completedItems.length / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-2">
                    Every piece of content processed reduces attention drift and moves you closer to becoming a {goal}.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
