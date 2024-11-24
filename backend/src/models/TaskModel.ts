import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/types';
import { PaginatedResponse, PaginationParams } from '../types/types';

class TaskModel {
    private tasks: Task[] = [];

    getTasks(params: PaginationParams): PaginatedResponse<Task> {
        const { page = 1, limit = 5 } = params;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Get paginated data
        const paginatedTasks = this.tasks
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(startIndex, endIndex);

        return {
            data: paginatedTasks,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(this.tasks.length / limit),
                totalItems: this.tasks.length,
                itemsPerPage: limit
            }
        };
    }

    countDocuments(): number {
        return this.tasks.length;
    }

    createTask(title: string): Task {
        const newTask: Task = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id: string): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return initialLength !== this.tasks.length;
    }

    updateTask(id: string, updates: Partial<Task>): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updates
        };
        return this.tasks[taskIndex];
    }

    findTaskById(id: string): Task | null {
        return this.tasks.find(task => task.id === id) || null;
    }

    // Add search and filter methods
    searchTasks(searchTerm: string): Task[] {
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filterTasks(status: 'all' | 'completed' | 'pending'): Task[] {
        switch (status) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }
}

export default new TaskModel();