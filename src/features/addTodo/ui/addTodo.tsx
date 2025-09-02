import { Plus } from 'lucide-react'

import { Button } from '@/shared/ui/components/ui/button'

export function AddTodo({
  ...props
}: { text: string } & React.ComponentProps<typeof Button>) {
  return (
    <Button aria-label="Add todo" type="button" className="!px-5" {...props}>
      <Plus />
    </Button>
  )
}
