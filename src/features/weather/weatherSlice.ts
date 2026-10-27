import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { City, ForecastDay } from "../../shared/types/weather.types";
import { fetchWeatherByInseeCode, fetchWeatherByCoords } from "./weatherApi";

interface WeatherState {
  city: City | null;
  today: ForecastDay | null;
  lastUpdate: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: null,
  today: null,
  lastUpdate: null,
  loading: false,
  error: null,
};

export const fetchWeatherByInsee = createAsyncThunk<
  { city: City; forecast: ForecastDay; update: string },
  string,
  { rejectValue: string }
>(
  "weather/fetchByInsee",
  async (insee, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByInseeCode(insee);
      const todayForecast = Array.isArray(data.forecast)
        ? data.forecast[0]
        : data.forecast;

      return {
        city: data.city,
        forecast: todayForecast,
        update: data.update,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération de la météo."
      );
    }
  }
);

export const fetchWeatherByLocation = createAsyncThunk<
  { city: City; forecast: ForecastDay; update: string },
  { lat: number; lng: number },
  { rejectValue: string }
>(
  "weather/fetchByLocation",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCoords(lat, lng);
      const todayForecast = Array.isArray(data.forecast)
        ? data.forecast[0]
        : data.forecast;

      return {
        city: data.city,
        forecast: todayForecast,
        update: data.update,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération de la météo."
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather(state) {
      state.city = null;
      state.today = null;
      state.lastUpdate = null;
      state.error = null;
    },
    clearWeatherError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByInsee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByInsee.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.today = action.payload.forecast;
        state.lastUpdate = action.payload.update;
      })
      .addCase(fetchWeatherByInsee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue.";
      })
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.today = action.payload.forecast;
        state.lastUpdate = action.payload.update;
      })
      .addCase(fetchWeatherByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue.";
      });
  },
});

export const { clearWeather, clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;