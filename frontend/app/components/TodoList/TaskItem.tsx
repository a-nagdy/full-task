import { Task } from "@/app/types/types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  const formatDate = (date: string | Date) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    return dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
        <span className="text-sm text-gray-500">
          Created: {formatDate(task.createdAt)}
        </span>
        <span className={`text-sm ${task.completed ? "text-green-500" : "text-blue-500"}`}>
          Status: {task.completed ? "Completed" : "Pending"}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; 