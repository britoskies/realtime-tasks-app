import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "@/constants/Api";

const api = axios.create({
  baseURL: `${Api.baseUrl}:${Api.port}`,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
