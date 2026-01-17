import {useState, useEffect} from 'react';
import {taskService} from '../../../services/taskService';
import type {Task} from '../../../types';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const useMainPage = () => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        const fetchTasks = async () => {

            if (!currentDate || !currentDate.isValid()) return;

            try {
                const dateParam = currentDate.format('YYYY-MM-DD');
                const response = await taskService.getTodayTasks(dateParam);
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
            const newTaskData = {
                title,
                description,
                category,
                status: false,
                date: dayjs(date).format('YYYY-MM-DD')
            };

            const response = await taskService.createTask(newTaskData);
            if (dayjs(date).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
                setAllTasks(prev => [...prev, response.data]);
            }
            // setAllTasks(prev => [...prev, response.data]);

        } catch (error) {
            console.error("Erro ao criar task:", error);
        }
    };

    const changeDate = (change: string) => {
        if (change === 'tomorrow') {
            setCurrentDate(prev => prev.add(1, 'day'));
        } else if (change === 'yesterday') {
            setCurrentDate(prev => prev.subtract(1, 'day'));
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