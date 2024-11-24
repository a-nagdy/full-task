// Add constants file
export const TASK_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
} as const;

export const ERROR_MESSAGES = {
    FETCH_ERROR: 'Failed to fetch tasks',
    CREATE_ERROR: 'Failed to create task',
    UPDATE_ERROR: 'Failed to update task',
    DELETE_ERROR: 'Failed to delete task',
} as const;