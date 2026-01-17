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
import dayjs from "dayjs";
import * as React from "react";
import TaskSkeleton from "./skeletons/TaskSkeleton.tsx";

const MainPage = () => {

    const {
        completedTasks,
        incompletedTasks,
        changeStatus,
        deleteTask,
        currentDate,
        changeDate,
        setCurrentDate,
        createTask,
        loading,
    } = useMainPage();

    const [open, setOpen] = useState(false);

    const handleOpenModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [expanded, setExpanded] = React.useState<string | false>('todo');
    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        dateInputRef.current?.showPicker();
    };

    return (
        <Container maxWidth={false} sx={{ pt: 10 }} >

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
                    {currentDate && currentDate.isValid()
                        ? currentDate.format('DD.MM.YYYY')
                        : '--.--.----'}
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
                                value={currentDate && currentDate.isValid() ? currentDate.format('YYYY-MM-DD') : ''}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setCurrentDate(dayjs(e.target.value));
                                    }
                                }}
                            />
                        </IconButton>
                </Box>

            </Container>

            {/* MODAL - CREATE NEW TASK*/}
            <ModalTask
                /**
                 * Força o React a desmontar e remontar o componente ModalTask sempre
                 * que o estado de visibilidade muda. Isso garante que:
                 * 1. O 'useState' local seja reinicializado com o 'currentDate' mais recente
                 *    passado via props, eliminando a necessidade de 'useEffect' para sincronização.
                 * 2. Todos os campos do formulário sejam resetados automaticamente ao fechar/abrir.
                 * 3. Evita renderizações em cascata (cascading renders), respeitando as regras
                 *    de performance do ESLint (react-hooks/set-state-in-effect).
                 */
                key={open ? 'open' : 'closed'}
                open={open}
                onClose={handleClose}
                createTask={createTask}
                currentDate={currentDate}
            />

            <Paper className={styles['to-do-list']} elevation={4} >
                <Stack sx={{ width: '100%', alignItems: 'right' }}>
                    <Accordion elevation={0} className={styles['accordion-style']}
                               expanded={expanded === 'todo'} onChange={handleChange('todo')}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="todo-content"
                            id="todo-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>TO DO</Typography>

                        </AccordionSummary>

                        <AccordionDetails>
                            {loading ? <TaskSkeleton /> : <List sx={{maxHeight: '400px', overflowY: 'auto' }}>
                                {incompletedTasks.map((task) => (
                                    <ListItem key={task.id} className={styles['items-list']} disablePadding>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                             onClick={() => changeStatus(task.id)}>
                                            <IconButton>
                                                <CheckBoxOutlineBlankIcon/>
                                            </IconButton>

                                            <Typography sx={{ ml: 1 }}>
                                                {task.title}
                                            </Typography>

                                            <Box sx={{ flexGrow: 1 }} />

                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton onClick={() => deleteTask(task.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            }
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} className={styles['accordion-style']}
                               expanded={expanded === 'done'} onChange={handleChange('done')}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="done-content"
                            id="done-header"
                        >
                            <Typography component="span" sx={{m:'auto'}}>DONE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {loading ? <TaskSkeleton /> : <List sx={{maxHeight: '400px', overflowY: 'auto' ,}}>
                                {completedTasks.map((task) => (
                                    <ListItem key={task.id} className={styles['items-list']} disablePadding>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                             onClick={() => changeStatus(task.id)}>
                                            <IconButton>
                                                <CheckBoxIcon/>
                                            </IconButton>

                                            <Typography sx={{ ml: 1 }}>
                                                {task.title}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            }
                        </AccordionDetails>
                    </Accordion>
                </Stack>

            </Paper>

        </Container>
    );
};

export default MainPage;