/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'marketplace_auth';

function getInitialAuth() {
  if (typeof window === 'undefined') {
    return { user: null, token: null };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { user: null, token: null };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
    };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const initial = getInitialAuth();
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
