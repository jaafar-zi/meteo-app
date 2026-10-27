import apiClient from "../../shared/services/apiClient";
import { ForecastResponse } from "../../shared/types/weather.types";

export const fetchWeatherByInseeCode = async (
  insee: string
): Promise<ForecastResponse> => {
  const response = await apiClient.get("/forecast/daily", {
    params: { insee },
  });
  return response.data;
};

export const fetchWeatherByCoords = async (
  lat: number,
  lng: number
): Promise<ForecastResponse> => {
  const response = await apiClient.get("/forecast/daily", {
    params: { latlng: `${lat},${lng}` },
  });
  return response.data;
};