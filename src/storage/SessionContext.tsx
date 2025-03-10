import { ReactNode, createContext, useEffect, useState } from "react";
import { SessionType } from "../types/Session.type";
import { validateJWT } from "../services/todosApi";

type SessionContextType = {
  user: SessionType | null;
  isLoggedIn: () => boolean;
  sessionLogin: (user: SessionType) => void;
  sessionLogout?: () => void;
};

export const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoggedIn: () => false,
} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<SessionType | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    const validateToken = async () => {
      const isValid = await validateJWT(jwt);
      if (!isValid) {
        setUser(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("jwt-email");
      } else {
        const email = localStorage.getItem("jwt-email") || "";
        setUser({ token: jwt, email: email });
      }
    };
    validateToken();
  }, []);

  const sessionLogin = (user: SessionType | null) => {
    if (user && user.token) {
      localStorage.setItem("jwt", user.token);
      localStorage.setItem("jwt-email", user.email);
    }
    return setUser(user);
  };
  const sessionLogout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt-email");
  };

  const isLoggedIn = () => Boolean(user?.token);

  return (
    <SessionContext.Provider
      value={{ user, sessionLogin, sessionLogout, isLoggedIn }}
    >
      {children}
    </SessionContext.Provider>
  );
};
