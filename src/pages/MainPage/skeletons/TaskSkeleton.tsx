import {Box, Skeleton} from "@mui/material";
import styles from "../style.module.css";

const TaskSkeleton = () => {
    return (
        <Box sx={{ width: '100%', mt:1, pr: 1.5, mb: 2.5}}>
            {[1, 2, 3].map((i) => (
                <Skeleton
                    key={i}
                    variant="rectangular"
                    animation="wave"
                    className={styles['items-list']}
                    height={60}
                    sx={{ mb: 2, borderRadius: '10px' }}
                />
            ))}
        </Box>
    )
};

export default TaskSkeleton;
