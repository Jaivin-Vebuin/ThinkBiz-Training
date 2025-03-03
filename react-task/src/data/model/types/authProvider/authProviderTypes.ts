import { ReactNode } from "react";

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: UserDetails | null;
};

export type AuthProviderProps = {
  children: ReactNode;
};
