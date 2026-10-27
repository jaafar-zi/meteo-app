import React, { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setQuery,
  searchCities,
  selectCity,
  closeDropdown,
} from "./searchSlice";
import { fetchWeatherByInsee } from "../weather/weatherSlice";
import { fetchForecastByInsee } from "../forecast/forecastSlice";
import { City } from "../../shared/types/weather.types";
import CityDropdown from "./CityDropdown";
import "./search.css";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, cities, loading, isDropdownOpen } = useAppSelector(
    (state) => state.search
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        dispatch(searchCities(query));
      }, 350);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(closeDropdown());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleCitySelect = useCallback(
    (city: City) => {
      dispatch(selectCity(city));
      dispatch(fetchWeatherByInsee(city.insee));
      dispatch(fetchForecastByInsee(city.insee));
    },
    [dispatch]
  );

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
          aria-label="Rechercher une ville"
        />
        {loading && <span className="search-spinner">⏳</span>}
      </div>

      {isDropdownOpen && (
        <CityDropdown cities={cities} onSelect={handleCitySelect} />
      )}
    </div>
  );
};

export default SearchBar;