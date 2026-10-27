import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import weatherReducer from "../features/weather/weatherSlice";
import forecastReducer from "../features/forecast/forecastSlice";
import geolocationReducer from "../features/geolocation/geolocationSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    geolocation: geolocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;