import { AddTodoBar } from '@/widgets/addTodoBar'
import { TodoCard } from '@/widgets/todoCard'

export function Home() {
  return (
    <main className="flex justify-center items-center text-center h-dvh px-3.5">
      <div className="flex flex-col gap-y-8 max-md:gap-y-3">
        <h1 className="tracking-[15px]">todos.</h1>
        <div data-container="todo" className="flex flex-col gap-5 self-center">
          <AddTodoBar />
          <TodoCard />
        </div>
      </div>
    </main>
  )
}
