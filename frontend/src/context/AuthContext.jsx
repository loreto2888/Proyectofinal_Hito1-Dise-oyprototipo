import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'marketplace_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user ?? null);
      setToken(parsed.token ?? null);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [token, user]);

  const login = (loginResponse) => {
    setUser(loginResponse.user);
    setToken(loginResponse.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
