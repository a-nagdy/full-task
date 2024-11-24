export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: 'all' | 'completed' | 'pending';
  sortBy?: 'date' | 'title' | 'status';
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