// src/features/weather/WeatherCard.tsx

import React from "react";
import { useAppSelector } from "../../app/hooks";
import WeatherDetails from "./WeatherDetails";
import {
  getWeatherIcon,
  getWeatherDescription,
  formatDateTime,
} from "../../shared/utils/helpers";
import "./weather.css";

const WeatherCard: React.FC = () => {
  const { city, today, lastUpdate } = useAppSelector((state) => state.weather);

  if (!city || !today) return null;

  return (
    <div className="weather-card today-card">
      <div className="today-header">
        <div>
          <h2 className="city-title">{city.name}</h2>
          <p className="city-info">
            Code postal: {city.cp} | Alt: {city.altitude}m
          </p>
          {lastUpdate && (
            <p className="update-info">
              Mise à jour: {formatDateTime(lastUpdate)}
            </p>
          )}
        </div>
        <div className="today-icon">
          <span className="weather-emoji">
            {getWeatherIcon(today.weather)}
          </span>
        </div>
      </div>

      <div className="today-main">
        <div className="temperature-display">
          <span className="temp-min">⬇️ {today.tmin}°C</span>
          <span className="temp-separator">/</span>
          <span className="temp-max">⬆️ {today.tmax}°C</span>
        </div>
        <p className="weather-description">
          {getWeatherDescription(today.weather)}
        </p>
      </div>

      <WeatherDetails today={today} />
    </div>
  );
};

export default WeatherCard;