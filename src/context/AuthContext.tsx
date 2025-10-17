"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null, user?: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setTokenState(storedToken);
    console.log(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const setToken = (token: string | null, userData?: User | null) => {
    if (token) {
      localStorage.setItem("jwt", token);
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
    } else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      setUser(null);
    }
    setTokenState(token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
