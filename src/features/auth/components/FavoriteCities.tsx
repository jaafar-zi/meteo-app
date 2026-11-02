import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchWeatherByInsee } from "../../weather/weatherSlice";
import { fetchForecastByInsee } from "../../forecast/forecastSlice";
import { selectCity } from "../../search/searchSlice";
import { City } from "../../../shared/types/weather.types";

const FavoriteCities: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user || user.favorites.length === 0) return null;

  const handleSelectFavorite = (city: City) => {
    dispatch(selectCity(city));
    dispatch(fetchWeatherByInsee(city.insee));
    dispatch(fetchForecastByInsee(city.insee));
  };

  return (
    <div className="favorites-container">
      <span className="favorites-title">⭐ Mes villes :</span>
      <div className="favorites-chips">
        {user.favorites.map((city) => (
          <button
            key={city.insee}
            className="favorite-chip"
            onClick={() => handleSelectFavorite(city)}
          >
            {city.name} ({city.cp})
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;