import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toDoState, Todo } from './interfaces'

// Define the initial state using that type
const initialState: toDoState = {
  value: []
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: toDoState, action: PayloadAction<Todo>) => {
      state.value.push(action.payload)
    },

		deleteTodo: (state: toDoState, action: PayloadAction<Todo>) => {
			return {
				...state,
				value: state.value.filter((item, index) => item._id !== action.payload)
			}
		},

    toggleDone: (state: toDoState, action: PayloadAction<Todo>) => {
      return {
        ...state,
        value: state.value.map( todo => {
          if ( todo._id === action.payload._id ) {
            return {
              ...todo,
              done: action.payload.done
            }
          }
          return todo
        })
      }
    },

    updateTodo: (state: toDoState, action: PayloadAction<Todo>) => {
      return {
        ...state,
        value: state.value.map( todo => {
          if ( todo._id === action.payload._id ) {
            return {
              ...todo,
              heading: action.payload.heading,
              description: action.payload.description,
              done: action.payload.done
            }
          }
          return todo
        })
      }
    }
  }
})

export const { addTodo, deleteTodo, toggleDone, updateTodo } = todoSlice.actions
export default todoSlice.reducer