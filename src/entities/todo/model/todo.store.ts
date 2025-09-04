import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ITodo } from '@/entities/todo/model/todo'

type TodoStore = {
  todos: ITodo[]
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setTodos: (todos: ITodo[]) => void
  clearActive: () => void
  clearCompleted: () => void
  clearAll: () => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => {
        if (!text.trim()) {
          return
        }
        set((state) => ({
          todos: [
            { id: crypto.randomUUID(), text: text.trim(), isCompleted: false },
            ...state.todos,
          ],
        }))
      },
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
          ),
        })),
      setTodos: (newTodos: ITodo[]) =>
        set(() => ({
          todos: newTodos,
        })),
      clearActive: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.isCompleted),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.isCompleted),
        })),
      clearAll: () =>
        set(() => ({
          todos: [],
        })),
    }),
    {
      name: 'todo-storage',
    },
  ),
)
