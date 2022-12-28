import React from 'react'
import axios from 'axios'
import TodoItem from './TodoItem'
import { useTodoDispatch, useTodoState } from './todoStore'

const TodoList: React.FC = () => {
  const { todos } = useTodoState()
  const dispatch = useTodoDispatch()

  const fetchData = async () => {
    const res = await axios.get('/todos/')
    dispatch({
      type: 'SET_TODOS',
      todos: res.data,
    })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} item={todo} />)}
    </div>
  )
}

export default TodoList
