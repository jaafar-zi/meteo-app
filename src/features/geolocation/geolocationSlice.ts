import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinates } from "../../shared/types/weather.types";
import { fetchWeatherByLocation } from "../weather/weatherSlice";
import { fetchForecastByLocation } from "../forecast/forecastSlice";
import { setCityFromGeolocation } from "../search/searchSlice";
import type { AppDispatch } from "../../app/store";

interface GeolocationState {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeolocationState = {
  coordinates: null,
  loading: false,
  error: null,
};

export const requestGeolocation = createAsyncThunk<
  Coordinates,
  void,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "geolocation/request",
  async (_, { rejectWithValue, dispatch }) => {
    if (!navigator.geolocation) {
      return rejectWithValue(
        "La géolocalisation n'est pas supportée par votre navigateur."
      );
    }

    return new Promise<Coordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            // Dispatch weather and forecast fetches
            const weatherResult = await dispatch(
              fetchWeatherByLocation({
                lat: coords.latitude,
                lng: coords.longitude,
              })
            ).unwrap();

            // Set city in search state
            dispatch(setCityFromGeolocation(weatherResult.city));

            dispatch(
              fetchForecastByLocation({
                lat: coords.latitude,
                lng: coords.longitude,
              })
            );

            resolve(coords);
          } catch (error) {
            reject(
              rejectWithValue(
                "Erreur lors de la récupération des données météo."
              )
            );
          }
        },
        (error) => {
          let message: string;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "Vous avez refusé l'accès à la géolocalisation.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Position indisponible.";
              break;
            case error.TIMEOUT:
              message = "Délai d'attente dépassé pour la géolocalisation.";
              break;
            default:
              message = "Erreur de géolocalisation inconnue.";
          }
          reject(rejectWithValue(message));
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        }
      );
    });
  }
);

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    clearGeolocationError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestGeolocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestGeolocation.fulfilled, (state, action) => {
        state.loading = false;
        state.coordinates = action.payload;
      })
      .addCase(requestGeolocation.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Erreur de géolocalisation.";
      });
  },
});

export const { clearGeolocationError } = geolocationSlice.actions;
export default geolocationSlice.reducer;