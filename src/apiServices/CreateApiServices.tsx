import axios from "axios";
import { useAuth } from "../firebase/AuthContext";

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const { idToken } = useAuth();
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export interface createGizT {
    title: String,
    description: String,
    date: Date,
    time: String,
  }

// GET ALL gizIds: /users/userName/gizJoined/gizIds
export const createGiz = async (gizData: createGizT): Promise<createGizT> => {
    const response = await api.post<createGizT>('/api/giz/create', gizData);
    return response.data;
  };