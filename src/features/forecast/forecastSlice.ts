import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ForecastDay } from "../../shared/types/weather.types";
import apiClient from "../../shared/services/apiClient";

interface ForecastState {
  days: ForecastDay[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  days: [],
  loading: false,
  error: null,
};

export const fetchForecastByInsee = createAsyncThunk<
  ForecastDay[],
  string,
  { rejectValue: string }
>(
  "forecast/fetchByInsee",
  async (insee, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/forecast/daily", {
        params: { insee },
      });
      // Return only future days (skip today = day 0)
      return response.data.forecast.filter(
        (day: ForecastDay) => day.day > 0
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération des prévisions."
      );
    }
  }
);

export const fetchForecastByLocation = createAsyncThunk<
  ForecastDay[],
  { lat: number; lng: number },
  { rejectValue: string }
>(
  "forecast/fetchByLocation",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/forecast/daily", {
        params: { latlng: `${lat},${lng}` },
      });
      return response.data.forecast.filter(
        (day: ForecastDay) => day.day > 0
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération des prévisions."
      );
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    clearForecast(state) {
      state.days = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // By INSEE
    builder
      .addCase(fetchForecastByInsee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastByInsee.fulfilled, (state, action) => {
        state.loading = false;
        state.days = action.payload;
      })
      .addCase(fetchForecastByInsee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue.";
      });

    // By Location
    builder
      .addCase(fetchForecastByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.days = action.payload;
      })
      .addCase(fetchForecastByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue.";
      });
  },
});

export const { clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;