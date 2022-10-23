import { useState, useRef } from "react"
import { doPut } from '../lib/todoService'

	// -- Reducer Start --------------------------------
import { useDispatch } from 'react-redux'
import { updateTodo } from '../lib/redux/todoSlice'
// ----------------------------------------------------------------


type EditTodoProps = {
	setShowEditTodo: (showhide: boolean) => void;
	editTodo?: any;
}

const EditTodo = ({
	setShowEditTodo,
	editTodo
}: EditTodoProps) => {

	const dispatch = useDispatch()

	const [heading, setHeading] = useState(editTodo.heading)
	const [description, setDescription] = useState(editTodo.description)
	const [isDone, setIsDone] = useState(editTodo.done)

	const editToDoAction = (e: any) => {
		e.preventDefault()

		let editRec = {
			"_id": editTodo._id,
			"id": editTodo._id,
			"heading": heading,
			"description": description,
			"done": isDone
		}

		console.log("editRec", editRec)

		doPut(editRec);
		dispatch( updateTodo(editRec) )

		setHeading('')
		setDescription('')
		setIsDone('No')

		setShowEditTodo(false)		
	}

	const cancelToDoAction = () => {
		setShowEditTodo(false)
	}

	return (
		<>
			<form>
				<div className="container sm:w-full lg:w-11/12 flex justify-between mx-auto p-3 mb-3 bg-blue-100">
					<div>
						<label htmlFor="todo">Things To Do</label>
						<input name="todo" type="text"
							value={heading}
							onChange={e => setHeading(e.target.value)}
							className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1" />
					</div>
					<div>
					<label htmlFor="details">Details</label>
						<input name="details" type="text"
							value={description}
							onChange={e => setDescription(e.target.value)}
							className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1" />
					</div>
					<div>
						<label htmlFor="done">Completed?</label>
						<select name="done"
							value={isDone}
							onChange={e => setIsDone(e.target.value)}
							className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm w-full p-1">
							<option value="false">No</option>
							<option value="true">Yes</option>
						</select>
					</div>
					<div className="flex flex-col items-center">
						<button onClick={editToDoAction} className="bg-cyan-600 hover:bg-cyan-500 px-5 py-1 mb-1 rounded-md text-stone-50 text-sm">Update</button>
						<button onClick={cancelToDoAction} className="bg-red-500 hover:bg-red-400 px-5 py-1 rounded-md text-stone-50 text-sm">Cancel</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default EditTodo