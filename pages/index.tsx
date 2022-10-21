import { useState, useEffect } from 'react'
import type { NextPage } from "next"
import { Todo, toDoState } from '../lib/redux/interfaces'
import { doDelete } from '../lib/todoService'
import useSWR from 'swr'

import AddTodo from "../components/addTodo"

// -- Reducer Start --------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo } from '../lib/redux/todoSlice'
import { RootState } from '../lib/redux/store'
// ----------------------------------------------------------------

const Home: NextPage = () => {

  const dispatch = useDispatch()
  const todoData = useSelector((state: RootState) => state.todos.value)

  const [showAddTodo, setShowAddTodo] = useState(false)

  const address = `/api/todos`;
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(address, fetcher);

  const deleteTodoAction = (todoId: string) => {
    if (todoId === undefined) return
    if ( confirm("Do you want to delete ID:"+todoId) ) {
      doDelete(todoId)
      dispatch( deleteTodo(todoId) )
    }
  }

  useEffect(() => {
    if (data?.todos && todoData.length === 0 ) {
      data.todos && data.todos.map( (todo: toDoState) => {
        dispatch( addTodo(todo) )
      })
    }
  }, [data, dispatch])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>


  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold text-gray-600 text-center">
          My To Do List
        </h1>
      </div>

      {
        showAddTodo
        ? <AddTodo
            setShowAddTodo={setShowAddTodo}
          />
        : <div className="container w-11/12 mx-auto p-1 flex">
            <h3 className="bg-slate-600 text-cyan-50 px-5 py-2 cursor-pointer hover:bg-slate-500"
              onClick={()=>setShowAddTodo(true)}
            >
            Add New Todo
            </h3>
          </div>
      }

      <table className="border border-collapse table-auto sm:w-full lg:w-11/12 text-sm mx-auto">
        <thead className="border-b bg-sky-500">
          <tr>
            <td className="px-2 font-bold lg:text-lg sm:text-sm">ToDo</td>
            <td className="font-bold lg:text-lg sm:text-sm">Description</td>
            <td className="text-center font-bold lg:text-lg sm:text-sm">Completed</td>
            <td className="text-center font-bold text-sm">Toggle<br />Complete</td>
            <td className="text-center font-bold text-sm">Delete</td>
          </tr>
        </thead>
        <tbody>
          {
            todoData && todoData.map((todo: Todo) => {
                return (<tr key={todo._id} className="border-b">
                  <td className="px-2 py-1">{todo.heading}</td>
                  <td>{todo.description}</td>
                  <td className="text-center">{todo.done}</td>
                  <td className="text-center">✍</td>
                  <td onClick={() => deleteTodoAction(todo._id)} className="cursor-pointer text-center">✕</td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default Home;


