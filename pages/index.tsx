import React from 'react'
import { Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { TodoContextProvider } from '@/client/todoStore'
import TodoList from '@/client/TodoList'
import AddTodo from '@/client/AddTodo'

const Index: React.FC = () => {
  return (
    <TodoContextProvider>
      <Header as="h1">Todo App with NextJS + Express</Header>
      <AddTodo />
      <TodoList />
    </TodoContextProvider>
  )
}

export default Index;
