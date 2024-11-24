import { TaskFiltersProps } from "@/app/types/types";

export const TaskFilters = ({ filter, onFilterChange }: TaskFiltersProps) => {
  return (
    <div className="mb-4 flex gap-2">
      <button
        className={`px-3 py-1 rounded ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded ${
          filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
      <button
        className={`px-3 py-1 rounded ${
          filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};
