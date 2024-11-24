import { Request, Response } from 'express';
import TaskModel from '../models/TaskModel';

export class TaskController {
  public getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const search = req.query.search as string;
      const filter = req.query.filter as 'all' | 'completed' | 'pending';
      const sortBy = req.query.sortBy as string;

      let tasks = TaskModel.getTasks({ page, limit });

      // Apply search if provided
      if (search) {
        tasks.data = TaskModel.searchTasks(search);
      }

      // Apply filter if provided
      if (filter && filter !== 'all') {
        tasks.data = TaskModel.filterTasks(filter);
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch tasks' 
      });
    }
  };

  public createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title } = req.body;
      
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }

      const newTask = TaskModel.createTask(title);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  };

  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = TaskModel.deleteTask(id);

      if (!deleted) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };

  public updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      
      const updatedTask = TaskModel.updateTask(id, { title, completed });

      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  };
}

export default new TaskController();