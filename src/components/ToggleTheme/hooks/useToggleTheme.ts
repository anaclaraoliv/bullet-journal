import { useState } from 'react';

export const useToggleTheme = (initialValue: boolean) => {

    const [isDarkMode, setIsDarkMode] = useState(initialValue);

    const onToggle = () => {
        console.log("Executando onToggle...");
        setIsDarkMode(prev => !prev);};

    return { isDarkMode, onToggle };
};