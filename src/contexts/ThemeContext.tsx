import { createContext, useContext, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { lightTheme, darkTheme } from '../styles/theme';
import { globalStyles } from '../styles/global';
import { useToggleTheme } from '../components/ToggleTheme/hooks/useToggleTheme';

interface ThemeContextData {
    isDarkMode: boolean;
    onToggle: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const { isDarkMode, onToggle } = useToggleTheme(true);

    return (
        <ThemeContext.Provider value={{ isDarkMode, onToggle }}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }
    return context;
};