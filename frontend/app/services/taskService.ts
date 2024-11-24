import { Task } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const taskService = {
    async fetchTasks() {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    async createTask(title: string) {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    async updateTask(id: string, updates: Partial<Task>) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    async deleteTask(id: string) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error('Failed to delete task');
    }
}; 