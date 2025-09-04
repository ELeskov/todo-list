import { Trash } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/components/ui/button'
import type { ITodo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo/model/todo.store'

export function DeleteTodo({
  todo,
  className,
}: {
  todo: ITodo
  className?: string
}) {
  const handleDeleteTodo = useTodoStore((state) => state.deleteTodo)

  return (
    <Button
      variant="secondary"
      className={cn(
        'bg-transparent hover:text-rose-500 focus:text-rose-500',
        className,
      )}
      onClick={() => handleDeleteTodo(todo.id)}
    >
      <Trash />
    </Button>
  )
}
