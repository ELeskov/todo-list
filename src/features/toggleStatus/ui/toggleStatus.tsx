import { Check, Loader } from 'lucide-react'

import { Button } from '@/shared/ui/components/ui/button'
import type { ITodo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo/model/todo.store'

export function ToggleStatus({ todo }: { todo: ITodo }) {
  const handleToggleTodo = useTodoStore((state) => state.toggleTodo)

  return (
    <Button
      variant="secondary"
      type="button"
      className="bg-transparent !px-1.5"
      onClick={() => handleToggleTodo(todo.id)}
    >
      {todo.isCompleted ? (
        <Check className="text-green-500 grow" size={25} />
      ) : (
        <Loader className="text-yellow-300" />
      )}
    </Button>
  )
}
