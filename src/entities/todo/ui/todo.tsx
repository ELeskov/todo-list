import { Ellipsis } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/components/ui/button'
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
        <Dialog>
          <ToggleStatus todo={todo} />
          <Label
            tabIndex={0}
            className={cn(
              'line-clamp-1 break-all w-full h-9 flex items-center transition p-2 rounded-sm',
              todo.isCompleted ? 'line-through' : '',
            )}
          >
            {todo.text}
          </Label>
          <div className="flex justify-between gap-x-1">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 hover:text-blue-300 focus:text-blue-300"
              >
                <Ellipsis />
              </Button>
            </DialogTrigger>
            <DeleteTodo todo={todo} className="flex-1" />
          </div>

          <DialogContent className="sm:max-w-md">
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">{todo.text}</div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  )
}
