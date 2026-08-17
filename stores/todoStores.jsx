import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStores";
import { apiRequest } from "@/lib/api";
 
export const useTodoStores = create(
    persist(
        (set) => ({
            todos: [],
            isLoading: false,
            error: null,

            getTodos: async () => {
                set({ isLoading: true, error: null });
                try {
                    const res = await apiRequest({
                        method: "get",
                        url: "/api/todos",
                        data: {},
                        requiresAuth: true,
                    });
                    set({
                        todos: res.data.todos,
                        isLoading: false,
                    });
                } catch (err) {
                     
                    set({
                        error: err.message,
                        isLoading: false,
                    });
                }
            },

            createTodos: async ({ title, description, priority, completed }) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await apiRequest({
                        method: "post",
                        url: "/api/todos",
                        data: {
                            title, description, priority, completed
                        },
                        requiresAuth: true,
                    });
                     
                    const newTodo = res.data.todos[0];
                    set((state) => ({
                        todos: [...state.todos, newTodo],
                        isLoading: false,
                    }));
                } catch (err) {
                    
                    set({
                        error: err.message,
                        isLoading: false,
                    });
                }
            },

            updateTodos: async ({ title, description, priority, completed, id }) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await apiRequest({
                        method: "put",
                        url: `/api/todos/${id}`,
                        data: {
                            title, description, priority, completed,
                        },
                        requiresAuth: true,
                    });
                    
                    const updatedTodo = res.data.todo[0];
                    set((state) => ({
                        todos: state.todos.map((todo) =>
                            todo._id === id ? updatedTodo : todo


                        ),
                        isLoading: false,
                    }));
                } catch (err) {
                     
                    set({
                        error: err.message,
                        isLoading: false,
                    });
                }
            },

            deleteTodos: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    await apiRequest({
                        method: "delete",
                        url: `/api/todos/${id}`,
                        data: {},
                        requiresAuth: true,
                    });
                    set((state) => ({
                        todos: state.todos.filter((todo) => todo._id !== id),
                        isLoading: false,
                    }));
                } catch (err) {
                    
                    set({
                        error: err.message,
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: "todo-storage", // localStorage key used by persist
            partialize: (state) => ({ todos: state.todos }), // don't persist loading/error
        }
    )
);