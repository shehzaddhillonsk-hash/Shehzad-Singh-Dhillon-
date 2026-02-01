
import React, { useState, useEffect } from 'react';
import FlipUnit from './FlipUnit';
import { WorldClockCity, AppMode } from '../types';
import { DEFAULT_CITIES } from '../constants';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const DigitalMode: React.FC<{ time: Date }> = ({ time }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-[22vw] md:text-[14vw] font-extrabold tracking-tighter tabular-nums leading-none">
        {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-[6vw] md:text-[4vw] font-light text-white/40 tracking-[1em] uppercase -mt-4">
        {time.toLocaleTimeString('en-US', { second: '2-digit' })}
      </div>
    </div>
  );
};

export const FlipMode: React.FC<{ time: Date }> = ({ time }) => {
  return (
    <div className="flex items-center justify-center h-full gap-4 md:gap-8">
      <FlipUnit value={time.getHours()} />
      <span className="text-4xl md:text-6xl text-white/20">:</span>
      <FlipUnit value={time.getMinutes()} />
      <span className="text-4xl md:text-6xl text-white/20">:</span>
      <FlipUnit value={time.getSeconds()} />
    </div>
  );
};

export const WorldMode: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCityTime = (timezone: string) => {
    return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-6 max-w-7xl mx-auto w-full overflow-y-auto max-h-[70vh]">
      {DEFAULT_CITIES.map((city) => {
        const cityTime = getCityTime(city.timezone);
        return (
          <div key={city.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{city.name}</h3>
                <p className="text-white/40 text-sm uppercase tracking-wider">{city.country}</p>
              </div>
              <div className="text-sm font-medium text-white/60">
                {cityTime.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
            <div className="text-4xl font-bold tracking-tight">
              {cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TimerMode: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputMinutes, setInputMinutes] = useState('10');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0 && !isActive) {
      setTimeLeft(parseInt(inputMinutes || '0') * 60);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {timeLeft === 0 && !isActive ? (
        <div className="flex flex-col items-center gap-8">
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            className="bg-transparent text-[15vw] md:text-[8vw] font-bold text-center w-64 outline-none border-b-2 border-white/20 focus:border-white transition-all"
            placeholder="00"
          />
          <p className="text-white/40 text-xl uppercase tracking-[0.2em]">Minutes</p>
        </div>
      ) : (
        <div className="text-[20vw] md:text-[12vw] font-extrabold tracking-tighter tabular-nums mb-12">
          {formatTime(timeLeft)}
        </div>
      )}

      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={resetTimer}
          className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <RotateCcw />
        </button>
        <button
          onClick={toggleTimer}
          className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
        >
          {isActive ? <Pause fill="black" size={32} /> : <Play fill="black" size={32} />}
        </button>
      </div>
    </div>
  );
};
