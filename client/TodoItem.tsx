import axios from 'axios'
import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import { TodoItem } from '@/shared/types'
import { useTodoDispatch } from './todoStore'

interface Props {
  item: TodoItem
}

const TodoItem: React.FC<Props> = ({ item }) => {
  const [loading, setLoading] = React.useState(false)
  const dispatch = useTodoDispatch()

  const onToggle = async () => {
    setLoading(true)
    try {
      const res = await axios.put(`/todos/${item.id}`, { completed: !item.completed })
      dispatch({
        type: 'EDIT_TODO',
        id: item.id,
        changes: res.data,
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`/todos/${item.id}`)
      dispatch({
        type: 'DELETE_TODO',
        id: item.id,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Checkbox
        checked={item.completed}
        label={item.task}
        onClick={onToggle}
        disabled={loading}
      />
      <Button
        icon="trash"
        onClick={onDelete}
        disabled={loading}
      />
    </div>
  )
}

export default TodoItem
