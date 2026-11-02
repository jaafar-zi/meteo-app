import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, RegisterCredentials, User } from "./types/auth.types";
import { City } from "../../shared/types/weather.types";
import {
  mockLoginApi,
  mockRegisterApi,
  mockLogoutApi,
  mockGetStoredSession,
  mockSaveFavoriteApi,
} from "./authApi";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isModalOpen: false,
  activeTab: "login",
};

// Thunks
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    return await mockLoginApi(credentials);
  } catch (err: any) {
    return rejectWithValue(err.message || "Erreur de connexion.");
  }
});

export const registerUser = createAsyncThunk<
  { user: User; token: string },
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    return await mockRegisterApi(credentials);
  } catch (err: any) {
    return rejectWithValue(err.message || "Erreur d'inscription.");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await mockLogoutApi();
});

export const toggleFavoriteCity = createAsyncThunk<
  City[],
  City,
  { state: { auth: AuthState }; rejectValue: string }
>("auth/toggleFavorite", async (city, { getState, rejectWithValue }) => {
  const { user } = getState().auth;
  if (!user) return rejectWithValue("Vous devez être connecté.");

  const exists = user.favorites.some((f) => f.insee === city.insee);
  const updatedFavorites = exists
    ? user.favorites.filter((f) => f.insee !== city.insee)
    : [...user.favorites, city];

  try {
    return await mockSaveFavoriteApi(user.id, updatedFavorites);
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth(state) {
      const session = mockGetStoredSession();
      if (session) {
        state.user = session.user;
        state.token = session.token;
        state.isAuthenticated = true;
      }
    },
    openAuthModal(state, action: PayloadAction<"login" | "register" | undefined>) {
      state.isModalOpen = true;
      state.error = null;
      if (action.payload) state.activeTab = action.payload;
    },
    closeAuthModal(state) {
      state.isModalOpen = false;
      state.error = null;
    },
    setActiveTab(state, action: PayloadAction<"login" | "register">) {
      state.activeTab = action.payload;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isModalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de connexion";
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isModalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur d'inscription";
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Toggle Favorites
    builder.addCase(toggleFavoriteCity.fulfilled, (state, action) => {
      if (state.user) {
        state.user.favorites = action.payload;
      }
    });
  },
});

export const {
  initializeAuth,
  openAuthModal,
  closeAuthModal,
  setActiveTab,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;