import { useState } from 'react'
import { Check, List, Loader } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

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
  const countCompletedTodos = useRemainingCount()

  const handleClearAll = useTodoStore((state) => state.clearAll)
  const handleClearCompleted = useTodoStore((state) => state.clearCompleted)

  const [currentTab, setCurrentTab] = useState<TabType>('all')

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
              <AnimatePresence mode="popLayout">
                {useTodosByType(currentTab).map((todo, index) => (
                  <motion.div
                    key={todo.id}
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
                  >
                    <Todo todo={todo} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </TabsContent>
        </div>
        <CardFooter className="flex gap-x-2.5 justify-between border-t border-t-white/10 !pt-3">
          <Button
            type="button"
            className="grow"
            variant="secondary"
            onClick={handleClearAll}
          >
            Clear <List className="text-white" />
          </Button>
          <Button
            type="button"
            className="grow"
            variant="secondary"
            onClick={handleClearCompleted}
          >
            Clear <Check className="text-green-500" />
          </Button>
        </CardFooter>
      </Card>

      <TabsList aria-label="Todo filters" aria-orientation="horizontal">
        <TabsTrigger role="tab" tabIndex={0} value="all">
          All
          <List className="text-white" />
        </TabsTrigger>
        <TabsTrigger role="tab" tabIndex={0} value="active">
          Active <Loader className="text-yellow-300" />
        </TabsTrigger>
        <TabsTrigger role="tab" tabIndex={0} value="completed">
          Completed
          <Check className="text-green-500" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
