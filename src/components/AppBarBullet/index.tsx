import {AppBar, Box, Toolbar, Typography, Link} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './style.module.css';

const AppBarBullet = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"  sx={{ zIndex: 1}}>
                <Toolbar>
                    <Box
                        component="img"
                        sx={{ mr: 5, width: 40, height: 40 }}
                        src="/logos/LOGO-JANELA.png"
                        alt="Logo Janela Dois"
                    />
                    <Typography
                        className={styles['item-app-bar']}
                        sx={{ flexGrow: 1 }}
                    >
                        <Link href="/" color="inherit" underline="none"
                              sx={{ display: 'flex', alignItems: 'center' }}>
                            <HomeOutlinedIcon sx={{mb:0.5, mr:1}}/>
                            MAIN PAGE
                        </Link>
                    </Typography>



                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppBarBullet;