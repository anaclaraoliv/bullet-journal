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

    createTask: (task: { title: string, description: string,
                        category: string, status: boolean,
        date: string, position: number }) => api.post(
        '/api/tasks', task),

    updateTask: (task: {id: string, status: boolean,
        description: string, category: string,
        date: string, title: string}) => api.patch(`/api/tasks/task/updateTask`, task),

    reorderTasks: (payload: Array<{ id: string; position: number }>)  =>
        api.patch('/api/tasks/updateOrder', payload),

};