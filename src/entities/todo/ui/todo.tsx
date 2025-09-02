import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/shared/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { Label } from '@/shared/ui/components/ui/label'
import { DeleteTodo } from '@/features/deleteTodo'
import { ToggleStatus } from '@/features/toggleStatus'
import type { ITodo } from '@/entities/todo/model/todo'

export function Todo({ todo }: { todo: ITodo }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25 }}
        className="flex gap-3 items-center px-2.5 py-2 border rounded-lg"
      >
        <ToggleStatus todo={todo} />
        <Dialog>
          <DialogTrigger asChild>
            <Label
              className={cn(
                'line-clamp-1 break-all w-full h-9 flex items-center',
                todo.isCompleted ? 'line-through' : '',
              )}
            >
              {todo.text}
            </Label>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">{todo.text}</div>
            </div>
          </DialogContent>
        </Dialog>

        <DeleteTodo todo={todo} />
      </motion.div>
    </AnimatePresence>
  )
}
