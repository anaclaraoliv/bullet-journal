import {Accordion, AccordionDetails, AccordionSummary, Container, Paper, Stack, Typography} from '@mui/material';
import AppBarBullet from "../../components/AppBarBullet";
import styles from './style.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const MainPage = () => {
    return (
        <Container
            maxWidth={false}
            sx={{
                pt: 10
            }}
        >
            <AppBarBullet />
            <Paper className={styles['to-do-list']} elevation={4} >
                <Stack>
                    <Accordion elevation={0} className={styles['accordion-style']}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>TO DO</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} className={styles['accordion-style']}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>DONE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </Stack>

            </Paper>

        </Container>
    );
};

export default MainPage;