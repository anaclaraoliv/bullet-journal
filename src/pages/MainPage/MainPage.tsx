import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Container, IconButton,
    List,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import AppBarBullet from "../../components/AppBarBullet";
import styles from './style.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import {useMainPage} from "./hooks/useMainPage.ts";
import ModalTask from "../../components/ModalTask/ModalTask.tsx";
import {useRef, useState} from "react";
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from "dayjs";
import * as React from "react";
import TaskSkeleton from "./skeletons/TaskSkeleton.tsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Task from "./components/TaskComponent/Task.tsx";
import {DndContext, closestCorners, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import type {Task as TaskType} from "../../types/task.ts";

const MainPage = () => {

    const {
        completedTasks,
        incompletedTasks,
        changeStatus,
        deleteTask,
        currentDate,
        updateTask,
        changeDate,
        setCurrentDate,
        createTask,
        loading,
        handleDragEnd,
    } = useMainPage();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

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

    const [dataTaskEdit, setDataTaskEdit] = useState<TaskType>();

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

                <IconButton onClick={() => {
                    setDataTaskEdit?.(undefined);
                    handleOpenModal?.();} } >
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
                key={open ? 'open' : 'closed'}
                open={open}
                onClose={handleClose}
                createTask={createTask}
                updateTask={updateTask}
                currentDate={currentDate}
                dataTaskEdit={dataTaskEdit}
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
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCorners}
                                onDragEnd={handleDragEnd}>
                                <SortableContext items={incompletedTasks} strategy={verticalListSortingStrategy}>
                                    {loading ? <TaskSkeleton /> :
                                        <List sx={{maxHeight: '400px', overflowY: 'auto' }}>
                                        {incompletedTasks.map((TaskComponent) => (

                                            <Task task = {TaskComponent}
                                                  changeStatus = {changeStatus}
                                                  deleteTask = {deleteTask}
                                                  handleOpenModal = {handleOpenModal}
                                                  setDataTaskEdit = {setDataTaskEdit}
                                            />

                                        ))}
                                        </List>
                                    }
                                </SortableContext>
                            </DndContext>
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
                            <SortableContext items={completedTasks} strategy={verticalListSortingStrategy}>
                                {loading ? <TaskSkeleton /> :
                                    <List sx={{maxHeight: '400px', overflowY: 'auto' }}>
                                        {completedTasks.map((TaskComponent) => (
                                            <Task task={TaskComponent}
                                                  changeStatus={changeStatus}
                                                  deleteTask={deleteTask}
                                            />
                                        ))}
                                    </List>
                                }
                            </SortableContext>
                        </AccordionDetails>
                    </Accordion>
                </Stack>

            </Paper>

        </Container>
    );
};

export default MainPage;