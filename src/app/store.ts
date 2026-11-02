import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import weatherReducer from "../features/weather/weatherSlice";
import forecastReducer from "../features/forecast/forecastSlice";
import geolocationReducer from "../features/geolocation/geolocationSlice";
import { authReducer } from "../features/auth";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    geolocation: geolocationReducer,
    auth: authReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;