import { FilterType, SortBy, Task } from "../types/types";

import { useEffect, useMemo, useState } from "react";

import { useCallback } from "react";
import { taskService, TaskServiceError } from "../services/taskService";


export const useTasks = (initialPage = 1, initialLimit = 5) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');
    const [sortBy, setSortBy] = useState<SortBy>('date');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: initialPage,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: initialLimit
    });

    // Sort tasks using useMemo
    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'status':
                    return Number(b.completed) - Number(a.completed);
                default:
                    return 0;
            }
        });
    }, [tasks, sortBy]);

    // Filter tasks
    const filteredAndSortedTasks = useMemo(() => {
        switch (filter) {
            case 'completed':
                return sortedTasks.filter(task => task.completed);
            case 'pending':
                return sortedTasks.filter(task => !task.completed);
            default:
                return sortedTasks;
        }
    }, [sortedTasks, filter]);

    const fetchTasks = useCallback(async (page = initialPage) => {
        setIsLoading(true);
        try {
            const response = await taskService.fetchTasks({
                page,
                limit: initialLimit
            });
            setTasks(response.data);
            setPagination(response.meta);
        } catch (error) {
            setError(error instanceof TaskServiceError ? error.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    }, [initialLimit]);

    // Refetch when filter or sort changes
    useEffect(() => {
        fetchTasks(pagination.currentPage);
    }, [filter, sortBy]);

    const handlePageChange = useCallback((page: number) => {
        fetchTasks(page);
    }, [fetchTasks]);

    return {
        tasks: filteredAndSortedTasks,
        error,
        isLoading,
        pagination,
        filter,
        sortBy,
        fetchTasks,
        setTasks,
        setError,
        setFilter,
        setSortBy,
        onPageChange: handlePageChange
    };
};