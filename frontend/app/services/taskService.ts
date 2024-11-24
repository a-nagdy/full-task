import { ERROR_MESSAGES } from "../constants";
import { FetchTasksParams, Task } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class TaskServiceError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'TaskServiceError';
    }
}



export const taskService = {
    async fetchTasks(params: FetchTasksParams = {}) {
        const queryParams = new URLSearchParams({
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            ...(params.search && { search: params.search }),
            ...(params.filter && { filter: params.filter }),
            ...(params.sortBy && { sortBy: params.sortBy })
        });

        try {
            const response = await fetch(`${API_URL}/tasks?${queryParams}`);
            if (!response.ok) {
                throw new TaskServiceError(
                    await response.text(),
                    response.status
                );
            }
            return response.json();
        } catch (error) {
            throw error instanceof TaskServiceError
                ? error
                : new TaskServiceError(ERROR_MESSAGES.FETCH_ERROR);
        }
    },

    async createTask(title: string) {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) throw new TaskServiceError(ERROR_MESSAGES.CREATE_ERROR);
        return response.json();
    },

    async updateTask(id: string, updates: Partial<Task>) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new TaskServiceError(ERROR_MESSAGES.UPDATE_ERROR);
        return response.json();
    },

    async deleteTask(id: string) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new TaskServiceError(ERROR_MESSAGES.DELETE_ERROR);
    }
}; 