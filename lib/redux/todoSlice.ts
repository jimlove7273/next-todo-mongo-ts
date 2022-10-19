import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface toDoState {
	value: Todo[]
}

interface Todo {
	_id?: string;
  heading: string;
	description: string;
	done: string
}

// Define the initial state using that type
const initialState: toDoState = {
  value: []
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addInitialTodo: (state, action: PayloadAction<Todo>) => {
      state.value.push(action.payload)
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { addInitialTodo } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.todos.value

export default todoSlice.reducer