import { useState } from 'react';
import { TASKS as initialTasks } from "../constants.ts";
import type { Task } from "../../../types";

export const useMainPage = () => {
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);

    const incompletedTasks = allTasks.filter(task => !task.status);
    const completedTasks = allTasks.filter(task => task.status);

    const markAsComplete = (id: string) => {
        setAllTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: true } : task
        ));
    };

    const markAsIncomplete = (id: string) => {
        setAllTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: false } : task
        ));
    };

    const deleteTask = (id: string) => {
        setAllTasks(prev => prev.filter(task => task.id !== id));
    };

    return {
        allTasks,
        incompletedTasks,
        completedTasks,
        markAsComplete,
        markAsIncomplete,
        deleteTask
    };
};