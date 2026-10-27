// src/features/search/CityDropdown.tsx

import React from "react";
import { City } from "../../shared/types/weather.types";

interface CityDropdownProps {
  cities: City[];
  onSelect: (city: City) => void;
}

const CityDropdown: React.FC<CityDropdownProps> = ({ cities, onSelect }) => {
  if (cities.length === 0) return null;

  return (
    <ul className="city-dropdown">
      {cities.map((city) => (
        <li
          key={`${city.insee}-${city.cp}`}
          className="city-item"
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(city);
          }}
        >
          <span className="city-name">{city.name}</span>
          <span className="city-details">
            {city.cp} — {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CityDropdown;