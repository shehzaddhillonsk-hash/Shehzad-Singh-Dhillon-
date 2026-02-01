
import React, { useState } from 'react';
import { WeatherData } from '../types';
import { ChevronRight, Wind, Droplets, MapPin, Navigation as NavIcon, Thermometer } from 'lucide-react';

interface WeatherWidgetProps {
  data: WeatherData | null;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return (
    <div className="fixed top-6 right-6 z-40 glass rounded-3xl p-4 animate-pulse">
      <div className="w-12 h-6 bg-white/10 rounded-full" />
    </div>
  );

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`fixed top-6 right-6 z-40 glass rounded-[2rem] p-4 transition-all duration-500 cursor-pointer hover:bg-white/10 overflow-hidden ${
        isExpanded ? 'w-72 shadow-2xl' : 'w-auto'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-3xl">
          {data.icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold leading-none tabular-nums">{data.temp}</span>
            <span className="text-sm font-bold opacity-40">°C</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">
            <MapPin size={10} />
            <span className="truncate max-w-[80px]">{data.location}</span>
          </div>
        </div>
        {!isExpanded && <ChevronRight size={16} className="text-white/20 ml-2" />}
      </div>

      <div className={`mt-6 space-y-4 transition-all duration-500 origin-top ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 invisible'}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center gap-2 text-white/30 mb-1">
              <Wind size={12} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Wind</span>
            </div>
            <span className="text-sm font-bold">{data.wind}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center gap-2 text-white/30 mb-1">
              <Droplets size={12} />
              <span className="text-[10px] uppercase font-bold tracking-wider">Humid</span>
            </div>
            <span className="text-sm font-bold">{data.humidity}%</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/30">Condition</span>
                <span className="text-sm font-medium">{data.condition}</span>
            </div>
            <NavIcon size={18} className="text-blue-400 opacity-50 rotate-45" />
        </div>

        <div className="text-[10px] text-center text-white/20 font-medium uppercase tracking-[0.2em] py-2">
          Real-time AI Update
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
