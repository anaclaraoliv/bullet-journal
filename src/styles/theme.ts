import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// ligthColors
const LigthColors = {
    primary: '#BFB0C4',
    primaryLight: '#F9E8FF',
    primaryDark: '#B08BBD',

    secondary: '#D9D9D9',
    secondaryDark: '#BDBDBD',

    tertiary: '#6680AB',
    tertiaryDark: '#446285',

    background: '#F2F3F6',

    textPrimary: '#230E25',
    textSecondary: '#49424A',

    success: '#AFCBBA',
    error: '#BF98A9',
    errorLight: '#D4B7B2',
    processing: '#F3E7A8',
    processingLight: '#EEE2C3',
};

//  darkColors
const DarkColors = {
    primary: '#7B6F82',
    primaryLight: '#8E7D96',
    primaryDark: '#4A424F',

    secondary: '#424242',
    secondaryDark: '#212121',

    tertiary: '#8AA2C7',

    background: '#1E1E21',

    textPrimary: '#E1E1E6',
    textSecondary: '#A19DA3',

    success: '#95AF9F',
    error: '#A37E8D',
    warning: '#D9CF96',
};

// MarkTasksColours
// const MarkTasksColors = {
//     purple: '9752B9',
//     blue: '6BBFE3',
//     red: 'D7686A',
//     lilac: 'A994FC',
//     pink: 'FFA9F2',
//     olive: 'BADC51',
//     orange: 'F0B97E',
//     yellow: 'F0ED6E',
//     green: '64DA85',
//     pool: '48F6D9',
// }

// Definições comuns
const commonSettings: ThemeOptions = {
    typography: {
        fontFamily: '"Julius Sans One", "Roboto", "Arial", sans-serif',

        h1: {
            fontFamily: '"Julius Sans One", "Roboto",, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 400
        },

        h6: {
            fontFamily: '"Julius Sans One", "Roboto",',
            fontSize: '2rem',
        },

    },

    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: LigthColors.textPrimary,
                },
            },
        },

        // MuiModal: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: '10px',
        //             margin: '2em',
        //
        //         },
        //     },
        // },
    },
};

// lightTheme
export const lightTheme = createTheme({
    ... commonSettings,
    palette: {
        mode: 'light',
        primary: {
            main: LigthColors.primary,
            light: LigthColors.primaryLight,
            dark: LigthColors.primaryDark,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: LigthColors.secondary,
            dark: LigthColors.secondaryDark,
            contrastText: LigthColors.textPrimary,
        },
        error: {
            main: LigthColors.error,
            light: LigthColors.errorLight,
        },
        success: {
            main: LigthColors.success,
        },
        warning: {
            main: LigthColors.processing,
            light: LigthColors.processingLight,
        },
        background: {
            default: LigthColors.primaryLight,
        },
        text: {
            primary: LigthColors.textPrimary,
            secondary: LigthColors.textSecondary,
        },
        info: {
            main: LigthColors.tertiary,
            dark: LigthColors.tertiaryDark,
        },
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: LigthColors.textPrimary,
                },
            },
        },

        MuiListItem : {
            styleOverrides: {
                root: {
                    backgroundColor: LigthColors.primary,
                    width: '90%',
                }
            }
        },

        MuiTypography : {
            styleOverrides: {
                root: {
                    color: LigthColors.textPrimary,
                }
            }
        },

        MuiButton : {
            styleOverrides: {
                root: {
                    color: LigthColors.textPrimary,
                    borderColor: LigthColors.textPrimary,
                    border: '1px solid',
                }
            }
        },

        // MuiModal : {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: LigthColors.processingLight,
        //             border: '3px solid #A37E8D',
        //             borderRadius: '20px',
        //         }
        //     }
        // }
    },
});

// darkTheme
export const darkTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: 'dark',
        primary: {
            main: DarkColors.primary,
            light: DarkColors.primaryLight,
            dark: DarkColors.primaryDark,
            contrastText: '#121214',
        },
        secondary: {
            main: DarkColors.secondary,
            dark: DarkColors.secondaryDark,
            contrastText: '#FFFFFF',
        },
        background: {
            default: DarkColors.background,
        },
        text: {
            primary: DarkColors.textPrimary,
            secondary: DarkColors.textSecondary,
        },
        error: {
            main: DarkColors.error,
        },
        success: {
            main: DarkColors.success,
        },
        warning: {
            main: DarkColors.warning,
        },
        info: {
            main: DarkColors.tertiary,
        },
    },

    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },

        MuiListItem : {
            styleOverrides: {
                root: {
                    backgroundColor: DarkColors.primaryDark,
                    width: '90%',
                }
            }
        },

        MuiTypography : {
            styleOverrides: {
                root: {
                    color: DarkColors.textPrimary,
                }
            }
        },

        MuiButton : {
            styleOverrides: {
                root: {
                    color: DarkColors.textPrimary,
                    borderColor: DarkColors.textPrimary,
                    border: '1px solid',
                }
            }
        },

        // MuiModal : {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: DarkColors.secondaryDark,
        //             border: '1px solid #D9CF96',
        //             borderRadius: '20px',
        //         }
        //     }
        // }
    },
});
