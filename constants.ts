
import { Theme, WorldClockCity } from './types';

export const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    gradient: 'from-slate-900 via-blue-900 to-black',
    accent: '#3b82f6',
    isDark: true
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: 'from-teal-900 via-purple-900 to-indigo-900',
    accent: '#2dd4bf',
    isDark: true
  },
  {
    id: 'crimson',
    name: 'Crimson',
    gradient: 'from-red-950 via-rose-900 to-black',
    accent: '#f43f5e',
    isDark: true
  },
  {
    id: 'golden',
    name: 'Golden',
    gradient: 'from-amber-950 via-yellow-900 to-stone-900',
    accent: '#f59e0b',
    isDark: true
  },
  {
    id: 'oled',
    name: 'OLED',
    gradient: 'from-black via-zinc-950 to-black',
    accent: '#ffffff',
    isDark: true
  }
];

export const DEFAULT_CITIES: WorldClockCity[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { id: '2', name: 'London', timezone: 'Europe/London', country: 'UK' },
  { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
  { id: '4', name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
  { id: '5', name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
  { id: '6', name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' }
];
