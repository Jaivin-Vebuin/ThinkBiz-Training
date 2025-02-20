import { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUserAPI, getAllUserAPI } from "../../services/userFetchServices";

type UserDetails = {
  id: string;
  name: string;
  email: string;
  role: string;
  age:number;
};

type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: UserDetails | null;
  allUsers: UserDetails[];
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [currentUser, setCurrentUser] = useState<UserDetails | null>(null);
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);

  const isLoggedIn = token ? true : false;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await getUserAPI();
        setCurrentUser(userResponse?.data || null);
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    const fetchAllUserDetails = async () => {
      try {
        const userResponse = await getAllUserAPI();
        setAllUsers(userResponse?.data || null);
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    };

    if (currentUser?.role === "admin") {
      fetchAllUserDetails();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export { AuthProvider };
