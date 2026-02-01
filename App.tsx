
import React, { useState, useEffect, useCallback } from 'react';
import { THEMES } from './constants';
import { AppMode, Theme, WeatherData, SmartBrief } from './types';
import Navigation from './components/Navigation';
import { DigitalMode, FlipMode, WorldMode, TimerMode } from './components/ClockModes';
import WeatherWidget from './components/WeatherWidget';
import Chatbot from './components/Chatbot';
import { geminiService } from './services/geminiService';
import { X, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('Digital');
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [brief, setBrief] = useState<SmartBrief | null>(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBrief, setShowBrief] = useState(false);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isChatOpen) return;
      if (e.key === 't' || e.key === 'T') setIsThemeOpen(prev => !prev);
      if (e.key === '1') setMode('Digital');
      if (e.key === '2') setMode('Flip');
      if (e.key === '3') setMode('World');
      if (e.key === '4') setMode('Timer');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isChatOpen]);

  // Fetch AI Data
  useEffect(() => {
    const fetchAI = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          const data = await geminiService.fetchWeatherAndBrief(latitude, longitude);
          setWeather(data.weather);
          setBrief(data.brief);
          setShowBrief(true);
        }, () => {
          // Fallback if location denied
          console.log("Location access denied");
        });
      }
    };
    fetchAI();
  }, []);

  const renderMode = () => {
    switch (mode) {
      case 'Digital': return <DigitalMode time={time} />;
      case 'Flip': return <FlipMode time={time} />;
      case 'World': return <WorldMode />;
      case 'Timer': return <TimerMode />;
    }
  };

  return (
    <div className={`relative min-h-screen transition-all duration-1000 bg-gradient-to-br ${theme.gradient} text-white selection:bg-white selection:text-black overflow-hidden`}>
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Daily Brief Toast */}
      {showBrief && brief && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 animate-in fade-in slide-in-from-top duration-500">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-400" />
                <h4 className="font-bold text-lg">{brief.greeting}</h4>
              </div>
              <button onClick={() => setShowBrief(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-4">{brief.fact}</p>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Advice</p>
              <p className="text-sm italic">{brief.advice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Weather Widget */}
      <WeatherWidget data={weather} />

      {/* Main Clock Content */}
      <main className="relative h-screen flex flex-col items-center justify-center px-4 pb-24 md:pb-0">
        <div className="w-full h-full transition-all duration-500 ease-in-out">
          {renderMode()}
        </div>
      </main>

      {/* Navigation */}
      <Navigation 
        currentMode={mode} 
        setMode={setMode} 
        onOpenTheme={() => setIsThemeOpen(true)} 
        onOpenChat={() => setIsChatOpen(true)} 
      />

      {/* Theme Picker Bottom Sheet / Modal */}
      {isThemeOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#111] w-full max-w-lg rounded-t-[2.5rem] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Theming</h3>
              <button onClick={() => setIsThemeOpen(false)} className="p-2 bg-white/5 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t); setIsThemeOpen(false); }}
                  className={`flex items-center gap-4 p-4 rounded-3xl transition-all border ${
                    theme.id === t.id ? 'bg-white text-black' : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} border border-white/20`} />
                  <span className="font-semibold">{t.name}</span>
                  {theme.id === t.id && <span className="ml-auto text-sm font-bold uppercase tracking-wider">Active</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
