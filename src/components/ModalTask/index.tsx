import {Box, Button, Dialog, Divider, Switch, TextField, Typography} from "@mui/material";
import styles from './style.module.css';
import {useMainPage} from "../../pages/MainPage/hooks/useMainPage.ts";
import {useState} from "react";

const ModalTask = ({ open, onClose}: { open: boolean, onClose: () => void}) => {
    const { createTask } = useMainPage();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({ title: false, category: false });

    const handleSave = async () => {
        const titleBlank = !title.trim();
        const categoryBlank = !category.trim();

        if (titleBlank || categoryBlank) {
            setErrors({ title: titleBlank, category: categoryBlank });
            return;
        }

        try {
            await createTask(title, description, category, new Date(date + 'T00:00:00'));
            setTitle('');
            setDescription('');
            setCategory('');
            setErrors({ title: false, category: false });
            onClose();
        } catch (error) {
            console.error("Erro ao salvar tarefa:", errors, " | ", error);
        }
    };

    return (
        <Box >
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Typography component="h1" sx={{ textAlign: 'center', mt: 3 }}>
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
                        />
                        <Switch disabled sx={{  mt: 1}}/>
                    </Box>

                    <Box display="flex" sx={{ mt: 2 }}>
                        <Typography component="h2" sx={{ mt: 3.6 , mr: 3.5}}>
                            DATA
                        </Typography>
                        <TextField
                            fullWidth={true}
                            id="date-input"
                            type="date"
                            variant="filled"
                            sx={{ mt: 2}}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
                        sx={{ ml:'80%', mt: 3.6 }}
                        onClick={handleSave}
                    >
                        SALVAR
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default ModalTask;