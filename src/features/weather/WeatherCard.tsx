import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import WeatherDetails from "./WeatherDetails";
import {
  getWeatherIcon,
  getWeatherDescription,
  formatDateTime,
} from "../../shared/utils/helpers";
import { toggleFavoriteCity, openAuthModal } from "../auth";
import "./weather.css";

const WeatherCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { city, today, lastUpdate } = useAppSelector((state) => state.weather);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!city || !today) return null;

  const isFavorite = user?.favorites.some((f) => f.insee === city.insee);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal("login"));
    } else {
      dispatch(toggleFavoriteCity(city));
    }
  };

  return (
    <div className="weather-card today-card">
      <div className="today-header">
        <div>
          <div className="title-favorite-row">
            <h2 className="city-title">{city.name}</h2>
            <button
              className={`fav-button ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
              title={
                isFavorite
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
            >
              {isFavorite ? "⭐" : "☆"}
            </button>
          </div>
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