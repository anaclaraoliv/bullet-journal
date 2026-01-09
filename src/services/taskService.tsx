import axios from 'axios';
import type {Task} from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const taskService = {

    getTodayTasks: () => api.get<Task[]>(
        `/api/tasks/date/${getCurrentDate()}`),

    updateStatus: (id: string, status: boolean) => api.patch(
        `/api/tasks/${id}`, { status }),

    deleteTask: (id: string) => api.delete(`/api/tasks/${id}`),

    createTask: (task: { title: string; description: string; category: string; status: boolean; date: string }) => api.post('/api/tasks', task),
};