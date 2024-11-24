import { EditTaskFormProps } from "@/app/types/types";
import { useState } from "react";

export const EditTaskForm = ({
  task,
  onSubmit,
  onCancel,
}: EditTaskFormProps) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(editedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          className="flex-1 p-2 border rounded"
          autoFocus
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editedTask.completed}
            onChange={(e) =>
              setEditedTask({ ...editedTask, completed: e.target.checked })
            }
            className="h-5 w-5"
          />
          <span>Mark as completed</span>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
