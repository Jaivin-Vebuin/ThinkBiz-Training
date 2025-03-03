import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUserAPI } from "../../services/userFetchServices";
import { AuthContextType, AuthProviderProps, UserDetails } from "../../data/model/types/authProvider/authProviderTypes";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [currentUser, setCurrentUser] = useState<UserDetails | null>(null);

  const isLoggedIn = token ? true : false;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await getUserAPI();
        const data = userResponse?.data.message[0];
    
        setCurrentUser(data || null);
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn, token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export { AuthProvider };
