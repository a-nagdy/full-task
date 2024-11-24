export type FilterType = 'all' | 'pending' | 'completed';
export type SortBy = "date" | "title" | "status";
    
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
}

export interface TaskFiltersProps {
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export interface EditTaskFormProps {
    task: Task;
    onSubmit: (task: Task) => Promise<void>;
    onCancel: () => void;
}

export
    interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface FetchTasksParams {
    page?: number;
    limit?: number;
    search?: string;
    filter?: FilterType;
    sortBy?: SortBy;
}