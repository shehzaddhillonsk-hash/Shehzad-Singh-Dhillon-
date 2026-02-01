
import React from 'react';
import { Clock, Layers, Globe, Timer as TimerIcon, Palette, MessageSquare } from 'lucide-react';
import { AppMode } from '../types';

interface NavigationProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  onOpenTheme: () => void;
  onOpenChat: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, setMode, onOpenTheme, onOpenChat }) => {
  const navItems = [
    { id: 'Digital', icon: Clock, label: 'Digital' },
    { id: 'Flip', icon: Layers, label: 'Flip' },
    { id: 'World', icon: Globe, label: 'World' },
    { id: 'Timer', icon: TimerIcon, label: 'Timer' },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-2xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as AppMode)}
            className={`p-2 transition-all duration-300 rounded-2xl ${
              currentMode === item.id ? 'bg-white/20 text-white' : 'text-white/40'
            }`}
          >
            <item.icon size={24} />
          </button>
        ))}
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button onClick={onOpenTheme} className="p-2 text-white/40"><Palette size={24} /></button>
        <button onClick={onOpenChat} className="p-2 text-white/40"><MessageSquare size={24} /></button>
      </nav>

      {/* Desktop Floating Dock */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 items-center gap-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as AppMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              currentMode === item.id 
                ? 'bg-white text-black font-semibold' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
        <div className="w-px h-8 bg-white/10 mx-2" />
        <button 
          onClick={onOpenTheme}
          className="p-3 text-white/60 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
        >
          <Palette size={20} />
        </button>
        <button 
          onClick={onOpenChat}
          className="p-3 text-white/60 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
        >
          <MessageSquare size={20} />
        </button>
      </nav>
    </>
  );
};

export default Navigation;
