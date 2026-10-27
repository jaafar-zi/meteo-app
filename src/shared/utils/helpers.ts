import { WEATHER_DESCRIPTIONS, WEATHER_ICONS } from "../constants/weatherCodes";

export const getWeatherIcon = (code: number): string => {
  return WEATHER_ICONS[code] || "🌡️";
};

export const getWeatherDescription = (code: number): string => {
  return WEATHER_DESCRIPTIONS[code] || "Inconnu";
};

export const getWindDirection = (degrees: number): string => {
  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSO", "SO", "OSO",
    "O", "ONO", "NO", "NNO",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("fr-FR");
};

export const getDayLabel = (day: number): string => {
  if (day === 0) return "Aujourd'hui";
  if (day === 1) return "Demain";
  return "";
};