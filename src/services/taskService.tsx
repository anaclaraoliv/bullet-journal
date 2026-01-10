import axios from 'axios';
import type {Task} from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const taskService = {

    getTodayTasks: (currentDate : string) => api.get<Task[]>(
        `/api/tasks/date/${currentDate}`),

    updateStatus: (id: string) => api.patch(
        `/api/tasks/task/updateStatus/${id}`),

    deleteTask: (id: string) => api.delete(`/api/tasks/task/delete/${id}`),

    createTask: (task: { title: string; description: string; category: string; status: boolean; date: string }) => api.post(
        '/api/tasks', task),

};