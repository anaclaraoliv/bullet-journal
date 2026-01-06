export interface Task {
    id: string;
    title: string;
    description?: string;
    status: boolean;
    date: string;
    category: string;
}