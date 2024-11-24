"use client";

import { useTasks } from "@/app/hooks/useTasks";
import { taskService } from "@/app/services/taskService";
import { FilterType, SortBy, Task } from "@/app/types/types";
import { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Pagination } from "../common/Pagination";
import { EditTaskForm } from "./EditTaskForm";
import { TaskFilters } from "./TaskFilters";
import { TaskItem } from "./TaskItem";

export default function TodoList() {
  const {
    tasks,
    error,
    isLoading,
    fetchTasks,
    setTasks,
    setError,
    pagination,
    onPageChange,
    filter,
    sortBy,
    setFilter,
    setSortBy
  } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const tempTask = {
      id: tempId,
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prev) => [...prev, tempTask]);
    setNewTaskTitle("");

    try {
      const newTask = await taskService.createTask(newTaskTitle);
      setTasks((prev) => prev.map((t) => (t.id === tempId ? newTask : t)));
    } catch (error) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
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

  const handleFilter = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleSort = (newSort: SortBy) => {
    setSortBy(newSort);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <TaskFilters filter={filter} onFilterChange={handleFilter} />

      <div className="mb-4">
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as SortBy)}
          className="p-2 border rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

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

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
