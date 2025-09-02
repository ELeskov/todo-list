import { useShallow } from 'zustand/react/shallow'

import { useTodoStore } from './todo.store'

export const useTodos = () => useTodoStore((state) => state.todos)

export const useActiveTodos = () =>
  useTodoStore((state) => state.todos.filter((todo) => !todo.isCompleted))

export const useCompletedTodos = () =>
  useTodoStore((state) => state.todos.filter((todo) => todo.isCompleted))

export const useRemainingCount = () =>
  useTodoStore(
    (state) => state.todos.filter((todo) => !todo.isCompleted).length,
  )

export const useTodosByType = (type: 'all' | 'active' | 'completed') =>
  useTodoStore(
    useShallow((state) => {
      if (type === 'active') {
        return state.todos.filter((t) => !t.isCompleted)
      }
      if (type === 'completed') {
        return state.todos.filter((t) => t.isCompleted)
      }
      return state.todos
    }),
  )
