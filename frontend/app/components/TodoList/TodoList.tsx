"use client";

import { taskService } from "@/app/services/taskService";
import { Task } from "@/app/types/types";
import { useEffect, useState } from "react";
import { EditTaskForm } from "./EditTaskForm";
import { TaskItem } from "./TaskItem";

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks" + error);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await taskService.createTask(newTaskTitle);
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      setError("Failed to add task" + error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const result = await taskService.updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? result : t)));
      setEditingTask(null);
    } catch (error) {
      setError("Failed to update task" + error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Failed to delete task" + error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddTask} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
          >
            {editingTask?.id === task.id ? (
              <EditTaskForm
                task={editingTask}
                onSubmit={handleUpdateTask}
                onCancel={() => setEditingTask(null)}
              />
            ) : (
              <TaskItem
                task={task}
                onEdit={() => setEditingTask({ ...task })}
                onDelete={handleDeleteTask}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
