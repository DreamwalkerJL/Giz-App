// apiService.ts
import axios from "axios";
import { useAuth } from "..//firebase/AuthContext";

const BASE_URL = "http://localhost:8080";

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
  title: String;
  description: String;
  date: Date;
  time: String;
}

export interface StatusGizIdsT {
  email: String;
  id: Number;
  userName: String;
}

export interface StatusGizDataT {
  title: string;
  description: string;
  date: string;
  accepted: string[];
  declined: string[];
  undecided: string[];
}

export interface StatusGizUserNamesT {
  userNames: string[];
}

export interface StatusGizUsersDataT {
  userName: string;
  profilePicture: string;
}

// GET ALL gizIds: /users/userName/gizJoined/gizIds
export const createGiz = async (gizData: createGizT): Promise<createGizT> => {
  const response = await api.post<createGizT>("/api/giz/create", gizData);
  return response.data;
};

// GET ALL gizIds: /users/userName/gizJoined/gizIds
export const getAllGizAcceptedData = async (
  token: string
): Promise<StatusGizIdsT> => {
  const response = await axios.get<StatusGizIdsT>(
    `${BASE_URL}/api/giz/accepted`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// GET ALL gizData: /giz/{gizId}/ - "GET title, description, date, accepted[], declined[], undecided[]"
export const getStatusGizData = async (
  gizIds: string[]
): Promise<StatusGizDataT[]> => {
  const idsQueryParam = gizIds.join(",");
  const response = await axios.get<StatusGizDataT[]>(
    `${BASE_URL}/status/gizData?gizIds=${idsQueryParam}`
  );
  return response.data;
};

// GET userNames from the GizIds: /giz/{gizId}/users
export const getStatusGizUsers = async (
  gizIds: string[]
): Promise<StatusGizUserNamesT> => {
  const idsQueryParam = gizIds.join(",");
  const response = await axios.get<StatusGizUserNamesT>(
    `${BASE_URL}/status/users?gizIds=${idsQueryParam}`
  );
  return response.data;
};

// GET userData from the userNames: /users/{userName}
export const getStatusGizUsersData = async (
  userNames: string[]
): Promise<StatusGizUsersDataT[]> => {
  const idsQueryParam = userNames.join(",");
  const response = await axios.get<StatusGizUsersDataT[]>(
    `${BASE_URL}/status/users?userNames=${idsQueryParam}`
  );
  return response.data;
};

export default api;
