export interface City {
  insee: string;
  cp: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface ForecastDay {
  insee: string;
  cp: number;
  latitude: number;
  longitude: number;
  day: number;
  datetime: string;
  wind10m: number;
  gust10m: number;
  dirwind10m: number;
  rr10: number;
  rr1: number;
  probarain: number;
  weather: number;
  tmin: number;
  tmax: number;
  sun_hours: number;
  etp: number;
  probafrost: number;
  probafog: number;
  probawind70: number;
  probawind100: number;
  gustx: number;
}

export interface ForecastResponse {
  city: City;
  update: string;
  forecast: ForecastDay[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}