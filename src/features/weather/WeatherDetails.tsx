import React from "react";
import { ForecastDay } from "../../shared/types/weather.types";
import { getWindDirection } from "../../shared/utils/helpers";

interface WeatherDetailsProps {
  today: ForecastDay;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ today }) => {
  const details = [
    { icon: "🌧️", label: "Pluie", value: `${today.rr10} mm` },
    { icon: "☔", label: "Prob. pluie", value: `${today.probarain}%` },
    {
      icon: "💨",
      label: "Vent",
      value: `${today.wind10m} km/h ${getWindDirection(today.dirwind10m)}`,
    },
    { icon: "🌬️", label: "Rafales", value: `${today.gust10m} km/h` },
    { icon: "☀️", label: "Ensoleillement", value: `${today.sun_hours}h` },
    { icon: "❄️", label: "Prob. gel", value: `${today.probafrost}%` },
  ];

  return (
    <div className="weather-details-grid">
      {details.map((detail, index) => (
        <div key={index} className="detail-item">
          <span className="detail-icon">{detail.icon}</span>
          <span className="detail-label">{detail.label}</span>
          <span className="detail-value">{detail.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;