import React from "react";
import { useAppSelector } from "../../app/hooks";
import ForecastCard from "./ForecastCard";
import "./forecast.css";

const ForecastList: React.FC = () => {
  const { days, loading } = useAppSelector((state) => state.forecast);

  if (loading || days.length === 0) return null;

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">📅 Prévisions à venir</h3>
      <div className="forecast-grid">
        {days.map((day) => (
          <ForecastCard key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;