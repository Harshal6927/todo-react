import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: { 500: grey[900] },
                  divider: { 500: "#c5c5c1" },
                  background: {
                      default: "#F9F8F3",
                      paper: "#F9F8F3",
                  },
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
                  delete: { 500: "#ed3e41" },
                  done: { 500: "#23a55a" },
                  taskbg: { 500: "#ecebe6" },
              }
            : {
                  // palette values for dark mode
                  primary: { 500: "#dbdee1" },
                  divider: { 500: "#52555e" },
                  background: {
                      default: "#313338",
                      paper: "#313338",
                  },
                  text: {
                      primary: grey[300],
                      secondary: grey[400],
                  },
                  delete: { 500: "#ed3e41" },
                  done: { 500: "#23a55a" },
                  taskbg: { 500: "#2b2d31" },
              }),
    },
});
