import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/types';

class TaskModel {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string): Task {
        const newTask: Task = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date()
        };
        console.log('newTask', newTask);
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id: string): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        console.log('this.tasks', this.tasks);
        return initialLength !== this.tasks.length;
    }

    updateTask(id: string, updates: Partial<Task>): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updates
        };
        console.log('this.tasks', this.tasks);
        return this.tasks[taskIndex];
    }

    findTaskById(id: string): Task | null {
        console.log('id', id);
        return this.tasks.find(task => task.id === id) || null;
    }
}

export default new TaskModel();