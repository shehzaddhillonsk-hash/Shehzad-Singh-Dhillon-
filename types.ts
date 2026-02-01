
export type AppMode = 'Digital' | 'Flip' | 'World' | 'Timer';

export interface Theme {
  id: string;
  name: string;
  gradient: string;
  accent: string;
  isDark: boolean;
}

export interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: string;
  icon: string;
}

export interface SmartBrief {
  greeting: string;
  fact: string;
  advice: string;
}

export interface WorldClockCity {
  id: string;
  name: string;
  timezone: string;
  country: string;
}
