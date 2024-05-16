import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../theme/themeContextProvider";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Nav = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: 2,
                borderColor: "divider.500",
                p: 2,
            }}
        >
            <img width={45} src="z.png" alt="logo" />

            <Box>
                <IconButton
                    onClick={toggleColorMode}
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    {mode === "dark" ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
                <IconButton
                    href="https://github.com/Harshal6927/"
                    target="_blank"
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    href="https://www.linkedin.com/in/harshallaheri/"
                    target="_blank"
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Nav;
