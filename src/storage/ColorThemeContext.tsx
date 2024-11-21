import { createContext, useState, ReactNode, useContext } from "react";

type ColorThemeContextType = {
  themeColor: string;
  setColor: (color: string) => void;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(
  undefined
);

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeColorStorage = localStorage.getItem("themeColor");
  const [themeColor, setColorContext] = useState<string>(
    themeColorStorage || "rose"
  );

  const setColor = (color: string) => {
    localStorage.setItem("themeColor", color);
    setColorContext(color);
  };

  return (
    <ColorThemeContext.Provider value={{ themeColor, setColor }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
