import { useRef } from "react"
import { doAdd } from '../lib/todoService'

	// -- Reducer Start --------------------------------
import { useDispatch } from 'react-redux'
import { addTodo } from '../lib/redux/todoSlice'
// ----------------------------------------------------------------

type AddTodoProps = {
	setShowAddTodo: (showhide: boolean) => void;
}

const AddTodo = ({setShowAddTodo}: AddTodoProps) => {

	const todo = useRef()
	const details = useRef()
	const done = useRef()

	const dispatch = useDispatch()


	const addToDoAction = (e: any) => {
		e.preventDefault()

		let addRec = {
			"heading": todo?.current?.value,
			"description": details?.current?.value,
			"done": done?.current?.value
		}

		doAdd(addRec);

		dispatch( addTodo(addRec) )
		todo.current.value = ''
		details.current.value = ''
		done.current.value = ''

		setShowAddTodo(false)
		
	}

	return (
		<>
			<form>
				<div className="container sm:w-full lg:w-11/12 flex justify-between mx-auto p-3 mb-3 bg-blue-100">
					<div>
						<label htmlFor="todo">Things To Do</label>
						<input name="todo" ref={todo} type="text" placeholder="To Do" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1" />
					</div>
					<div>
					<label htmlFor="details">Details</label>
						<input name="details" ref={details} type="text" placeholder="Details" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1" />
					</div>
					<div>
						<label htmlFor="done">Completed?</label>
						<select name="done" ref={done} className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1">
							<option value="false">No</option>
							<option value="true">Yes</option>
						</select>
					</div>
					<div className="flex items-center">
						<button onClick={addToDoAction} className="bg-cyan-600 px-5 py-2 rounded-md text-stone-50">Submit</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddTodo