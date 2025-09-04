import { useMemo, useState } from 'react'
import { Check, List, Trash } from 'lucide-react'
import { AnimatePresence, Reorder } from 'motion/react'

import { AnimateLoaderIcon } from '@/shared/ui/animateLoaderIcon'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/components/ui/tabs'
import { Todo, useRemainingCount, useTodosByType } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo/model/todo.store'
import type { TabType } from '@/widgets/todoCard'

export function TodoCard() {
  const [currentTab, setCurrentTab] = useState<TabType>('all')

  const filteredTodos = useTodosByType(currentTab)

  const countCompletedTodos = useRemainingCount()
  const { clearAll, clearCompleted, clearActive, setTodos } = useTodoStore(
    (state) => state,
  )

  const handlerClearActiveTab: Record<TabType, () => void> = useMemo(
    () => ({
      all: clearAll,
      active: clearActive,
      completed: clearCompleted,
    }),
    [clearAll, clearActive, clearCompleted],
  )

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => setCurrentTab(value as TabType)}
    >
      <Card className="py-3 gap-3 overflow-x-hidden">
        <CardHeader className="flex items-center justify-end">
          <span className="text-white/50">
            {countCompletedTodos} todos left
          </span>
        </CardHeader>
        <div className="min-h-[250px] relative">
          <TabsContent role="tabpanel" value={currentTab} forceMount>
            <CardContent className="grid gap-4 p-2 overflow-y-auto overflow-x-hidden max-h-80 min-h-[55px] h-full">
              <Reorder.Group
                className="grid gap-4"
                axis="y"
                values={filteredTodos}
                onReorder={setTodos}
              >
                <AnimatePresence mode="popLayout">
                  {filteredTodos.map((todo, index) => (
                    <Reorder.Item
                      key={todo.id}
                      value={todo}
                      layout
                      initial={{ opacity: 0, x: 20, height: 0 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        height: 'auto',
                        transition: {
                          opacity: { duration: 0.3 },
                          x: { duration: 0.4 },
                          height: { duration: 0.3 },
                          delay: index * 0.05,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -100,
                        transition: {
                          type: 'spring',
                          damping: 20,
                          stiffness: 250,
                          delay: index * 0.05,
                        },
                      }}
                      transition={{ duration: 0.2 }}
                      whileDrag={{
                        zIndex: 10,
                      }}
                    >
                      <Todo todo={todo} />
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </CardContent>
          </TabsContent>
        </div>
        <CardFooter className="flex gap-x-2.5 justify-between !pt-3">
          <Button
            type="button"
            className="grow !text-lg"
            variant="outline"
            onClick={handlerClearActiveTab[currentTab]}
            aria-label={`Clear ${currentTab} todos`}
          >
            <Trash />
          </Button>
        </CardFooter>
      </Card>

      <TabsList aria-label="Todo filters" aria-orientation="horizontal">
        <TabsTrigger role="tab" tabIndex={0} value="all">
          All
          <List className="text-white" />
        </TabsTrigger>
        <TabsTrigger role="tab" tabIndex={0} value="active">
          Active <AnimateLoaderIcon />
        </TabsTrigger>
        <TabsTrigger role="tab" tabIndex={0} value="completed">
          Completed
          <Check className="text-green-500" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
