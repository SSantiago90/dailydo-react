import { createContext, useState, ReactNode, useContext } from "react";

type ThemeContextType = {
  themeColor: string;
  setColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeColorStorage = localStorage.getItem("themeColor");
  const [themeColor, setColorContext] = useState<string>(
    themeColorStorage || "rose"
  );

  const setColor = (color: string) => {
    localStorage.setItem("themeColor", color);
    setColorContext(color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
