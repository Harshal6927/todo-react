import { createTheme } from "@mui/material";
import { createContext, useContext } from "react";
import { useColorTheme } from "./useColorTheme";

export const ThemeContext = createContext({
    theme: createTheme(),
    mode: "dark",
    toggleColorMode: () => {},
});

export const ThemeContextProvider = ({ children }) => {
    const value = useColorTheme();
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};
