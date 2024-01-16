import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import axios, { AxiosInstance } from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://api.gizapp.net/";
// const BASE_URL = "https://Gizapp-env-3.eba-xvqp4wt6.eu-north-1.elasticbeanstalk.com";
interface AuthContextType {
  currentUser: User | null;
  idToken: string | null;
  api: AxiosInstance | null;
  isLoading: boolean; // Add loading state to the context type
  authInitialized: boolean; // Add this to your context type
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  idToken: null,
  api: null,
  isLoading: false, // Initialize loading state
  authInitialized: false,
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

  const [authInitialized, setAuthInitialized] = useState(false);

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

        } catch (e) {
          console.log("Error fetching authentication token", e);
        }
      }
      setAuthInitialized(true); // Set to true after initial check
      setIsLoading(false);

    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, idToken, api, isLoading, authInitialized }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
