import React from "react";
import { ForecastDay } from "../../shared/types/weather.types";
import {
  getWeatherIcon,
  getWeatherDescription,
  formatDate,
  getDayLabel,
} from "../../shared/utils/helpers";

interface ForecastCardProps {
  day: ForecastDay;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day }) => {
  const label = getDayLabel(day.day);

  return (
    <div className="forecast-card">
      <div className="forecast-date">
        <span className="date-label">
          {label || formatDate(day.datetime)}
        </span>
        {label && <span className="date-sub">{formatDate(day.datetime)}</span>}
      </div>

      <div className="forecast-icon">{getWeatherIcon(day.weather)}</div>

      <div className="forecast-desc">
        {getWeatherDescription(day.weather)}
      </div>

      <div className="forecast-temps">
        <span className="forecast-tmin">{day.tmin}°</span>
        <div className="temp-bar">
          <div
            className="temp-bar-fill"
            style={{
              width: `${Math.min(
                100,
                Math.max(10, ((day.tmax - day.tmin) / 30) * 100)
              )}%`,
            }}
          />
        </div>
        <span className="forecast-tmax">{day.tmax}°</span>
      </div>

      <div className="forecast-extras">
        <span title="Probabilité de pluie">☔ {day.probarain}%</span>
        <span title="Cumul de pluie">💧 {day.rr10}mm</span>
        <span title="Vent moyen">💨 {day.wind10m}km/h</span>
      </div>
    </div>
  );
};

export default ForecastCard;