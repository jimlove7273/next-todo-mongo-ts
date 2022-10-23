import { useState, useEffect } from 'react'
import type { NextPage } from "next"
import { Todo, toDoState } from '../lib/redux/interfaces'
import { doPut, doDelete } from '../lib/todoService'
import useSWR from 'swr'
import { FiFilePlus, FiToggleRight, FiEdit, FiDelete } from "react-icons/fi";

import AddTodo from "../components/addTodo"
import EditTodo from '../components/editTodo'

// -- Reducer Start --------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, toggleDone } from '../lib/redux/todoSlice'
import { RootState } from '../lib/redux/store'
// ----------------------------------------------------------------

const Home: NextPage = () => {

  const dispatch = useDispatch()
  let todoData = useSelector((state: RootState) => state.todos.value)

  const [showAddTodo, setShowAddTodo] = useState<boolean>(false)
  const [editTodo, seteditTodo] = useState()
  const [showEditTodo, setShowEditTodo] = useState<boolean>(false)

  const address = `/api/todos`;
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(address, fetcher);

  const toggleComplete = (todo: Todo) => {
    let truefalse = todo.done==="true"?"false":"true"
    let PutData = {...todo, "id": todo._id, "done": truefalse}
    doPut(PutData)
    dispatch( toggleDone(PutData) )
  }

  const editTodoAction = (todo: Todo) => {
    if ( todo ) {
      seteditTodo(todo)
      setShowEditTodo(true)
    }
  }

  const deleteTodoAction = (todoId: string) => {
    if (todoId === undefined) return
    if ( confirm("Do you want to delete ID:"+todoId) ) {
      doDelete(todoId)
      dispatch( deleteTodo(todoId) )
    }
  }

  useEffect(() => {
    if (data?.todos && todoData && todoData.length === 0 ) {
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
        : showEditTodo
          ? <EditTodo
              setShowEditTodo={setShowEditTodo}
              editTodo={editTodo}
            />
        : <div className="container w-11/12 mx-auto p-1 flex">
            <h3 className="bg-slate-600 text-cyan-50 px-5 py-2 w-1/5 cursor-pointer hover:bg-slate-500 flex items-center"
              onClick={()=>setShowAddTodo(true)}
            >
            <span className="mr-3">Add New Todo</span><FiFilePlus />
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
            <td className="text-center font-bold text-sm">Edit</td>
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
                  <td onClick={()=> toggleComplete(todo)} className="text-center"><FiToggleRight /></td>
                  <td onClick={() => editTodoAction(todo)} className="cursor-pointer text-center"><FiEdit /></td>
                  <td onClick={() => deleteTodoAction(todo._id)} className="cursor-pointer text-center"><FiDelete /></td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default Home;


