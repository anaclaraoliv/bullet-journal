import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container, IconButton,
    List, ListItem,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import AppBarBullet from "../../components/AppBarBullet";
import styles from './style.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useMainPage} from "./hooks/useMainPage.ts";

const MainPage = () => {

    const {
        completedTasks,
        incompletedTasks,
        markAsComplete,
        markAsIncomplete,
        deleteTask,
    } = useMainPage();

    return (
        <Container
            maxWidth={false}
            sx={{
                pt: 10
            }}
        >
            <AppBarBullet />
            <Paper className={styles['to-do-list']} elevation={4} >
                <Stack sx={{ width: '90%' }}>
                    <Accordion elevation={0} className={styles['accordion-style']}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>TO DO</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List sx={{maxHeight: '400px', overflowY: 'auto', pr: 1,}}>
                                {incompletedTasks.map((task) => (
                                    <ListItem key={task.id} className={styles['items-list']}>
                                        <IconButton onClick={() => markAsComplete(task.id)}>
                                            <CheckBoxOutlineBlankIcon/>
                                        </IconButton>

                                        <Typography>
                                            {task.title}
                                        </Typography>

                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            onClick={() => deleteTask(task.id)}>
                                            <DeleteIcon/>
                                        </IconButton>

                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} className={styles['accordion-style']}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>DONE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List sx={{maxHeight: '400px', overflowY: 'auto', pr: 1,}}>
                                {completedTasks.map((task) => (
                                    <ListItem key={task.id} className={styles['items-list']}>
                                        <IconButton onClick={() => markAsIncomplete(task.id)}>
                                            <CheckBoxIcon/>
                                        </IconButton>

                                        <Typography>
                                            {task.title}
                                        </Typography>

                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton onClick={() => deleteTask(task.id)}>
                                            <DeleteIcon/>
                                        </IconButton>

                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Stack>

            </Paper>

        </Container>
    );
};

export default MainPage;