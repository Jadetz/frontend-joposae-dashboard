import { createContext, useContext } from "react";

// Holds what AuthProvider shares: status, admin, sessionExpired, error, login, logout, retry.
export const AuthContext = createContext(null);

// Reads the auth state from the nearest AuthProvider.
export function useAuth() {
  return useContext(AuthContext);
}
