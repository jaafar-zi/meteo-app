import { City } from "../../../shared/types/weather.types";

export interface User {
  id: string;
  email: string;
  name: string;
  favorites: City[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  activeTab: "login" | "register";
}