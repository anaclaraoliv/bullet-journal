import { BrowserRouter } from 'react-router-dom';
import {ThemeProvider, CssBaseline, GlobalStyles, Box} from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';
import { globalStyles } from './styles/global';
import AppRoutes from './routes';
import { useToggleTheme } from './components/ToggleTheme/hooks/useToggleTheme';
import ToggleTheme from "./components/ToggleTheme";

function App() {
    const { isDarkMode, onToggle} = useToggleTheme(true);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />

            <Box className="toggle-theme-container">
                <ToggleTheme isDarkMode={isDarkMode} onToggle={onToggle} />
            </Box>

            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>

        </ThemeProvider>
    );
}

export default App;