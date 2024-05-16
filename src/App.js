import { CssBaseline, ThemeProvider } from "@mui/material";
import Nav from "./components/nav";
import { useThemeContext } from "./theme/themeContextProvider";
import TodoList from "./components/todoList";

function App() {
    const { theme } = useThemeContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            <TodoList />
        </ThemeProvider>
    );
}

export default App;
