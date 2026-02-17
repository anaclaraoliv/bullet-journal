import {useState, useEffect} from 'react';
import {taskService} from '../../../services/taskService';
import type {Task} from '../../../types';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {arrayMove} from "@dnd-kit/sortable";
import type {DragEndEvent} from "@dnd-kit/core";

export const useMainPage = () => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTasks = async () => {
            if (!currentDate || !currentDate.isValid()) return;

            setLoading(true);

            setAllTasks([]);

            try {
                const dateParam = currentDate.format('YYYY-MM-DD');
                const response = await taskService.getTodayTasks(dateParam);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const orderedTasks = response.data.sort((a, b) => a.position - b.position);
                setAllTasks(orderedTasks.sort((a, b) => a.position - b.position));

            } catch (error) {
                console.error("Erro ao carregar tasks:", error);

            } finally {
                setLoading(false);

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
                date: dayjs(date).format('YYYY-MM-DD'),
                position: allTasks.length + 1,
            };

            const response = await taskService.createTask(newTaskData);
            if (dayjs(date).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
                setAllTasks(prev => [...prev, response.data]);
            }

        } catch (error) {
            console.error("Erro ao criar TaskComponent:", error);
        }
    };

    const changeDate = (change: string) => {
        if (change === 'tomorrow') {
            setCurrentDate(prev => prev.add(1, 'day'));
        } else if (change === 'yesterday') {
            setCurrentDate(prev => prev.subtract(1, 'day'));
        }
    };

    const updateTask = async (
        id: string,
        title: string,
        description: string,
        category: string,
        date: Date,
        status: boolean
    ) => {

        try {
            const updatedTaskData = {
                id,
                title,
                description,
                category,
                status,
                date: dayjs(date).format('YYYY-MM-DD'),
            };

            const response = await taskService.updateTask(updatedTaskData);
            if (dayjs(date).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
                setAllTasks(prev => [...prev, response.data]);
            }

        } catch (error) {
            console.error("Erro ao criar TaskComponent:", error);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over) return;
        if (active.id === over.id) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        setAllTasks((prev) => {
            const oldIndex = prev.findIndex((t) => t.id === activeId);
            const newIndex = prev.findIndex((t) => t.id === overId);

            if (oldIndex < 0 || newIndex < 0) return prev;

            const moved = arrayMove(prev, oldIndex, newIndex);

            const next = moved.map((t, i) => ({
                ...t,
                position: i + 1,
            }));

            const changed = next
                .filter((t, i) => prev[i]?.id !== t.id || prev[i]?.position !== t.position)
                .map((t) => ({id: t.id, position: t.position}));

            if (changed.length > 0) {
                void taskService.reorderTasks(next.map(t => ({id: t.id, position: t.position})));
            }

            return next;
        });
    };

    return {
        incompletedTasks: allTasks.filter(t => !t.status),
        completedTasks: allTasks.filter(t => t.status),
        changeStatus,
        deleteTask,
        createTask,
        updateTask,
        currentDate,
        changeDate,
        setCurrentDate,
        loading,
        handleDragEnd
    };
};