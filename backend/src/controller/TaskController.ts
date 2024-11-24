import { Request, Response } from 'express';
import TaskModel from '../models/TaskModel';

export class TaskController {
  public getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = TaskModel.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
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