import { Box, Button, Dialog, Divider, Switch, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import styles from './style.module.css';
import {useState} from "react";

const ModalTask = ({ open, onClose, createTask, currentDate}: {
    open: boolean,
    onClose: () => void,
    createTask: (title: string, description: string, category: string, date: Date) => Promise<void>,
    currentDate: dayjs.Dayjs
}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState<Dayjs | null>(currentDate );
    const [errors, setErrors] = useState({ title: false, date: false });

    const handleSave = async () => {
        const titleBlank = !title.trim();
        const dateBlank = !date || !date.isValid();;

        if (titleBlank || dateBlank) {
            setErrors({ title: titleBlank, date: dateBlank });
            return;
        }

        try {
            if (date) {
                await createTask(title, description, category, date.toDate());
                setTitle('');
                setDescription('');
                setCategory('');
                setErrors({title: false, date: false});
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
                    NOVA TAREFA
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
                        <Switch disabled sx={{  mt: 1}}/>
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
                            sx={{ mt: 2 }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
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

                    <Button
                        sx={{ ml:'80%', mt: 2 }}
                        onClick={handleSave}
                    >
                        SALVAR
                    </Button>
                </Box>
            </Dialog>
        </LocalizationProvider>
    );
};

export default ModalTask;