import React from 'react'
import axios from 'axios'
import { Button, Input } from 'semantic-ui-react'
import { useTodoDispatch } from './todoStore'

const AddTodo: React.FC = () => {
  const dispatch = useTodoDispatch()

  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState('')

  const onSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/todos/', { task: input})
      dispatch({
        type: 'ADD_TODO',
        todo: res.data,
      })
      setInput('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Input
        value={input}
        disabled={loading}
        onChange={e => setInput(e.currentTarget.value)}
      />
      <Button
        primary
        onClick={onSubmit}
        disabled={loading}
      >
        Add
      </Button>
    </div>
  )
}

export default AddTodo
