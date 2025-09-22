import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";

// interface UserContextProviderProps {
//     children: React.ReactNode
// }

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      console.log("User not found");
      setAuthStatus("not-authenticated");
      setUser(null);
      return false;
    }

    setAuthStatus("authenticated");
    setUser(user);
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) handleLogin(+storedUserId);

    handleLogout();
  });

  return (
    <UserContext
      value={{
        authStatus,
        isAuthenticated: authStatus === "authenticated",
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
