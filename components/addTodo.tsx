import { useRef } from "react"
import type { NextPage } from "next";
import { useRouter } from "next/router";

const AddTodo: NextPage = () => {

	const todo = useRef()
	const details = useRef()
	const done = useRef()
	const router = useRouter();

	const addToDoAction = (e: any) => {
		e.preventDefault()

		let addRec = {
			"heading": todo?.current?.value,
			"description": details?.current?.value,
			"done": done?.current?.value
		}

		fetch('/api/todos', {
			method: "POST",
			body: JSON.stringify(addRec),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		})
		.then(response => response.json()) 
		.then(json => console.log(json))
		.catch(err => console.log(err));

		router.push("/");
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