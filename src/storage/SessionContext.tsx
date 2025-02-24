import { ReactNode, createContext, useState } from "react";
import { SessionType } from "../types/Session.type";

type SessionContextType = {
  user: SessionType | null;
  sessionLogin: (user: SessionType | null) => void;
  sessionLogout: () => void;
  isLoggedIn: () => boolean;
} | null;

export const SessionContext = createContext<SessionContextType>(null);

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<SessionType | null>(null);

  const sessionLogin = (user: SessionType | null) => setUser(user);
  const sessionLogout = () => setUser(null);
  const isLoggedIn = () => Boolean(user);

  return (
    <SessionContext.Provider
      value={{ user, sessionLogin, sessionLogout, isLoggedIn }}
    >
      {children}
    </SessionContext.Provider>
  );
};
