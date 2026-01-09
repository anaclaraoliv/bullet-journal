import {useState, useEffect} from 'react';
import {taskService} from '../../../services/taskService';
import type {Task} from '../../../types';

export const useMainPage = () => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskService.getTodayTasks();
                setAllTasks(response.data);
            } catch (error) {
                console.error("Erro ao carregar tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const markAsComplete = async (id: string) => {
        await taskService.updateStatus(id, true);
        setAllTasks(prev => prev.map(t => t.id === id ? {...t, status: true} : t));
    };

    const markAsIncomplete = async (id: string) => {
        await taskService.updateStatus(id, false);
        setAllTasks(prev => prev.map(t => t.id === id ? {...t, status: false} : t));
    };

    const deleteTask = async (id: string) => {
        await taskService.deleteTask(id);
        setAllTasks(prev => prev.filter(t => t.id !== id));
    };

    const createTask = async (title: string, description: string, category: string) => {
        try {
            const newTaskData = {
                title,
                description,
                category,
                status: false,
                date: new Date().toISOString()
            };

            const response = await taskService.createTask(newTaskData);
            setAllTasks(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Erro ao criar task:", error);
        }
    };

    return {
        incompletedTasks: allTasks.filter(t => !t.status),
        completedTasks: allTasks.filter(t => t.status),
        markAsComplete,
        markAsIncomplete,
        deleteTask,
        createTask
    };
};