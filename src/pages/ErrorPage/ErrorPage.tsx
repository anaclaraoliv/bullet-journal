import { Container, Typography} from '@mui/material';

const ErrorPage = () => {

    return (
        <Container sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h1" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Página não encontrada
            </Typography>
        </Container>
    );
};

export default ErrorPage;