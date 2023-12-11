import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:8080";

interface AuthContextType {
  currentUser: User | null;
  idToken: string | null;
  api: AxiosInstance | null;
  isLoading: boolean; // Add loading state to the context type
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  idToken: null,
  api: null,
  isLoading: false, // Initialize loading state
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [api, setApi] = useState<AxiosInstance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Define loading state with TypeScript type


  

  useEffect(() => {
    setIsLoading(true); 
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const token = await user.getIdToken(true);
          setIdToken(token);

          const axiosInstance = axios.create({
            baseURL: BASE_URL,
          });

          axiosInstance.interceptors.request.use((config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          });

          setApi(axiosInstance);
          console.log(`axios ${api}`)
          console.log(`axios2 ${axiosInstance}`)
        } catch (e) {
          console.log("Error fetching authentication token", e);
        }
      }
      setIsLoading(false);
      console.log(`axios ${api}`)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, idToken, api, isLoading }}>
     {!isLoading && children}

    </AuthContext.Provider>
  );
};