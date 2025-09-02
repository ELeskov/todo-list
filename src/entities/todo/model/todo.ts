import type { UUID } from 'crypto'

export interface ITodo {
  id: UUID
  text: string
  isCompleted: boolean
}
