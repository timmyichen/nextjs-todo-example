import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { TodoItem } from "@/shared/types";

interface TodoState {
  todos: TodoItem[]
}

type TodoAction = {
  type: 'SET_TODOS';
  todos: TodoItem[];
} | {
  type: 'ADD_TODO';
  todo: TodoItem;
} | {
  type: 'EDIT_TODO';
  id: TodoItem['id'];
  changes: Partial<TodoItem>;
} | {
  type: 'DELETE_TODO';
  id: TodoItem['id'];
}

type TodoReducer = React.Reducer<TodoState, TodoAction>
type TodoDispatch = React.Dispatch<TodoAction>

const reducer: TodoReducer = (state, action) => {
  console.log('received action', action)
  const newState = cloneDeep(state)

  switch(action.type) {
    case 'SET_TODOS':
      newState.todos = action.todos
      return newState
    case 'ADD_TODO':
      newState.todos.push(action.todo)
      return newState
    case 'EDIT_TODO': {
      const idx = newState.todos.findIndex(todo => todo.id === action.id)
      newState.todos[idx] = {
        ...newState.todos[idx],
        ...action.changes,
      }
      return newState
    }
    case 'DELETE_TODO': {
      const idx = newState.todos.findIndex(todo => todo.id === action.id)
      newState.todos.splice(idx, 1)
      return newState
    }
    default:
      return newState
  }
}

const defaultState: TodoState = {
  todos: [],
}

const TodoStateContext = React.createContext<TodoState>(defaultState)
const TodoDispatchContext = React.createContext<TodoDispatch>({} as TodoDispatch)

interface Props {
  children: React.ReactNode
}

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer<TodoReducer>(reducer, defaultState)

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  )
}

export const useTodoState = () => React.useContext(TodoStateContext)
export const useTodoDispatch = () => React.useContext(TodoDispatchContext)
