import api from "./api";

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerRequest = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};
