import {Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export interface ToggleThemeProps {
    isDarkMode: boolean;
    onToggle: () => void;
}

const ToggleTheme = ({ isDarkMode, onToggle }: ToggleThemeProps) => {
    return (
        <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
                onToggle();
            }}
            startIcon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{ borderRadius: 20}}
        >
            {isDarkMode ? 'Claro' : 'Escuro'}
        </Button>
    );
};

export default ToggleTheme;