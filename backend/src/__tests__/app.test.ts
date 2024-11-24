import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import TaskModel from '../models/TaskModel';

describe('Tasks API', () => {
  // Clear tasks before each test
  beforeEach(() => {
    // Reset the tasks array
    const taskModel = TaskModel as any;
    taskModel.tasks = [];
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test task' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test task');
    expect(response.body.completed).toBe(false);
  });

  it('should not create a task without a title', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Title is required');
  });

  it('should get all tasks', async () => {
    // Create a test task first
    await request(app)
      .post('/tasks')
      .send({ title: 'Test task' });

    const response = await request(app).get('/tasks');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test task');
  });

  it('should delete an existing task', async () => {
    // Create a task first
    const createResponse = await request(app)
      .post('/tasks')
      .send({ title: 'Task to delete' });

    const taskId = createResponse.body.id;

    // Delete the task
    const deleteResponse = await request(app)
      .delete(`/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(204);

    // Verify task is deleted
    const getAllResponse = await request(app).get('/tasks');
    expect(getAllResponse.body.length).toBe(0);
  });

  it('should update an existing task', async () => {
    // Create a task first
    const createResponse = await request(app)
      .post('/tasks')
      .send({ title: 'Task to update' });

    const taskId = createResponse.body.id;

    // Update the task
    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ 
        title: 'Updated task',
        completed: true 
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated task');
    expect(updateResponse.body.completed).toBe(true);
  });

  it('should return 404 when updating non-existent task', async () => {
    const response = await request(app)
      .put('/tasks/non-existent-id')
      .send({ 
        title: 'Updated task',
        completed: true 
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Task not found');
  });

  it('should return 404 when deleting non-existent task', async () => {
    const response = await request(app)
      .delete('/tasks/non-existent-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Task not found');
  });
}); 