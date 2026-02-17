import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Box, IconButton, ListItem, Typography} from "@mui/material";
import styles from './styles.module.css';
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import type { Task as TaskType } from "../../../../types/task";
import type {Dispatch, SetStateAction} from "react";

export interface TaskProps {
    task: TaskType;
    changeStatus: (taskId : string) => void;
    deleteTask: (taskId : string) => void;
    handleOpenModal?: () => void ;
    setDataTaskEdit?: Dispatch<SetStateAction<TaskType | undefined>>;
}

const Task = ({
                  task,
                  changeStatus,
                  deleteTask,
                  handleOpenModal,
                  setDataTaskEdit} : TaskProps) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const styleDrag = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <ListItem
            key={task.id}
            className={styles['items-list']}
            style={styleDrag}
            disablePadding
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}
                 onClick={() => changeStatus(task.id)}>
                <IconButton>
                    {!task.status ? <CheckBoxOutlineBlankIcon/> : <CheckBoxIcon/> }
                </IconButton>

                <Typography sx={{ml: 1}}>
                    {task.title}
                </Typography>

                <Box sx={{flexGrow: 1}}/>

                {!task.status && setDataTaskEdit && (
                    <>
                        <IconButton>
                            <EditIcon
                                onClick={(e) => {
                                e.stopPropagation();
                                setDataTaskEdit(task);
                                handleOpenModal?.();
                            }}/>
                        </IconButton>

                        <IconButton onClick={() => deleteTask(task.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </>
                )}
            </Box>
        </ListItem>
    )
}

export default Task;