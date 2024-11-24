import request from 'supertest';
import app from '../app';
import { describe, it, expect } from '@jest/globals';

describe('Task API', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
    expect(response.body.completed).toBe(false);
  });

  it('should get all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a task', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/tasks')
      .send({ title: 'Task to delete' });
    
    const taskId = createResponse.body.id;

    // Then delete it
    const deleteResponse = await request(app)
      .delete(`/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(204);
  });

  it('should update a task', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/tasks')
      .send({ title: 'Task to update' });
    
    const taskId = createResponse.body.id;

    // Then update it
    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ title: 'Updated task', completed: true });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated task');
    expect(updateResponse.body.completed).toBe(true);
  });
}); 