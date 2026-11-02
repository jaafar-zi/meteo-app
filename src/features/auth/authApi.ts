import { User, LoginCredentials, RegisterCredentials } from "./types/auth.types";
import { City } from "../../shared/types/weather.types";

const USERS_STORAGE_KEY = "meteo_app_users";
const SESSION_STORAGE_KEY = "meteo_app_session";

// Helper: Get users database from localStorage
const getUsersDB = (): Record<string, { user: User; password: string }> => {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

// Helper: Save users database
const saveUsersDB = (db: Record<string, { user: User; password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(db));
};

// Helper: Artificial delay to simulate network latency
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLoginApi = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  await delay(600);
  const users = getUsersDB();
  const entry = users[credentials.email.toLowerCase()];

  if (!entry || entry.password !== credentials.password) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  const token = `fake-jwt-token-${Date.now()}`;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: entry.user, token }));

  return { user: entry.user, token };
};

export const mockRegisterApi = async (
  credentials: RegisterCredentials
): Promise<{ user: User; token: string }> => {
  await delay(600);
  const users = getUsersDB();
  const emailKey = credentials.email.toLowerCase();

  if (users[emailKey]) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name: credentials.name,
    email: credentials.email,
    favorites: [],
  };

  users[emailKey] = { user: newUser, password: credentials.password };
  saveUsersDB(users);

  const token = `fake-jwt-token-${Date.now()}`;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: newUser, token }));

  return { user: newUser, token };
};

export const mockSaveFavoriteApi = async (
  userId: string,
  favorites: City[]
): Promise<City[]> => {
  await delay(300);
  const users = getUsersDB();

  // Find user by id and update
  for (const emailKey in users) {
    if (users[emailKey].user.id === userId) {
      users[emailKey].user.favorites = favorites;
      saveUsersDB(users);

      // Update active session too
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        parsed.user.favorites = favorites;
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsed));
      }
      break;
    }
  }

  return favorites;
};

export const mockGetStoredSession = (): { user: User; token: string } | null => {
  const session = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
};

export const mockLogoutApi = async (): Promise<void> => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};