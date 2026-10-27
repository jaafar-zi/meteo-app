import React from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import Layout from "./layouts/Layout";
import { SearchBar } from "./features/search";
import { GeolocationButton } from "./features/geolocation";
import { WeatherCard, clearWeatherError } from "./features/weather";
import { ForecastList } from "./features/forecast";
import { Loader } from "./shared/components/Loader";
import { ErrorMessage } from "./shared/components/ErrorMessage";
import { Welcome } from "./shared/components/Welcome";
import { clearError as clearSearchError } from "./features/search/searchSlice";
import { clearGeolocationError } from "./features/geolocation";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const weatherState = useAppSelector((state) => state.weather);
  const forecastState = useAppSelector((state) => state.forecast);
  const searchState = useAppSelector((state) => state.search);
  const geoState = useAppSelector((state) => state.geolocation);

  const isLoading =
    weatherState.loading || forecastState.loading || geoState.loading;

  const hasData = weatherState.city && weatherState.today;

  // Collect all errors
  const errors = [
    searchState.error,
    weatherState.error,
    forecastState.error,
    geoState.error,
  ].filter(Boolean) as string[];

  const handleDismissErrors = () => {
    dispatch(clearSearchError());
    dispatch(clearWeatherError());
    dispatch(clearGeolocationError());
  };

  return (
    <Layout>
      {/* Search + Geolocation Bar */}
      <div className="toolbar">
        <SearchBar />
        <GeolocationButton />
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <ErrorMessage
          message={errors.join(" ")}
          onDismiss={handleDismissErrors}
        />
      )}

      {/* Loading */}
      {isLoading && <Loader />}

      {/* Weather Data */}
      {!isLoading && hasData && (
        <>
          <WeatherCard />
          <ForecastList />
        </>
      )}

      {/* Welcome */}
      {!isLoading && !hasData && errors.length === 0 && <Welcome />}
    </Layout>
  );
};

export default App;