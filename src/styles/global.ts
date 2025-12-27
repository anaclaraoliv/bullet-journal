import type { GlobalStylesProps } from '@mui/material';

export const globalStyles: GlobalStylesProps['styles'] = {
    body: {
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    },
    '#root': {
        width: '100vw',
        height: '100vh',
    },

    /* Define a largura da barra vertical e altura da horizontal */
    '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
    },

    /* O "trilho" da barra (a parte de baixo que fica parada) */
    '::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },

    /* O "polegar" da barra (a parte que se move) */
    '::-webkit-scrollbar-thumb': {
        backgroundColor: '#BFB0C4',
        borderRadius: '10px',
        border: '2px solid #F2F3F6',

        '&:hover': {
            backgroundColor: '#B08BBD',
        },
    },

    '.toggle-theme-container': {
        position: 'fixed',
        top: '14px',
        right: '20px',
        zIndex: 2000,
    },
};