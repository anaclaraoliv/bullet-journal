import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {useMainPage} from "./hooks/useMainPage.ts";
import ModalTask from "../../components/ModalTask/index.tsx";
import {useRef, useState} from "react";
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MainPage = () => {

    const {
        completedTasks,
        incompletedTasks,
        changeStatus,
        deleteTask,
        currentDate,
        changeDate,
        setCurrentDate
    } = useMainPage();

    const [open, setOpen] = useState(false);

    const handleOpenModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        dateInputRef.current?.showPicker();
    };
    return (
        <Container maxWidth={false} sx={{  pt: 10 }} >

            <AppBarBullet />

            <Container maxWidth="sm"
                       sx={{ mt: 1 ,
                           display: 'flex',
                           flexDirection: 'row',
                           mb: 2.2,
                           alignItems: 'center',
                           justifyContent: 'space-between'}}
            >

                <IconButton onClick={handleOpenModal} >
                    <AddIcon fontSize={'large'} />
                </IconButton>

                <IconButton onClick={() => changeDate('yesterday')}>
                    <ArrowBackIosIcon />
                </IconButton>

                <Typography variant="h4" sx={{ textAlign: 'center', fontFamily:"'Julius Sans One', sans-serif" }}>
                    {currentDate.toISOString().split('T')[0]}
                </Typography>

                <IconButton  onClick={() => changeDate('tomorrow')}>
                    <ArrowForwardIosIcon  />
                </IconButton>

                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <IconButton sx={{ position: 'relative' }} onClick={handleIconClick}>
                            <EventIcon fontSize={'large'}/>
                            <input
                                ref={dateInputRef}
                                type="date"
                                style={{
                                    position: 'absolute',
                                    width: 0,
                                    height: 0,
                                    opacity: 0,
                                    border: 'none',
                                    padding: 0
                                }}
                                value={currentDate.toISOString().split('T')[0]}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setCurrentDate(new Date(e.target.value + 'T00:00:00'));
                                    }
                                }}
                            />
                        </IconButton>
                </Box>

            </Container>

            <ModalTask open={open} onClose={handleClose}/>

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
                                        <IconButton onClick={() => changeStatus(task.id)}>
                                            <CheckBoxOutlineBlankIcon/>
                                        </IconButton>

                                        <Typography>
                                            {task.title}
                                        </Typography>

                                        <IconButton sx={{justifyContent: "flex-end"}}>
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
                                        <IconButton onClick={() => changeStatus(task.id)}>
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