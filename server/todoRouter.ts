import { TodoItem } from '@/shared/types'
import { Router } from 'express'

const router = Router()

const todos: TodoItem[] = [
  {
    id: getNewId(),
    task: 'Do the thing',
    completed: false,
  },
  {
    id: getNewId(),
    task: 'Do another thing',
    completed: true,
  }
]

function getNewId() {
  return String(Math.random()).replace('.', '')
}

router.get('/', (req, res) => {
  res.json(todos)
})

router.post('/', (req, res) => {
  const { task } = req.body;

  const item: TodoItem = {
    id: getNewId(),
    task,
    completed: false,
  }

  todos.push(item)

  res.json(item)
})

router.put('/:taskId', (req, res) => {
  const { completed } = req.body
  const { taskId } = req.params

  const idx = todos.findIndex(item => item.id === taskId)

  if (idx < 0) {
    return res.status(404).json({ message: 'Task not found' })
  }

  todos[idx].completed = completed

  res.json(todos[idx])
})

router.delete('/:taskId', (req, res) => {
  const { taskId } = req.params
  const idx = todos.findIndex(item => item.id === taskId)

  if (idx < 0) {
    return res.status(404).json({ message: 'Task not found' })
  }

  todos.splice(idx, 1)

  res.send()
})

export default router
