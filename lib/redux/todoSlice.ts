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
		}
  },
})

export const { addTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer