import apiClient from "../../shared/services/apiClient";
import { City } from "../../shared/types/weather.types";

export const fetchCities = async (query: string): Promise<City[]> => {
  const response = await apiClient.get("/location/cities", {
    params: { search: query },
  });
  return response.data.cities || [];
};