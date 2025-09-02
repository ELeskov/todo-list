import { useState } from 'react'

import { Input } from '@/shared/ui/components/ui/input'
import { AddTodo } from '@/features/addTodo'
import { useTodoStore } from '@/entities/todo/model/todo.store'

export function AddTodoBar() {
  const [value, setValue] = useState('')
  const handleAddTodo = useTodoStore((state) => state.addTodo)

  const addTodoAndResetInput = () => {
    handleAddTodo(value)
    setValue('')
  }

  return (
    <div className="flex items-center gap-x-2.5">
      <Input
        placeholder="Прочитать книгу?"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (value.trim() && e.key === 'Enter') {
            addTodoAndResetInput()
          }
        }}
      />

      <AddTodo
        disabled={!value.trim()}
        text={value}
        onClick={addTodoAndResetInput}
      />
    </div>
  )
}
