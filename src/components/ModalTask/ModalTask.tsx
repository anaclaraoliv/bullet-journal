import {Box, Button, Dialog, Divider, MenuItem, Switch, TextField, Typography} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import styles from './style.module.css';
import {useState} from "react";
import {CATEGORIES} from "../../pages/MainPage/components/TaskComponent/constant.tsx";
import type {Task} from '../../types';

type EditData = Task | null | undefined;

const buildInitialForm = (dataTaskEdit: EditData, currentDate: Dayjs) => ({
    id: dataTaskEdit?.id ?? '',
    title: dataTaskEdit?.title ?? '',
    description: dataTaskEdit?.description ?? '',
    category: dataTaskEdit?.category ?? '',
    date: dataTaskEdit ? dayjs(dataTaskEdit.date) : currentDate,
    status: dataTaskEdit?.status ?? false,
    position: dataTaskEdit?.position ?? 0
});

const ModalTask = ({
                       open,
                       onClose,
                       createTask,
                       updateTask,
                       currentDate,
                       dataTaskEdit,}: {
    open: boolean,
    onClose: () => void,
    createTask: (title: string, description: string, category: string, date: Date) => Promise<void>,
    updateTask: (id: string, title: string, description: string, category: string, date: Date, status: boolean, position: number) => Promise<void>,
    currentDate: dayjs.Dayjs,
    dataTaskEdit?: Task | null;

}) => {
    const initial = buildInitialForm(dataTaskEdit, currentDate);

    const [id, setId] = useState(() => initial.id);
    const [title, setTitle] = useState(() => initial.title);
    const [description, setDescription] = useState(() => initial.description);
    const [category, setCategory] = useState(() => initial.category);
    const [date, setDate] = useState<Dayjs | null>(() => initial.date);
    const [status, setStatus] = useState(() => initial.status);
    const [errors, setErrors] = useState(() => ({ title: false, date: false, category: false }));
    const position = initial.position;

    const handleSave = async () => {
        const titleBlank = !title.trim();
        const dateBlank = !date || !date.isValid();
        const categoryBlank = !category;

        if (titleBlank || dateBlank || categoryBlank) {
            setErrors({ title: titleBlank, date: dateBlank, category: categoryBlank });
            return;
        }

        try {
            if (date && !dataTaskEdit) {
                await createTask(title, description, category, date.toDate());
                setTitle('');
                setDescription('');
                setCategory('');
                setErrors({title: false, date: false, category: false});
                onClose();
            }

            if (dataTaskEdit) {
                await updateTask(id, title, description, category, date?.toDate(), status, position);
                setId('');
                setTitle('');
                setDescription('');
                setCategory('');
                setErrors({title: false, date: false, category: false});
                onClose();
            }
        } catch (error) {
            console.error("Erro ao salvar tarefa:", errors, " | ", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Typography component="h1" sx={{ textAlign: 'center', mt: 2 }}>
                    {dataTaskEdit ? "TAREFA" :  "NOVA TAREFA"}
                </Typography>

                <Divider sx={{ mt: 2 }}/>

                <Box className={styles['modal-style']} >
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="h2" sx={{ mb:1 }}>
                            TÍTULO
                        </Typography>

                        <Typography component="h2" >
                            STATUS
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            id="title"
                            label="Título"
                            variant="filled"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={errors.title}
                            helperText={errors.title ? "Preencha o campo" : ""}
                        />

                        <Switch
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            sx={{
                                mt: 1,
                                '& .MuiSwitch-switchBase': {
                                    color: status ? 'success.main' : 'grey.500',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'success.main',
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: status ? 'success.light' : 'grey.400',
                                    opacity: 1,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: 'success.main',
                                    opacity: 1,
                                },
                            }}
                        />
                    </Box>

                    <Box display="flex" sx={{ mt: 2}}>
                        <Typography component="h2" sx={{ mt: 3.6 , mr: 3.5}}>
                            DATA
                        </Typography>
                        <DatePicker
                            format="DD / MM / YYYY"
                            value={date}
                             onChange={(newValue) => setDate(newValue)}
                            slotProps={{
                                textField: {
                                    variant: 'filled',
                                    fullWidth: true,
                                    sx: { mt: 2 },
                                    error: errors.date,
                                    helperText: errors.date ? "Selecione uma data válida" : ""
                                }
                            }}
                        />
                    </Box>

                    <Box display="flex" sx={{ mt: 2}}>
                        <Typography component="h2" sx={{mt: 3.6 , mr: 3.5}}>
                            CATEGORIA
                        </Typography>
                        <TextField
                            id="category"
                            label="Categoria"
                            variant="filled"
                            sx={{ mt: 2, minWidth: 220 }}
                            select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            error={errors.category}
                        >
                            {Object.entries(CATEGORIES).map(([key, { label }]) => (
                                <MenuItem key={key} value={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Box>

                    <Box sx={{ mt: 2}}>
                        <Typography component="h2" display="flex" justifyContent={'end'}  sx={{ mb:1, mt: 3.6 }}>
                            DESCRIÇÃO
                        </Typography>
                        <TextField
                            id="description"
                            label="Sobre a terefa"
                            multiline
                            rows={4}
                            variant="filled"
                            fullWidth={true}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>

                    <Button  sx={{ ml:'80%', mt: 2 }} onClick={handleSave} >
                        SALVAR
                    </Button>
                </Box>
            </Dialog>
        </LocalizationProvider>
    );
};

export default ModalTask;