import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../../shared/types/weather.types";
import { fetchCities } from "./searchApi";

interface SearchState {
  query: string;
  cities: City[];
  selectedCity: City | null;
  loading: boolean;
  error: string | null;
  isDropdownOpen: boolean;
}

const initialState: SearchState = {
  query: "",
  cities: [],
  selectedCity: null,
  loading: false,
  error: null,
  isDropdownOpen: false,
};

export const searchCities = createAsyncThunk<
  City[],
  string,
  { rejectValue: string }
>(
  "search/searchCities",
  async (query, { rejectWithValue }) => {
    try {
      return await fetchCities(query);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la recherche."
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    selectCity(state, action: PayloadAction<City>) {
      state.selectedCity = action.payload;
      state.query = action.payload.name;
      state.isDropdownOpen = false;
      state.cities = [];
    },
    setCityFromGeolocation(state, action: PayloadAction<City>) {
      state.selectedCity = action.payload;
      state.query = action.payload.name;
      state.isDropdownOpen = false;
      state.cities = [];
    },
    clearSearch(state) {
      state.query = "";
      state.cities = [];
      state.isDropdownOpen = false;
      state.error = null;
    },
    closeDropdown(state) {
      state.isDropdownOpen = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.isDropdownOpen = action.payload.length > 0;
      })
      .addCase(searchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue.";
        state.cities = [];
        state.isDropdownOpen = false;
      });
  },
});

export const {
  setQuery,
  selectCity,
  setCityFromGeolocation,
  clearSearch,
  closeDropdown,
  clearError,
} = searchSlice.actions;

export default searchSlice.reducer;