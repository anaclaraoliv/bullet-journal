import {Box, Modal, Typography} from "@mui/material";
import styles from './style.module.css';

const ModalTask = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

    return (
        <Box sx={{width:'100%', bgcolor: 'rgba(0, 0, 0, 0.5)' }} >
            <Modal
                open={open}
                onClose={onClose}
                className={styles['modal-style']}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.0)'
                        },
                    },
                }}
            >
                <Box>
                    <Typography variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default ModalTask;