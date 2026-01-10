import {useState, useEffect} from 'react';
import {taskService} from '../../../services/taskService';
import type {Task} from '../../../types';

export const useMainPage = () => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const getCurrentDate = ():Date => { return new Date(); };

    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const response = await taskService
                    .getTodayTasks(`${year}-${month}-${day}`);
                setAllTasks(response.data);

            } catch (error) {
                console.error("Erro ao carregar tasks:", error);
            }
        };

         void fetchTasks();

    }, [currentDate]);

    const changeStatus = async (id: string) => {
        await taskService.updateStatus(id);
        setAllTasks(prev => prev.map(t => t.id === id ? {...t, status: !t.status} : t));
    }

    const deleteTask = async (id: string) => {
        await taskService.deleteTask(id);
        setAllTasks(prev => prev.filter(t => t.id !== id));
    };

    const createTask = async (title: string, description: string, category: string, date: Date) => {
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const newTaskData = {
                title,
                description,
                category,
                status: false,
                date: `${year}-${month}-${day}`
            };

            const response = await taskService.createTask(newTaskData);
            setAllTasks(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Erro ao criar task:", error);
        }
    };

    const changeDate = (change: string) => {
        const newDate = new Date(currentDate);
        if (change === 'tomorrow') {
            newDate.setDate(newDate.getDate() + 1);
            setCurrentDate(newDate);
        } else if (change === 'yesterday') {
            newDate.setDate(newDate.getDate() - 1);
            setCurrentDate(newDate);
        }
    };

    return {
        incompletedTasks: allTasks.filter(t => !t.status),
        completedTasks: allTasks.filter(t => t.status),
        changeStatus,
        deleteTask,
        createTask,
        currentDate,
        changeDate,
        setCurrentDate
    };
};