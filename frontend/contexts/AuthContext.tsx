import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest, registerRequest } from "../services/auth";
import { router } from "expo-router";

interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((saved) => {
      if (saved) setToken(saved);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    setToken(response.access_token);
    await AsyncStorage.setItem("token", response.access_token);
    router.replace("/(tabs)");
  };

  const register = async (email: string, password: string) => {
    const response = await registerRequest(email, password);
    setToken(response.access_token);
    await AsyncStorage.setItem("token", response.access_token);
    router.replace("/(tabs)");
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
