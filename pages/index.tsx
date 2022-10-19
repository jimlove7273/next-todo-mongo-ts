import { useEffect } from 'react'
import type { NextPage } from "next"
import useSWR from 'swr'

import AddTodo from "../components/addTodo"

// -- Reducer Start --------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { addInitialTodo } from '../lib/redux/todoSlice'
import { RootState } from '../lib/redux/store'
// ----------------------------------------------------------------

const Home: NextPage = () => {

  const dispatch = useDispatch()
  const todoData = useSelector((state: RootState) => state.todos.value)

  const address = `/api/todos`;
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(address, fetcher);

  useEffect(() => {
    if (data?.todos && todoData.length === 0 ) {
      dispatch( addInitialTodo(data.todos) )
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

      <AddTodo />

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
            todoData[0] && todoData[0].map((todo) => (
                <tr key={todo._id} className="border-b">
                  <td className="px-2 py-1">{todo.heading}</td>
                  <td>{todo.description}</td>
                  <td className="text-center">{todo.done}</td>
                  <td className="text-center">✍</td>
                  <td className="text-center">✕</td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Home;


// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/todos", { method: "GET" });
//   const data = await res.json()
//   return {
//     props: {
//       todos: data
//     }, // will be passed to the page component as props
//   }
// }
