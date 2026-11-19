import { useEffect, useState } from "react";
import { apiGet, apiPost, setSessionExpiredHandler } from "../api/client.js";
import { AuthContext } from "./AuthContext.js";

// Starting point and the state after logout. status: "loading", "signedIn", "signedOut", or "failed".
const SIGNED_OUT = {
  status: "signedOut",
  admin: null,
  sessionExpired: false,
  error: null,
};

// Knows who is signed in and shares it with every page below it.
function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    ...SIGNED_OUT,
    status: "loading",
  });
  // Bumped by retry() so the /me effect runs again.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    apiGet("/api/auth/me", { signal: controller.signal })
      .then((data) =>
        setAuth({
          ...SIGNED_OUT,
          status: "signedIn",
          admin: data.admin,
        }),
      )
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        // 401 means no session. Anything else (API down, 500) is not a logout.
        setAuth(
          error.status === 401
            ? SIGNED_OUT
            : {
                ...SIGNED_OUT,
                status: "failed",
                error,
              },
        );
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    // Only a signed-in admin can lose a session: the 401 from /me at startup is ignored here.
    setSessionExpiredHandler(() =>
      setAuth((current) =>
        current.status === "signedIn"
          ? {
              ...SIGNED_OUT,
              sessionExpired: true,
            }
          : current,
      ),
    );
    return () => setSessionExpiredHandler(null);
  }, []);

  // Errors are thrown to the caller; so the Login page can show them.
  const login = async (credential) => {
    const data = await apiPost("/api/auth/google", { credential });
    setAuth({
      ...SIGNED_OUT,
      status: "signedIn",
      admin: data.admin,
    });
  };

  const logout = async () => {
    try {
      await apiPost("/api/auth/logout");
    } catch {
      // Signed out on this browser even if the API is down.
    }
    setAuth(SIGNED_OUT);
  };

  const retry = () => {
    setAuth({
      ...SIGNED_OUT,
      status: "loading",
    });
    setAttempt((current) => current + 1);
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, retry }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
