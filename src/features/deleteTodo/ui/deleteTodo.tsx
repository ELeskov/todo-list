import { Trash } from 'lucide-react'

import { Button } from '@/shared/ui/components/ui/button'
import type { ITodo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo/model/todo.store'

export function DeleteTodo({ todo }: { todo: ITodo }) {
  const handleDeleteTodo = useTodoStore((state) => state.deleteTodo)

  return (
    <Button
      variant="secondary"
      className="bg-transparent !px-1.5 hover:text-rose-500"
      onClick={() => handleDeleteTodo(todo.id)}
    >
      <Trash />
    </Button>
  )
}
